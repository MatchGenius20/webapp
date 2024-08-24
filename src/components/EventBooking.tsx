'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PrimaryButton from '@/components/PrimaryButton'
import UpdateBookingPopup from '@/components/UpdateBookingPopup'
import Link from 'next/link'

interface Booking {
  id: number
  date: string
  startTime: string
  endTime: string
  message: string
  status: string
}

const EventBooking: React.FC = () => {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/event/redirect`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setBookings(response.data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    fetchBookings()
  }, [])

  const handleDelete = async (bookingId: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/delete/request/${bookingId}`,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId))
    } catch (error) {
      console.error('Error deleting booking:', error)
    }
  }

  const handleUpdate = (booking: Booking) => {
    setSelectedBooking(booking)
    setShowPopup(true)
  }

  const handleClosePopup = () => {
    setShowPopup(false)
    setSelectedBooking(null)
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Bookings</h2>

      <Link href={`/find-coach`}>
        <PrimaryButton text="Create Event" />
      </Link>

      {showPopup && (
        <UpdateBookingPopup
          onClose={handleClosePopup}
          booking={selectedBooking}
          setBookings={setBookings}
        />
      )}
      <div className="mt-4">
        {bookings.length === 0 ? (
          <p>No bookings found.</p>
        ) : (
          bookings.map((booking) => (
            <div
              key={booking.id}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>Date: {booking.date}</p>
              <p>Start Time: {booking.startTime}</p>
              <p>End Time: {booking.endTime}</p>
              <p>Message: {booking.message}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <PrimaryButton
                  text="Update"
                  onClick={() => handleUpdate(booking)}
                />
                <PrimaryButton
                  text="Delete"
                  onClick={() => handleDelete(booking.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default EventBooking
