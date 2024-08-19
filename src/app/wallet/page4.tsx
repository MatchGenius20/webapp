'use client'
import { loadStripe } from '@stripe/stripe-js'
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js'
import axios from 'axios'
import { useState, useEffect, FormEvent } from 'react'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ?? '',
)

const RechargeWallet = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [amount, setAmount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (amount > 0) {
      createCheckoutSession()
    }
  }, [amount])

  const createCheckoutSession = async () => {
    setLoading(true)
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const { data } = await axios.post(
        'http://localhost:8080/api/v1/stripe/recharge',
        { amount },
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
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
    <div>
      <form onSubmit={handleSubmit}>
        <label>Amount:</label>
        <input
          className="flex-grow p-3 border border-gray-300 rounded-md custom-placeholder"
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          required
        />
        <button
          className="px-6 py-3 bg-[#443EDE] text-white font-bold border border-white rounded-md transition-colors"
          type="submit"
          disabled={loading}
        >
          Recharge Wallet
        </button>
      </form>

      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          key={clientSecret}
          options={{ clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
}

export default RechargeWallet
