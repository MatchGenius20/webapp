import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useEffect,
  useCallback,
} from 'react'
import PrimaryButton from './PrimaryButton'
import axios from 'axios'
import { useUser } from '@/context/UserContext'

interface Booking {
  userId: number
  bookingId: number
  coachId: number
  bookingDate: string
  bookingTime: string
  duration: number
  price: number
  message: string
}

interface BookingPopupProps {
  onClose: () => void
  booking?: Booking | null
  setBookings: React.Dispatch<React.SetStateAction<Booking[]>>
}

const UpdateBookingPopup: React.FC<BookingPopupProps> = ({
  onClose,
  booking,
  setBookings,
}) => {
  const { user } = useUser()

  const [form, setForm] = useState({
    userId: user?.id ? Number(user.id) : 0, // Initialize with userId as a number
    bookingDate: '',
    bookingTime: '',
    duration: '',
    message: '',
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (booking) {
      setForm({
        userId: user?.id ? Number(user.id) : 0, // Ensure userId is a number
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        duration: '',
        message: booking.message,
      })
    }
  }, [booking, user?.id])

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')

      if (booking) {
        // Convert duration to number before sending
        const updatedForm = {
          ...form,
          duration: parseInt(form.duration, 10),
          userId: Number(form.userId), // Ensure userId is sent as a number
        }
        console.log(updatedForm)

        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/update/request/${booking.bookingId}`,
          updatedForm,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )

        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b.bookingId === booking.bookingId ? { ...b, ...updatedForm } : b,
          ),
        )

        setMessage('Booking updated successfully')
      } else {
        console.error(`Booking doesn't exist`)
        setMessage('Booking does not exist')
      }
    } catch (error) {
      console.error('Error creating or updating booking:', error)
      setMessage('Error updating booking')
    } finally {
      setLoading(false)
      onClose()
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
          {booking ? 'Update Booking' : 'Book Session'}
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
          <div className="flex flex-col justify-center items-center">
            <PrimaryButton text={loading ? 'Loading...' : 'Update'} />
            {message && (
              <p
                className={`mt-4 text-sm ${message.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}
              >
                {message}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateBookingPopup
