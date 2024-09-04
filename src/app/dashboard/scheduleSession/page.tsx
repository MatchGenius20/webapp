'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PrimaryButton from '@/components/PrimaryButton'
import UpdateBookingPopup from '@/components/UpdateBookingPopup'
import Link from 'next/link'

interface Booking {
  userId: number
  bookingId: number
  coachId: number
  bookingDate: string
  bookingTime: string
  duration: number
  price: number
  message: string // Include this to match with UpdateBookingPopup
}

const ScheduleSession: React.FC = () => {
  const [pendingRequests, setPendingRequests] = useState<Booking[]>([])
  const [confirmedBookings, setConfirmedBookings] = useState<Booking[]>([])
  const [updateRequests, setUpdateRequests] = useState<Booking[]>([])
  const [deleteRequests, setDeleteRequests] = useState<Booking[]>([])
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
        console.log(pendingResponse.data)

        setPendingRequests(
          Array.isArray(pendingResponse.data.data)
            ? pendingResponse.data.data
            : [],
        )

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
        console.log(confirmedResponse.data)

        setConfirmedBookings(
          Array.isArray(confirmedResponse.data.data)
            ? confirmedResponse.data.data
            : [],
        )

        // Fetch update requests
        const updateResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/user/isrequested`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        console.log(updateResponse.data)

        setUpdateRequests(
          Array.isArray(updateResponse.data.data)
            ? updateResponse.data.data
            : [],
        )

        // Fetch delete requests
        const deleteResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/user/isdeleted`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        console.log(deleteResponse.data)

        setDeleteRequests(
          Array.isArray(deleteResponse.data.data)
            ? deleteResponse.data.data
            : [],
        )
      } catch (error) {
        console.error('Error fetching bookings:', error)
        // Set empty arrays on error
        setPendingRequests([])
        setConfirmedBookings([])
        setUpdateRequests([])
        setDeleteRequests([])
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
      setConfirmedBookings(
        (prev) => prev.filter((booking) => booking.bookingId !== bookingId), // Corrected
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
  const requestCalendarAccess = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/calendar/access`,
        {},
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      window.location.href = response.data.redirectUrl
      alert('Calendar access requested successfully.')
    } catch (error) {
      console.error('Error requesting calendar access:', error)
      alert('Failed to request calendar access.')
    }
  }
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Your Booking Requests</h2>

      <Link href={`/find-coach`}>
        <PrimaryButton text="Create Event" />
      </Link>
      <PrimaryButton
        text="Request Google Calendar Access"
        onClick={requestCalendarAccess}
      />
      {showPopup && selectedBooking && (
        <UpdateBookingPopup
          onClose={handleClosePopup}
          booking={selectedBooking}
          setBookings={setConfirmedBookings} // Pass the appropriate setter
        />
      )}

      <h3 className="text-xl font-bold mb-4 mt-8">Pending Requests</h3>
      <div className="mt-4">
        {pendingRequests.length === 0 ? (
          <p>No pending requests found.</p>
        ) : (
          pendingRequests.map((request) => (
            <div
              key={request.bookingId}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>Coach: {request.coachId}</p>
              <p>Date: {request.bookingDate}</p>
              <p>Time: {request.bookingTime}</p>
              <p>Duration: {request.duration}</p>
              <p>Price: {request.price}</p>
            </div>
          ))
        )}
      </div>
      <h3 className="text-xl font-bold mb-4 mt-8">Update Requests</h3>
      <div className="mt-4">
        {updateRequests.length === 0 ? (
          <p>No pending requests found.</p>
        ) : (
          updateRequests.map((request) => (
            <div
              key={request.bookingId}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>Coach: {request.coachId}</p>
              <p>Date: {request.bookingDate}</p>
              <p>Time: {request.bookingTime}</p>
              <p>Duration: {request.duration}</p>
              <p>Price: {request.price}</p>
            </div>
          ))
        )}
      </div>
      <h3 className="text-xl font-bold mb-4 mt-8">Delete Requests</h3>
      <div className="mt-4">
        {deleteRequests.length === 0 ? (
          <p>No pending requests found.</p>
        ) : (
          deleteRequests.map((request) => (
            <div
              key={request.bookingId}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>Coach: {request.coachId}</p>
              <p>Date: {request.bookingDate}</p>
              <p>Time: {request.bookingTime}</p>
              <p>Duration: {request.duration}</p>
              <p>Price: {request.price}</p>
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
              key={booking.bookingId}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>Coach: {booking.coachId}</p>
              <p>Date: {booking.bookingDate}</p>
              <p>Time: {booking.bookingTime}</p>
              <p>Duration: {booking.duration}</p>
              <p>Price: {booking.price}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <PrimaryButton
                  text="Update"
                  onClick={() => handleUpdate(booking)}
                />
                <PrimaryButton
                  text="Delete"
                  onClick={() => handleDelete(booking.bookingId)}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default ScheduleSession
