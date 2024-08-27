import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from 'react'
import { BookingPopupProps } from '../../type'
import PrimaryButton from './PrimaryButton'
import axios from 'axios'
import { useUser } from '@/context/UserContext'

const BookingPopup: React.FC<BookingPopupProps> = ({
  onClose,
  coachId,
  price,
}) => {
  const { user } = useUser()
  const [form, setForm] = useState({
    userId: user?.id,
    bookingDate: '',
    bookingTime: '',
    duration: '',
    price: price,
    paymentId: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{
    success: boolean
    message: string
  } | null>(null)

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/create/request/${coachId}`,
        form,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      console.log(response)

      setStatus({ success: true, message: 'Booking successful!' })
      setLoading(false)
      // Optionally close the popup after a delay
      setTimeout(onClose, 2000)
    } catch (error) {
      console.error('Error creating booking:', error)
      setStatus({
        success: false,
        message: 'Error creating booking. Please try again.',
      })
      setLoading(false)
    }
  }

  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      const popup = document.getElementById('booking-popup')
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
        id="booking-popup"
        className="bg-white p-4 md:p-8 rounded-lg max-w-lg w-full shadow-md shadow-[#9794EC]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-primary">
          Book Session
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4"></div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Booking Date</label>
            <input
              type="date"
              name="bookingDate"
              value={form.bookingDate}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Booking Time</label>
            <input
              type="time"
              name="bookingTime"
              value={form.bookingTime}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">
              Duration (in minutes)
            </label>
            <input
              type="number"
              name="duration"
              value={form.duration}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Message</label>
            <input
              type="text"
              name="message"
              value={form.message}
              onChange={handleChange}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div className="flex flex-col items-center">
            <PrimaryButton text={loading ? 'Loading...' : 'Book'} />
            {status && (
              <p
                className={`mt-2 text-sm ${status.success ? 'text-green-500' : 'text-red-500'}`}
              >
                {status.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingPopup
