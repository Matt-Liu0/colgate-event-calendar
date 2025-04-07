'use client';

import { useEffect, useState } from 'react';

export default function EventPage({ params }) {
  const { id } = params;
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`https://calendar.colgate.edu/api/2/events/${id}`)
      .then(res => res.json())
      .then(setEvent)
      .catch(console.error);
  }, [id]);

  if (!event) return <p className="p-10">Loading event...</p>;

  return (
    <main className="min-h-screen p-10 bg-white">
      <h1 className="text-4xl font-bold text-red-600 mb-4">{event.title}</h1>
      <p className="text-black mb-2"><strong>Hosted by:</strong> {event.sponsor?.[0]?.name || 'Unknown'}</p>
      <p className="text-black mb-6">{event.description || 'No description available.'}</p>
      <button className="px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
        Add to Calendar
      </button>
    </main>
  );
}
