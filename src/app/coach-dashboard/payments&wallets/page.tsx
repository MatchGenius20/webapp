'use client'
import withAuth from '@/hoc/withAuth'
import React, { useState, useEffect, useCallback } from 'react'
import CountUp from 'react-countup'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
import Link from 'next/link'
import PrimaryButton from '@/components/PrimaryButton'
import PaymentMethodPopup from '@/components/PaymentMethodPopup'

interface PaymentMethod {
  id: number
  cardNumber: string
  bank: string
  expiryDate: string
}

interface Transaction {
  id: number
  amount: number
  createdAt: string
  description: string
  type: string
  walletId: number
  paymentId?: string
  paymentMethod?: string
  userId?: number
}

const PaymentsAndWallets: React.FC = () => {
  const { user } = useUser()
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [amountSpent, setAmountSpent] = useState<number>(0)
  const [pendingAmount, setPendingAmount] = useState<number>(0)
  const [totalSessions, setTotalSessions] = useState<number>(0)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [selectedMethods, setSelectedMethods] = useState<number>()
  const [loading, setLoading] = useState<boolean>(true)
  const [showPopup, setShowPopup] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return

      try {
        setLoading(true)
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        const userId = user.id

        const [
          walletResponse,
          blockedResponse,
          spentResponse,
          sessionsResponse,
          methodsResponse,
          transactionsList,
        ] = await Promise.all([
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/wallet-amount/${userId}`,
            {
              headers: {
                'access-token': `Bearer ${accessToken}`,
                'refresh-token': `Bearer ${refreshToken}`,
              },
            },
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/coach-pending-amount/${userId}`,
            {
              headers: {
                'access-token': `Bearer ${accessToken}`,
                'refresh-token': `Bearer ${refreshToken}`,
              },
            },
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/total-spent/${userId}`,
            {
              headers: {
                'access-token': `Bearer ${accessToken}`,
                'refresh-token': `Bearer ${refreshToken}`,
              },
            },
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/total-transactions/${userId}`,
            {
              headers: {
                'access-token': `Bearer ${accessToken}`,
                'refresh-token': `Bearer ${refreshToken}`,
              },
            },
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment-methods/${userId}`,
            {
              headers: {
                'access-token': `Bearer ${accessToken}`,
                'refresh-token': `Bearer ${refreshToken}`,
              },
            },
          ),
          axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/payments-history/${userId}`,
            {
              headers: {
                'access-token': `Bearer ${accessToken}`,
                'refresh-token': `Bearer ${refreshToken}`,
              },
            },
          ),
        ])

        setWalletBalance(walletResponse.data.totalAmount)
        setPendingAmount(blockedResponse.data.pendingAmount)
        setAmountSpent(spentResponse.data.totalSpent)
        setTotalSessions(sessionsResponse.data.totalTransactions)
        setPaymentMethods(methodsResponse.data.paymentMethods || [])
        setTransactions(transactionsList.data.history || [])
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user?.id])

  const handleDelete = useCallback(async () => {
    try {
      if (!user?.id) return

      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment-methods/${selectedMethods}`,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )

      const updatedMethodsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment-methods/${user.id}`,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      setPaymentMethods(updatedMethodsResponse.data.paymentMethods || [])
      setSelectedMethods(0)
    } catch (error) {
      console.error('Error deleting payment methods:', error)
    }
  }, [selectedMethods, user?.id])

  const handleSelect = useCallback((id: number) => {
    setSelectedMethods(id)
  }, [])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
  }

  return (
    <div className="p-4">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex flex-wrap justify-around mb-6 space-y-4 md:space-y-0 bg-[#EBEBFE] rounded-md w-full md:w-4/5 mx-auto">
            <StatCard title="Wallet Balance" value={walletBalance} />
            <StatCard title="Pending Amount" value={pendingAmount} />
            <StatCard title="Amount Spent" value={amountSpent} />
            <StatCard title="Total Sessions" value={totalSessions} />
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg m-6">
            <Link href={`/wallet`}>
              <PrimaryButton text="Recharge Wallet" />
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold">
              Payment Methods
            </h2>
            <h3 className="mb-3 md:text-sm text-xs text-[#7D7D7B]">
              Select to Remove or edit your Method
            </h3>
            {paymentMethods.length > 0 ? (
              paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    id={`${method.id}`}
                    className="mr-2"
                    checked={selectedMethods === method.id}
                    onChange={() => handleSelect(method.id)}
                    aria-label={`Select payment method ${method.id}`}
                  />
                  <label
                    htmlFor={`method-${method.id}`}
                    className="flex-1 flex justify-between text-xs md:text-sm shadow-[#F4F4FE]"
                  >
                    Test Card ({method.cardNumber})
                    <span>
                      {method.bank} | Expiry {method.expiryDate}
                    </span>
                  </label>
                </div>
              ))
            ) : (
              <p>No payment methods available.</p>
            )}
            <div className="flex justify-end mt-4 gap-2">
              <button
                className="bg-[#EFEFFE] text-[#443EDE] px-4 py-1 md:px-6 md:py-3 rounded-lg shadow-md"
                onClick={() => setShowPopup(true)}
              >
                Add New Method
              </button>
              <button
                onClick={handleDelete}
                className="bg-[#EFEFFE] text-[#443EDE] px-4 py-1 md:px-6 md:py-3 rounded-lg shadow-md"
              >
                Remove
              </button>
            </div>
          </div>
          {showPopup && (
            <PaymentMethodPopup onClose={() => setShowPopup(false)} />
          )}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl md:text-2xl font-semibold">Transactions</h2>
            {transactions.length > 0 ? (
              <ul>
                {transactions.map((transaction) => (
                  <li key={transaction.id} className="mb-4 p-4 border-b">
                    <div className="flex justify-between">
                      <span className="font-semibold">
                        {transaction.description}
                      </span>
                      <span
                        className={`font-bold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {transaction.amount > 0 ? '+' : '-'}$
                        {Math.abs(transaction.amount).toFixed(2)}
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm">
                      {formatDate(transaction.createdAt)}
                      {transaction.paymentId && (
                        <div>Payment ID: {transaction.paymentId}</div>
                      )}
                      {transaction.paymentMethod && (
                        <div>Payment Method: {transaction.paymentMethod}</div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions available.</p>
            )}
          </div>
        </>
      )}
    </div>
  )
}

const StatCard: React.FC<{ title: string; value: number }> = ({
  title,
  value,
}) => (
  <div className="relative w-full md:w-60 mx-2">
    <div className="p-4 md:p-6 rounded-lg">
      <div className="p-3 md:p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
        <div className="text-sm md:text-sm font-semibold">{title}</div>
        <div className="text-2xl md:text-4xl font-bold text-center text-[#443EDE]">
          $<CountUp end={value} />
        </div>
      </div>
    </div>
  </div>
)

export default withAuth(PaymentsAndWallets)
