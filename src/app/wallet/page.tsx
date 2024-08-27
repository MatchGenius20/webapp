'use client'
import React, { useState, FormEvent } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { useUser } from '@/context/UserContext'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? '',
)

const RechargeWallet = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [amount, setAmount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)
  const { user } = useUser()

  const createCheckoutSession = async () => {
    setLoading(true)
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const email = user?.email
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/recharge`,
        { amount, email },
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      console.log('Received clientSecret: ', data.clientSecret)
      setClientSecret(data.clientSecret)
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (amount > 0) {
      createCheckoutSession()
    }
  }

  return (
    <div className="max-w-5xl mb-40 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-4">Recharge Wallet</h1>
      <div className="flex flex-col lg:flex-row">
        {/* First container for form */}
        <div className="w-full lg:w-1/2 p-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount:
              </label>
              <input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                className="w-80 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              type="submit"
              className={`w-80 px-6 py-3 text-white font-bold rounded-md transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#7681B3] hover:bg-[#5a6b94]'
              }`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Recharge Wallet'}
            </button>
          </form>
        </div>

        {/* Second container for EmbeddedCheckout */}
        <div className="w-full lg:w-1/2 p-4">
          {clientSecret ? (
            <EmbeddedCheckoutProvider
              stripe={stripePromise}
              key={clientSecret}
              options={{
                clientSecret,
              }}
            >
              <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
          ) : (
            <p className="text-center text-gray-500">Loading checkout...</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default RechargeWallet
