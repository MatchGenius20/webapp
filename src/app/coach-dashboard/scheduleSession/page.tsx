'use client'

import withAuth from '@/hoc/withAuth'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PrimaryButton from '@/components/PrimaryButton'
import Link from 'next/link'

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
  const [pendingRequests, setPendingRequests] = useState<Booking[]>([])
  const [updateRequests, setUpdateRequests] = useState<Booking[]>([])
  const [deleteRequests, setDeleteRequests] = useState<Booking[]>([])
  const [confirmedRequests, setConfirmedRequests] = useState<Booking[]>([])

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken')
        const refreshToken = localStorage.getItem('refreshToken')

        const requestsResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/coach/pending`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setPendingRequests(requestsResponse.data.data)
        console.log(requestsResponse.data.data)

        const confirmedResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/coach/confirmed`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setConfirmedRequests(confirmedResponse.data.data)

        const updateResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/coach/isrequested`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setUpdateRequests(updateResponse.data.data)
        console.log(updateResponse.data.data)

        const deleteResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/booking/coach/isdeleted`,
          {
            headers: {
              'access-token': `Bearer ${accessToken}`,
              'refresh-token': `Bearer ${refreshToken}`,
            },
          },
        )
        setDeleteRequests(deleteResponse.data.data)
        console.log(deleteResponse.data.data)
      } catch (error) {
        console.error('Error fetching bookings:', error)
      }
    }

    fetchBookings()
  }, [])

  const handleRequestAction = async (
    bookingId: number,
    status: string,
    type: 'create' | 'update' | 'delete',
  ) => {
    try {
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/${type}/respond/${bookingId}`,
        { status },
        {
          headers: {
            'access-token': `Bearer ${accessToken}`,
            'refresh-token': `Bearer ${refreshToken}`,
          },
        },
      )

      // Update state based on the action
      if (status === 'ACCEPTED') {
        // Move booking to confirmed requests
        const acceptedBooking =
          type === 'create'
            ? pendingRequests.find((request) => request.bookingId === bookingId)
            : type === 'update'
              ? updateRequests.find(
                  (request) => request.bookingId === bookingId,
                )
              : deleteRequests.find(
                  (request) => request.bookingId === bookingId,
                )

        if (acceptedBooking) {
          setConfirmedRequests((prev) => [...prev, acceptedBooking])
        }
      }

      if (type === 'create') {
        setPendingRequests((prev) =>
          prev.filter((request) => request.bookingId !== bookingId),
        )
      } else if (type === 'update') {
        setUpdateRequests((prev) =>
          prev.filter((request) => request.bookingId !== bookingId),
        )
      } else if (type === 'delete') {
        setDeleteRequests((prev) =>
          prev.filter((request) => request.bookingId !== bookingId),
        )
      }
    } catch (error) {
      console.error('Error responding to request:', error)
    }
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
              <p>User: {request.userId}</p>
              <p>Date: {request.bookingDate}</p>
              <p>Time: {request.bookingTime}</p>
              <p>Duration: {request.duration}</p>
              <p>Price: {request.price}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <PrimaryButton
                  text="Accept"
                  onClick={() =>
                    handleRequestAction(request.bookingId, 'ACCEPTED', 'create')
                  }
                />
                <PrimaryButton
                  text="Reject"
                  onClick={() =>
                    handleRequestAction(request.bookingId, 'REJECTED', 'create')
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>

      <h3 className="text-xl font-bold mb-4 mt-8">Update Requests</h3>
      <div className="mt-4">
        {updateRequests.length === 0 ? (
          <p>No update requests found.</p>
        ) : (
          updateRequests.map((request) => (
            <div
              key={request.bookingId}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>User: {request.userId}</p>
              <p>Date: {request.bookingDate}</p>
              <p>Time: {request.bookingTime}</p>
              <p>Duration: {request.duration}</p>
              <p>Price: {request.price}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <PrimaryButton
                  text="Accept"
                  onClick={() =>
                    handleRequestAction(request.bookingId, 'ACCEPTED', 'update')
                  }
                />
                <PrimaryButton
                  text="Reject"
                  onClick={() =>
                    handleRequestAction(request.bookingId, 'REJECTED', 'update')
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>

      <h3 className="text-xl font-bold mb-4 mt-8">Delete Requests</h3>
      <div className="mt-4">
        {deleteRequests.length === 0 ? (
          <p>No delete requests found.</p>
        ) : (
          deleteRequests.map((request) => (
            <div
              key={request.bookingId}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>User: {request.userId}</p>
              <p>Date: {request.bookingDate}</p>
              <p>Time: {request.bookingTime}</p>
              <p>Duration: {request.duration}</p>
              <p>Price: {request.price}</p>
              <div className="flex justify-end space-x-2 mt-2">
                <PrimaryButton
                  text="Accept"
                  onClick={() =>
                    handleRequestAction(request.bookingId, 'ACCEPTED', 'delete')
                  }
                />
                <PrimaryButton
                  text="Reject"
                  onClick={() =>
                    handleRequestAction(request.bookingId, 'REJECTED', 'delete')
                  }
                />
              </div>
            </div>
          ))
        )}
      </div>

      <h3 className="text-xl font-bold mb-4 mt-8">Confirmed Bookings</h3>
      <div className="mt-4">
        {confirmedRequests.length === 0 ? (
          <p>No confirmed bookings found.</p>
        ) : (
          confirmedRequests.map((booking) => (
            <div
              key={booking.bookingId}
              className="p-4 border border-gray-300 rounded-lg mb-2"
            >
              <p>User: {booking.userId}</p>
              <p>Date: {booking.bookingDate}</p>
              <p>Time: {booking.bookingTime}</p>
              <p>Duration: {booking.duration}</p>
              <p>Price: {booking.price}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default withAuth(ScheduleSession)
