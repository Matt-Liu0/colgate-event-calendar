'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FacebookShareButton, FacebookIcon,
  TwitterShareButton, TwitterIcon,
  WhatsappShareButton, WhatsappIcon,
  RedditShareButton, RedditIcon,
  InstagramIcon
} from 'next-share';

function EventCard({ event }) {
  const downvoteNum = 0;
  const upvoteNum = 1;

  const themes = (event.filters?.event_event_themes || []).slice(0, 3);
  const [totalUpvotes, updateUpvotes] = useState(0);
  const [totalDownvotes, updateDownvotes] = useState(0);
  const [votedDown, setVotedDown] = useState(false);
  const [votedUp, setVotedUp] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  
  const handleVote = (voteNum) => {
    if (votedDown && voteNum === downvoteNum || votedUp && voteNum === upvoteNum) {
      return;
    } else if (voteNum === downvoteNum && votedUp) {
      updateUpvotes(totalUpvotes - 1);
      updateDownvotes(totalDownvotes + 1);
      setVotedDown(true);
      setVotedUp(false);
    } else if (voteNum === upvoteNum && votedDown) {
      updateDownvotes(totalDownvotes - 1);
      updateUpvotes(totalUpvotes + 1);
      setVotedUp(true);
      setVotedDown(false);
    } else {
      if (voteNum === upvoteNum) {
        updateUpvotes(totalUpvotes + 1);
        setVotedUp(true);
      } else {
        updateDownvotes(totalDownvotes + 1);
        setVotedDown(true);
      }
      setTotalVotes(totalVotes + 1);
    }
  }


  return (
    
    <div className="flex flex-col h-full justify-between rounded-xl border border-[#D7B865] bg-[#FDF9F1] p-4">
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
          <Link key={event.id} href={`/events/${event.id}`} passHref className="block">
            <h2
              className="text-xl font-bold text-[#821019] mb-2"
              style={{
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {event.title}
            </h2>
            </Link>

            <div className="flex flex-wrap gap-1 mb-1">
              {themes.map((theme, idx) => (
                <span
                  key={idx}
                  className="inline-block px-2 py-0.5 text-xs bg-red-100 text-[#821019] rounded-full whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis"
                  style={{
                    display: 'inline-block',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                  }}
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
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                {/* <!-- Upvote Icon --> */}
                <button className="hover:text-green-600 transition" onClick={() => handleVote(upvoteNum)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M3 10h4v7h6v-7h4l-7-7-7 7z" />
                  </svg>
                </button>
                <span>{totalUpvotes}</span>
              </div>
              <div className="flex items-center space-x-1">
                {/* <!-- Downvote Icon --> */}
                <button className="hover:text-red-600 transition" onClick={() => handleVote(downvoteNum)}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                    <path d="M17 10h-4V3H7v7H3l7 7 7-7z" />
                  </svg>
                </button>
                <span>{totalDownvotes}</span>
              </div>
              <span className="ml-2 text-xs text-gray-500">({((totalUpvotes/totalVotes) * 100) || 0}% approval)</span>
            </div>
          </div>

          <div className="border-t pt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">Share:</span>
            <div className="flex gap-x-[10px]">
              <FacebookShareButton url={`http://localhost:3000/events/${event.id}`}>
                <FacebookIcon size={22} round />
              </FacebookShareButton>
              <TwitterShareButton url={`http://localhost:3000/events/${event.id}`}>
                <TwitterIcon size={22} round />
              </TwitterShareButton>
              <WhatsappShareButton url={`http://localhost:3000/events/${event.id}`}>
                <WhatsappIcon size={22} round />
              </WhatsappShareButton>
              <RedditShareButton url={`http://localhost:3000/events/${event.id}`}>
                <RedditIcon size={22} round />
              </RedditShareButton>
              <InstagramIcon size={22} round />
            </div>
          </div>
        </div>
      </div>
  );
}

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
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#821019] px-4 py-10">
      <div className="flex flex-col items-center space-y-6 w-full max-w-3xl">
        <h1 className="text-6xl font-[cinzel] font-[700] text-[#D7B865] text-center">
          Colgate Events Calendar
        </h1>

        <form onSubmit={(e) => { e.preventDefault(); }} className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search for events..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white px-4 py-3 rounded-xl shadow-md text-lg text-[#821019] focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </form>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium border ${
                filter === cat
                  ? 'bg-[#D7B865] text-[#821019] border-[#D7B865]'
                  : 'bg-white text-[#821019] border-[#D7B865]'
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
              <EventCard key={event.id} event={event} />
            ))
          ) : (
            <p className="text-[#F3EBD3] text-center italic text-lg font-light mt-10">
              No events at the moment — check back soon for upcoming highlights.
            </p>
          )}
        </div>
      </div>
    </main>
  );
}
