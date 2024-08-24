'use client'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PrimaryButton from '@/components/PrimaryButton'
import UpdateBookingPopup from '@/components/UpdateBookingPopup'
import withAuth from '@/hoc/withAuth'

interface Booking {
  id: number
  date: string
  startTime: string
  endTime: string
  message: string
  status: string // Added status to differentiate between requests and scheduled events
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
          `${process.env.NEXT_PUBLIC_API_URL}/coach/requests`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setRequests(requestsResponse.data)

        // Fetch scheduled events
        const eventsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/coach/scheduled-events`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setScheduledEvents(eventsResponse.data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    fetchBookings()
  }, [])

  const handleAccept = async (bookingId: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/coach/accept-request/${bookingId}`,
        {},
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      // Move the booking from requests to scheduled events
      const acceptedBooking = requests.find(
        (request) => request.id === bookingId,
      )
      if (acceptedBooking) {
        setScheduledEvents((prev) => [
          ...prev,
          { ...acceptedBooking, status: 'Scheduled' },
        ])
        setRequests((prev) =>
          prev.filter((request) => request.id !== bookingId),
        )
      }
    } catch (error) {
      console.error('Error accepting request:', error)
    }
  }

  const handleReject = async (bookingId: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/coach/reject-request/${bookingId}`,
        {},
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      setRequests((prev) => prev.filter((request) => request.id !== bookingId))
    } catch (error) {
      console.error('Error rejecting request:', error)
    }
  }

  const handleDelete = async (bookingId: number) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/coach/delete-event/${bookingId}`,
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )
      setScheduledEvents((prev) =>
        prev.filter((event) => event.id !== bookingId),
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
      <h2 className="text-2xl font-bold mb-4">Session Requests</h2>
      {requests.length === 0 ? (
        <p>No session requests found.</p>
      ) : (
        requests.map((request) => (
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
                text="Accept"
                onClick={() => handleAccept(request.id)}
              />
              <PrimaryButton
                text="Reject"
                onClick={() => handleReject(request.id)}
              />
            </div>
          </div>
        ))
      )}

      <h2 className="text-2xl font-bold mb-4 mt-8">Scheduled Events</h2>
      {showPopup && (
        <UpdateBookingPopup
          onClose={handleClosePopup}
          booking={selectedBooking}
          setBookings={setScheduledEvents}
        />
      )}
      {scheduledEvents.length === 0 ? (
        <p>No scheduled events found.</p>
      ) : (
        scheduledEvents.map((event) => (
          <div
            key={event.id}
            className="p-4 border border-gray-300 rounded-lg mb-2"
          >
            <p>Date: {event.date}</p>
            <p>Start Time: {event.startTime}</p>
            <p>End Time: {event.endTime}</p>
            <p>Message: {event.message}</p>
            <div className="flex justify-end space-x-2 mt-2">
              <PrimaryButton
                text="Update"
                onClick={() => handleUpdate(event)}
              />
              <PrimaryButton
                text="Delete"
                onClick={() => handleDelete(event.id)}
              />
            </div>
          </div>
        ))
      )}
    </div>
  )
}

export default withAuth(ScheduleSession)
