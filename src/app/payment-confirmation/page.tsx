'use client' // This marks the file as a Client Component

import { useRouter } from 'next/navigation' // Use `next/navigation` instead of `next/router`
import { useEffect, useState } from 'react'
import axios from 'axios'

const PaymentConfirmation = () => {
  const router = useRouter()
  const [status, setStatus] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = new URLSearchParams(window.location.search).get(
      'session_id',
    )

    const checkPaymentStatus = async () => {
      if (sessionId) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/stripe/check-payment-status?sessionId=${sessionId}`,
          )
          setStatus(
            response.data.success ? 'Payment successful!' : 'Payment failed',
          )
        } catch (error) {
          console.error('Error checking payment status:', error)
          setStatus('Error checking payment status')
        }
      } else {
        setStatus('No session ID found')
      }
    }

    checkPaymentStatus()
  }, [router])

  return (
    <div>
      <h1>Payment Confirmation</h1>
      <p>{status}</p>
    </div>
  )
}

export default PaymentConfirmation
