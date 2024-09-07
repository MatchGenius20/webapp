'use client'
import { useState, useEffect } from 'react'
import axios from 'axios' // Make sure to install axios or use fetch
export interface Event {
  id: number
  name: string
  date: string
  location: string
  description?: string
  price?: number
}
const events_arr: Event[] = [
  {
    id: 1,
    name: 'enent 1',
    date: '05/09/2024',
    location: 'Chandigarh',
    description: 'events',
    price: 500,
  },
  {
    id: 2,
    name: 'enent 1',
    date: '05/09/2024',
    location: 'Chandigarh',
    description: 'events',
    price: 500,
  },
  {
    id: 8,
    name: 'enent 1',
    date: '05/09/2024',
    location: 'Chandigarh',
    description: 'events',
    price: 500,
  },
  {
    id: 3,
    name: 'enent 1',
    date: '06/09/2024',
    location: 'Chandigarh',
    description: 'events',
    price: 500,
  },
  {
    id: 4,
    name: 'enent 1',
    date: '08/09/2024',
    location: 'Chandigarh',
    description: 'events',
    price: 500,
  },
  {
    id: 5,
    name: 'enent 1',
    date: '10/09/2024',
    location: 'Chandigarh',
    description: 'events',
    price: 500,
  },
  {
    id: 6,
    name: 'enent 1',
    date: '15/09/2024',
    location: 'Chandigarh',
    description: 'events',
    price: 500,
  },
  {
    id: 7,
    name: 'enent 1',
    date: '25/09/2024',
    location: 'Chandigarh',
    description: 'events',
    price: 500,
  },
]
const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [events, setEvents] = useState<Event[]>([]) // State to store events
  const [loading, setLoading] = useState(true) // State to manage loading
  const [error, setError] = useState<string | null>(null) // State to manage errors

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/event/all`,
        )
        setEvents(response.data.data)
        setEvents(events)

        setLoading(false)
      } catch (err) {
        setEvents(events)

        setError('Failed to fetch events.')
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  // Sort the events by date
  const sortedEvents = events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>
  const daysInMonth = Array.from(
    { length: 30 },
    (_, i) => `${i + 1 < 10 ? `0${i + 1}` : i + 1}/09/2024`,
  )
  return (
    <div className="">
      {/* Landing Section with Background Image */}
      <section className="relative h-[50vh] w-[95%] mx-auto rounded-2xl overflow-hidden">
        <img
          src="/images/events.jpg"
          alt="Events Background"
          className="absolute inset-0 z-0 object-cover w-full h-full rounded-xl"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-white">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to Our Events
          </h1>
        </div>
      </section>

      {/* Top Events Section */}
      <section className="py-16 bg-gray-100 w-[95%] mx-auto mt-4 rounded-lg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Top Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sortedEvents.slice(0, 3).map((event) => (
              <div key={event.id} className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
                <p className="text-gray-600">{event.date}</p>
                <p className="text-gray-600">{event.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Event Calendar
        </h2>

        <div className="container mx-auto px-4 flex justify-around items-start w-full">
          <div className="flex justify-center w-full">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full">
              <div className="grid grid-cols-7 gap-4">
                {daysInMonth.map((date) => (
                  <div
                    key={date}
                    className="p-2 rounded-lg bg-white text-gray-800 h-32 w-full overflow-y-scroll no-scrollbar" // Use 'no-scrollbar' class
                    style={{ height: '120px' }}
                  >
                    <div className="font-bold mb-2">{date.split('/')[0]}</div>
                    <div className="grid gap-2 max-h-full overflow-y-scroll no-scrollbar">
                      {events.map((event) =>
                        event.date === date ? (
                          <div
                            key={event.id}
                            className="bg-white p-2 rounded-lg shadow text-sm overflow-hidden"
                          >
                            <p className="text-gray-600">
                              <span className="font-semibold truncate">
                                {event.name}
                              </span>
                              |{event.location}
                            </p>
                          </div>
                        ) : null,
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventsPage
