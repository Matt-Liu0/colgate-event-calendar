'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
// import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { 
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  RedditShareButton, RedditIcon,
  InstagramIcon
 } from 'next-share';

export default function Home() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Academics',
    'Campus affairs',
    'Athletics',
    'Arts',
    'Community',
    'Sustainability'
  ];


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://calendar.colgate.edu/api/2/events');
        
        const data = await res.json();
        console.log(data); //console.log used to look at the api info
        setEvents(data.events.map(e => e.event));
      } catch (err) {
        console.error('Failed to fetch events:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter(event => {
    const title = event.title || '';
    const themes = event.filters?.event_event_themes || [];
    return (
      (filter === 'All' || themes.some(t => t.name === filter)) &&
      title.toLowerCase().includes(query.toLowerCase())
    );
  });

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-white px-4 py-10">
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
          {loading ? (
            <p className="text-gray-500">Loading events...</p>
          ) : filteredEvents.length > 0 ? (
            filteredEvents.map((event) => (
              <Link key={event.id} href={`/events/${event.id}`} passHref className="block">
                <div className="bg-white w-[95%] md:w-[90%] h-[500px] rounded-2xl shadow-lg mx-auto hover:shadow-xl transition-shadow duration-200 border border-gray-200 overflow-hidden flex flex-col">
                  {event.photo_url ? (
                    <img
                      src={event.photo_url}
                      alt={event.title}
                      className="h-60 w-full object-cover"
                    />
                  ) : (
                    <div className="h-60 w-full bg-gray-300"></div>
                  )}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h2 className="text-xl font-bold text-red-600 mb-2">{event.title}</h2>
                      <div className="flex flex-wrap gap-1 mb-1">
                        {(event.filters?.event_event_themes?.slice(0, 3) || []).map((theme, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded-full whitespace-nowrap"
                          >
                            {theme.name}
                          </span>
                        ))}
                      </div>
                      <p className="text-gray-600 text-sm mb-4">
                        {event.description_text?.length > 120
                          ? event.description_text.substring(0, 120) + '...'
                          : event.description_text || 'No description available.'}
                      </p>
                    </div>
                    <div className="border-t pt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">Share:</span>
                      <div className="flex space-x-3 text-red-500">
                        <div className="flex gap-x-[10px]">
                          {/* icons and buttons used to share to popular social media platforms */}
                          <FacebookShareButton
                            url={`http://localhost:3000/events/${event.id}`}
                          >
                            <FacebookIcon size={22} round />
                          </FacebookShareButton>
                          <TwitterShareButton
                            url={`http://localhost:3000/events/${event.id}`}
                          >
                            <TwitterIcon size={22} round />
                          </TwitterShareButton>
                          <WhatsappShareButton
                            url={`http://localhost:3000/events/${event.id}`}
                          >
                            <WhatsappIcon size={22} round />
                          </WhatsappShareButton>
                          <RedditShareButton 
                          url={`http://localhost:3000/events/${event.id}`}>
                            <RedditIcon size={22} round />
                          </RedditShareButton>
                          <InstagramIcon size={22} round />
                        </div>                      </div>
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
