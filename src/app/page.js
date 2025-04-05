'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Home() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = [
    'All',
    'Cultural Events',
    'Social',
    'Food',
    'Has food',
    'Networking',
    'Sports',
    'Religious',
    'Others',
  ];

  const events = [
    { id: 1, title: 'Basketball Game', category: 'Sports' },
    { id: 2, title: 'Networking Night', category: 'Networking' },
    { id: 3, title: 'Campus BBQ', category: 'Has food' },
    { id: 4, title: 'Meditation and Prayer', category: 'Religious' },
    { id: 5, title: 'Diwali Celebration', category: 'Cultural Events' },
    { id: 6, title: 'Philosophy Talk', category: 'Others' },
    { id: 7, title: 'Pizza and Politics', category: 'Food' },
    { id: 8, title: 'Outdoor Movie Night', category: 'Social' },
  ];

  const filteredEvents = events.filter(event =>
    (filter === 'All' || event.category === filter) &&
    event.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 py-10">
      <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
        <h1 className="text-6xl font-bold text-red-600 text-center">
          Colgate Events Calendar
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); }} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search for events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl shadow-md text-lg text-black focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </form>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                filter === cat
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-red-600 border-red-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="w-full mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} className="block">
                <div className="bg-white w-full p-0 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200 border border-gray-200 overflow-hidden">
                  <div className="h-40 bg-gray-300 w-full object-cover"></div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">{event.title}</h2>
                    <span className="inline-block mb-3 px-3 py-1 text-sm bg-red-100 text-red-700 rounded-full">
                      {event.category}
                    </span>
                    <p className="text-gray-600 text-sm mb-4">
                      This is a placeholder description for the event. More details can go here.
                    </p>
                    <div className="border-t pt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Share:</span>
                      <div className="flex space-x-3 text-red-500">
                        <button aria-label="Share on Facebook"><FaFacebook /></button>
                        <button aria-label="Share on Twitter"><FaTwitter /></button>
                        <button aria-label="Share on Instagram"><FaInstagram /></button>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500">No events found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
