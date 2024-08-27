'use client'

import withAuth from '@/hoc/withAuth'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PrimaryButton from '@/components/PrimaryButton'
import UpdateBookingPopup from '@/components/UpdateBookingPopup'
import Link from 'next/link'
import UpdateBookingPopupCoach from '@/components/UpdateBookingPopupCoach'

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

const ScheduleSession: React.FC = () => {
  const [requests, setRequests] = useState<Booking[]>([])
  const [scheduledEvents, setScheduledEvents] = useState<Booking[]>([])
  const [showPopup, setShowPopup] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        // Fetch session requests
        const requestsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/coach/pending`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setRequests(requestsResponse.data.data)
        console.log('requestsResponse.data')

        console.log(requestsResponse.data.data)

        // Fetch scheduled events
        const eventsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/coach/confirmed`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setScheduledEvents(eventsResponse.data.data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    fetchBookings()
  }, [])

  const handleRespond = async (bookingId: number, status: string) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/create/respond/${bookingId}`,
        { status },
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      if (status === 'ACCEPTED') {
        const acceptedBooking = requests.find(
          (request) => request.bookingId === bookingId,
        )
        if (acceptedBooking) {
          setScheduledEvents((prev) => [
            ...prev,
            { ...acceptedBooking, status: 'Scheduled' },
          ])
          setRequests((prev) =>
            prev.filter((request) => request.bookingId !== bookingId),
          )
        }
      } else {
        setRequests((prev) =>
          prev.filter((request) => request.bookingId !== bookingId),
        )
      }
    } catch (error) {
      console.error('Error responding to request:', error)
    }
  }

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
      setScheduledEvents((prev) =>
        prev.filter((event) => event.bookingId !== bookingId),
      )
    } catch (error) {
      console.error('Error deleting event:', error)
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

      <h2 className="text-2xl font-bold mb-4 mt-8">Scheduled Events</h2>
      {showPopup && (
        <UpdateBookingPopupCoach
          onClose={handleClosePopup}
          booking={selectedBooking}
          setBookings={setScheduledEvents}
        />
      )}

      <h3 className="text-xl font-bold mb-4 mt-8">Pending Requests</h3>
      {
        <div className="mt-4">
          {requests.length === 0 ? (
            <p>No pending requests found.</p>
          ) : (
            requests?.map((request) => (
              <div
                key={request.bookingId}
                className="p-4 border border-gray-300 rounded-lg mb-2"
              >
                <p>Coach: {request.coachId}</p>
                <p>Date: {request.bookingDate}</p>
                <p>Time: {request.bookingTime}</p>
                <p>Duration: {request.duration}</p>
                <p>Price: {request.price}</p>
                <div className="flex justify-end space-x-2 mt-2">
                  <PrimaryButton
                    text="Accept"
                    onClick={() =>
                      handleRespond(request.bookingId, (status = 'ACCEPTED'))
                    }
                  />
                  <PrimaryButton
                    text="Reject"
                    onClick={() =>
                      handleRespond(request.bookingId, (status = 'REJECTED'))
                    }
                  />
                </div>
              </div>
            ))
          )}
        </div>
      }

      <h3 className="text-xl font-bold mb-4 mt-8">Confirmed Bookings</h3>
      {
        <div className="mt-4">
          {scheduledEvents.length === 0 ? (
            <p>No confirmed bookings found.</p>
          ) : (
            scheduledEvents.map((booking) => (
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
      }
    </div>
  )
}
export default withAuth(ScheduleSession)
