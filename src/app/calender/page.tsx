'use client'
import React, { useEffect, useState } from 'react';
import { initClient, listPublicEvents } from '../../googleApi';

interface Event {
  id: string;
  summary: string;
  start: {
    dateTime?: string;
    date?: string;
  };
}

const App: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      initClient();
    }
  }, []);

  const fetchEvents = async () => {
    if (typeof window !== 'undefined') {
      try {
        const response = await listPublicEvents('primary'); // Replace 'primary' with a public calendar ID
        const events = response.result.items as Event[];
        setEvents(events);
      } catch (error) {
        console.error("Error fetching events", error);
      }
    } else {
      console.log("Window is not defined");
    }
  };

  return (
    <div>
      <button onClick={fetchEvents}>Get Upcoming Events</button>
      <ul>
        {events.map(event => (
          <li key={event.id}>{event.summary} - {event.start.dateTime || event.start.date}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
