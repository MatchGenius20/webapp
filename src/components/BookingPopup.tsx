import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
import { BookingPopupProps } from '../../type'
import PrimaryButton from './PrimaryButton'
import axios from 'axios'
import { adexperiencereport } from 'googleapis/build/src/apis/adexperiencereport'
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
    // Handle form submission logic here
    try {
      const token = localStorage.getItem('token')
      await axios.post('http://localhost:8080/api/event', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      onClose()
    } catch (error) {
      console.error('Error creating booking:', error)
    }
  }

  const handleClickOutside = (e: MouseEvent) => {
    const popup = document.getElementById('booking-popup')
    if (popup && !popup.contains(e.target as Node)) {
      onClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        id="booking-popup"
        className="bg-white p-4 md:p-8 rounded-lg max-w-lg w-full shadow-md shadow-[#9794EC]"
      >
        <h2 className="text-2xl font-semibold mb-4 text-[#443EDE]">
          Book Session
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col md:flex-row items-center">
            <label
              className="block text-md mb-2 md:mb-0 md:mr-4 w-full md:w-1/3 font-semibold"
              htmlFor="date"
            >
              Date:
            </label>
            <input
              type="text"
              id="date"
              name="date"
              className="w-full md:w-2/3 border border-gray-300 p-2 rounded-md"
              value={form.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <label
              className="block text-md mb-2 md:mb-0 w-full md:w-1/3 font-semibold"
              htmlFor="startTime"
            >
              Start time:
            </label>
            <input
              type="text"
              id="startTime"
              name="startTime"
              className="w-full md:w-1/3 border border-gray-300 p-2 rounded-md"
              value={form.startTime}
              onChange={handleChange}
              required
            />
            <label
              className="block text-md mb-2 md:mb-0 w-full md:w-1/3 font-semibold"
              htmlFor="endTime"
            >
              End time:
            </label>
            <input
              type="text"
              id="endTime"
              name="endTime"
              className="w-full md:w-1/3 border border-gray-300 p-2 rounded-md"
              value={form.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4 flex flex-col md:flex-row items-center">
            <label
              className="block text-md mb-2 md:mb-0 w-full md:w-1/3 font-semibold"
              htmlFor="message"
            >
              Message:
            </label>
            <input
              type="text"
              id="message"
              name="message"
              className="w-full md:w-[84%] h-20 border border-gray-300 p-2 rounded-md"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex justify-center">
            <PrimaryButton text="Book" />
          </div>
        </form>
      </div>
    </div>
  )
}

export default BookingPopup
