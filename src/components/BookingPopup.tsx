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

const BookingPopup: React.FC<BookingPopupProps> = ({ onClose }) => {
  const [form, setForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    message: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('token')
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/event`, form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      onClose()
    } catch (error) {
      console.error('Error creating booking:', error)
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
          {/* Form Fields */}
          <div className="flex justify-center">
            <PrimaryButton text="Book" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingPopup
