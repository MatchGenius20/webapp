import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
} from 'react'
import axios from 'axios'
import { useUser } from '@/context/UserContext'
import PrimaryButton from '@/components/PrimaryButton'

interface PaymentMethodPopupProps {
  onClose: () => void
}

const PaymentMethodPopup: React.FC<PaymentMethodPopupProps> = ({ onClose }) => {
  const { user } = useUser()
  const [form, setForm] = useState({
    cardNumber: '',
    cardType: '',
    expiryDate: '',
    holderName: '',
    userId: user?.id,
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/stripe/add-payment-method/${user?.id}`,
        form,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      onClose()
    } catch (error: any) {
      console.error(
        'Error adding payment method:',
        error.response?.data || error.message,
      )
    }
  }

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const popup = document.getElementById('payment-method-popup')
      if (popup && !popup.contains(e.target as Node)) {
        onClose()
      }
    },
    [onClose],
  )

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [handleClickOutside])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        id="payment-method-popup"
        className="bg-white p-4 md:p-8 rounded-lg max-w-lg w-full shadow-md shadow-[#9794EC]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Add Payment Method
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Card Number</label>
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Card Type</label>
            <input
              type="text"
              name="cardType"
              value={form.cardType}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Expiry Date</label>
            <input
              type="text"
              name="expiryDate"
              value={form.expiryDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Holder Name</label>
            <input
              type="text"
              name="holderName"
              value={form.holderName}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div className="flex justify-center">
            <PrimaryButton text="Add Method" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default PaymentMethodPopup
