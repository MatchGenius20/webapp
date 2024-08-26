'use client'
import { useState } from 'react'

const EventsPage = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

  // Dummy event data
  const events = [
    {
      id: 1,
      title: 'Music Festival',
      date: '2024-09-10',
      location: 'New York',
    },
    { id: 2, title: 'Art Exhibition', date: '2024-09-25', location: 'Paris' },
    { id: 2, title: 'Art Exhibition', date: '2024-09-10', location: 'Paris' },
    {
      id: 3,
      title: 'Tech Conference',
      date: '2024-09-20',
      location: 'San Francisco',
    },
    {
      id: 3,
      title: 'Tech Conference',
      date: '2024-09-20',
      location: 'San Francisco',
    },
    {
      id: 3,
      title: 'Tech Conference',
      date: '2024-09-20',
      location: 'San Francisco',
    },
  ]
  // Sort the events by date
  const sortedEvents = events.sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  // Filter events based on the selected date
  const eventsForSelectedDate = events.filter(
    (event) => event.date === selectedDate,
  )

  const handleDateClick = (date: string) => {
    setSelectedDate(date)
  }

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
                <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
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

        <div className="container mx-auto px-4 flex justify-around items-start">
          <div className="flex justify-center w-[30%]">
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4 text-center">
                Select a Date to see events
              </h3>
              <Calendar
                onDateClick={handleDateClick}
                selectedDate={selectedDate}
              />
            </div>
          </div>

          {/* Render events for the selected date */}
          <div className="mt-8 w-[60%]">
            {selectedDate && (
              <div>
                <h3 className="text-2xl font-semibold text-center mb-4">
                  Events on {selectedDate}
                </h3>
                {eventsForSelectedDate.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {eventsForSelectedDate.map((event) => (
                      <div
                        key={event.id}
                        className="bg-white p-4 rounded-lg shadow"
                      >
                        <h4 className="text-lg font-semibold">{event.title}</h4>
                        <p className="text-gray-600">{event.location}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-gray-600">
                    No events on this date.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

// Sample Calendar Component (You can customize or replace this with a library)
const Calendar = ({
  onDateClick,
  selectedDate,
}: {
  onDateClick: (date: string) => void
  selectedDate: string | null
}) => {
  const daysInMonth = Array.from(
    { length: 30 },
    (_, i) => `2024-09-${i + 1 < 10 ? `0${i + 1}` : i + 1}`,
  )

  return (
    <div className="grid grid-cols-7 gap-4">
      {daysInMonth.map((date) => (
        <button
          key={date}
          className={`py-2 rounded-lg  ${selectedDate === date ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'}`}
          onClick={() => onDateClick(date)}
        >
          {date.split('-')[2]}
        </button>
      ))}
    </div>
  )
}

export default EventsPage
