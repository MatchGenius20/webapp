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
  const [pendingRequests, setPendingRequests] = useState<Booking[]>([])
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        // Fetch pending requests
        const pendingResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/user/pending`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setPendingRequests(pendingResponse.data)

        // Fetch confirmed bookings
        const confirmedResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/user/confirmed`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setConfirmedBookings(confirmedResponse.data)
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
      setPendingRequests((prev) =>
        prev.filter((booking) => booking.id !== bookingId),
      )
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
      <h2 className="text-2xl font-bold mb-4">Your Booking Requests</h2>

      <Link href={`/find-coach`}>
        <PrimaryButton text="Create Event" />
      </Link>

      {showPopup && selectedBooking && (
        <UpdateBookingPopup
          onClose={handleClosePopup}
          booking={selectedBooking}
          setBookings={setConfirmedBookings} // Updated to reflect confirmed bookings after updating
        />
      )}

      <h3 className="text-xl font-bold mb-4 mt-8">Pending Requests</h3>
      <div className="mt-4">
        {pendingRequests.length === 0 ? (
          <p>No pending requests found.</p>
        ) : (
          pendingRequests.map((request) => (
            <div
              key={request.id}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>Date: {request.date}</p>
              <p>Start Time: {request.startTime}</p>
              <p>End Time: {request.endTime}</p>
              <p>Message: {request.message}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <PrimaryButton
                  text="Cancel"
                  onClick={() => handleDelete(request.id)}
                />
              </div>
            </div>
          ))
        )}
      </div>

      <h3 className="text-xl font-bold mb-4 mt-8">Confirmed Bookings</h3>
      <div className="mt-4">
        {confirmedBookings.length === 0 ? (
          <p>No confirmed bookings found.</p>
        ) : (
          confirmedBookings.map((booking) => (
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
