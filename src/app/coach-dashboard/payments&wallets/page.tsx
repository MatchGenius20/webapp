'use client'
import React, { useState, useEffect } from 'react'
import CountUp from 'react-countup'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
import withAuth from '@/hoc/withAuth'

interface PaymentMethod {
  id: number
  cardNumber: string
  bank: string
  expiry: string
}

const PaymentsAndWallets: React.FC = () => {
  const { user } = useUser()
  const [walletBalance, setWalletBalance] = useState<number>(0)
  const [amountSpent, setAmountSpent] = useState<number>(0)
  const [totalSessions, setTotalSessions] = useState<number>(0)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedMethods, setSelectedMethods] = useState<number[]>([])

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.id) return

      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        const userId = user.id

        // Fetch wallet balance
        const walletResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/wallet-amount/${userId}`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setWalletBalance(walletResponse.data)

        // Fetch amount spent
        const spentResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/total-spent/${userId}`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setAmountSpent(spentResponse.data)

        // Fetch total sessions
        const sessionsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/total-transactions/${userId}`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setTotalSessions(sessionsResponse.data)

        // Fetch payment methods
        const methodsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment-methods/${userId}`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        console.log(methodsResponse.data) // Log the response to see the structure
        // Ensure that methodsResponse.data is an array
        if (Array.isArray(methodsResponse.data)) {
          setPaymentMethods(methodsResponse.data)
        } else if (
          methodsResponse.data &&
          Array.isArray(methodsResponse.data.methods)
        ) {
          setPaymentMethods(methodsResponse.data.methods)
        } else {
          setPaymentMethods([]) // Set an empty array if the response structure is unexpected
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [user?.id])

  const handleDelete = async () => {
    try {
      if (!user?.id) return

      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment-methods`,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
          data: { ids: selectedMethods },
        },
      )

      // Refresh payment methods
      const updatedMethodsResponse = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/payment-methods/${user.id}`,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      if (Array.isArray(updatedMethodsResponse.data)) {
        setPaymentMethods(updatedMethodsResponse.data)
      } else if (
        updatedMethodsResponse.data &&
        Array.isArray(updatedMethodsResponse.data.methods)
      ) {
        setPaymentMethods(updatedMethodsResponse.data.methods)
      } else {
        setPaymentMethods([]) // Set an empty array if the response structure is unexpected
      }
      setSelectedMethods([])
    } catch (error) {
      console.error('Error deleting payment methods:', error)
    }
  }

  const handleSelect = (id: number) => {
    setSelectedMethods((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((methodId) => methodId !== id)
        : [...prevSelected, id],
    )
  }

  return (
    <div className="p-4">
      <div className="flex flex-wrap justify-around mb-6 space-y-4 md:space-y-0 bg-[#EBEBFE] rounded-md w-full md:w-4/5 mx-auto">
        <div className="relative w-full md:w-60 mx-2">
          <div className="p-4 md:p-6 rounded-lg">
            <div className="p-3 md:p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-sm md:text-sm font-semibold">
                Wallet Balance
              </div>
              <div className="text-2xl md:text-4xl font-bold text-center text-[#443EDE]">
                $<CountUp end={walletBalance} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full md:w-60 mx-2">
          <div className="p-4 md:p-6 rounded-lg">
            <div className="p-3 md:p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform justify-center">
              <div className="text-sm md:text-sm font-semibold">
                Amount Spent
              </div>
              <div className="text-2xl md:text-4xl font-bold text-center text-[#443EDE]">
                $<CountUp end={amountSpent} />
              </div>
            </div>
          </div>
        </div>
        <div className="relative w-full md:w-60 mx-2">
          <div className="p-4 md:p-6 rounded-lg">
            <div className="p-3 md:p-4 bg-white rounded-lg shadow-lg transform hover:scale-105 transition-transform">
              <div className="text-sm md:text-sm">Total Sessions</div>
              <div className="text-2xl md:text-4xl font-bold text-center text-[#443EDE]">
                <CountUp end={totalSessions} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl md:text-2xl font-semibold">Payment Methods</h2>
        <h3 className="mb-3 md:text-sm text-xs text-[#7D7D7B]">
          Select to Remove or edit your Method
        </h3>
        {Array.isArray(paymentMethods) &&
          paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center mb-4">
              <input
                type="checkbox"
                id={`method-${method.id}`}
                className="mr-2"
                checked={selectedMethods.includes(method.id)}
                onChange={() => handleSelect(method.id)}
              />
              <label
                htmlFor={`method-${method.id}`}
                className="flex-1 flex justify-between text-xs md:text-sm shadow-[#F4F4FE]"
              >
                Test Card ({method.cardNumber})
                <span>
                  {method.bank} | Expiry {method.expiry}
                </span>
              </label>
            </div>
          ))}
        <div className="flex justify-end mt-4 gap-2">
          <button className="bg-[#EFEFFE] text-[#443EDE] px-4 py-1 md:px-6 md:py-3 rounded-lg shadow-md">
            Add New Method
          </button>
          <button
            className="bg-[#443EDE] text-white px-4 py-1 md:px-6 md:py-3 rounded-lg shadow-md"
            onClick={handleDelete}
          >
            Remove Selected
          </button>
        </div>
      </div>
    </div>
  )
}

export default withAuth(PaymentsAndWallets)
