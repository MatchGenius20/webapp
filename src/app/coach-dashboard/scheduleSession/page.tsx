'use client'
import React, { useState, useEffect } from 'react'
import withAuth from '@/hoc/withAuth'
import Image from 'next/image'
import axios from 'axios'

const ScheduleSession: React.FC = () => {
  const [events, setEvents] = useState<any[]>([])
  const [sessionDate, setSessionDate] = useState('')
  const [sessionTime, setSessionTime] = useState('')
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null)

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/event`,
      )
      setEvents(response.data.data)
    } catch (error) {
      console.error('Error fetching events:', error)
    }
  }

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/event`,
        {
          bookingDate: sessionDate,
          bookingTime: sessionTime,
          bookingStatus: 'Confirmed',
          duration: 60,
          price: 100,
          paymentId: 'example-payment-id',
          userId: 1,
          coachId: 1,
        },
      )
      console.log('Event created:', response.data)
      fetchEvents()
    } catch (error) {
      console.error('Error creating event:', error)
    }
  }

  const handleUpdateEvent = async () => {
    if (!selectedEventId) return
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/event`,
        {
          id: selectedEventId,
          bookingDate: sessionDate,
          bookingTime: sessionTime,
          bookingStatus: 'Updated',
        },
      )
      console.log('Event updated:', response.data)
      fetchEvents()
    } catch (error) {
      console.error('Error updating event:', error)
    }
  }

  const handleDeleteEvent = async (eventId: string) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/booking/event?eventId=${eventId}`,
      )
      console.log('Event deleted')
      fetchEvents()
    } catch (error) {
      console.error('Error deleting event:', error)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center justify-center mb-4">
          <div className="relative w-32 h-32">
            <Image
              src="/images/calender.png"
              alt="Calendar"
              width={20}
              height={20}
              className="rounded-full object-cover"
            />
          </div>
        </div>
        <form onSubmit={handleCreateEvent} className="space-y-4">
          <div>
            <label htmlFor="session-date" className="block text-sm font-medium">
              Session Date
            </label>
            <input
              type="date"
              id="session-date"
              value={sessionDate}
              onChange={(e) => setSessionDate(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="session-time" className="block text-sm font-medium">
              Session Time
            </label>
            <input
              type="time"
              id="session-time"
              value={sessionTime}
              onChange={(e) => setSessionTime(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-lg shadow-sm"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-[#443EDE] text-white px-6 py-2 rounded-lg shadow-md"
            >
              Create Event
            </button>
            <button
              type="button"
              onClick={handleUpdateEvent}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md"
            >
              Update Event
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-medium mb-4">All Events</h2>
        <ul>
          {events.map((event) => (
            <li key={event.bookingId} className="mb-2">
              <div className="flex justify-between items-center">
                <div>
                  <p>Date: {event.bookingDate}</p>
                  <p>Time: {event.bookingTime}</p>
                  <p>Status: {event.bookingStatus}</p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      setSelectedEventId(event.bookingId)
                      setSessionDate(event.bookingDate)
                      setSessionTime(event.bookingTime)
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.bookingId)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default withAuth(ScheduleSession)
