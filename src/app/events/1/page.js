'use client';

import { useState } from 'react';

export default function EventPage({ params }) {
  const { id } = params;
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([...comments, comment.trim()]);
    setComment('');
  };

  return (
    <main className="min-h-screen bg-white px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Event #{id}</h1>
        <p className="text-black mb-4">
          This is a placeholder detail page for event ID <strong>{id}</strong>.
        </p>

        <div className="h-64 bg-gray-200 rounded-lg mb-8"></div>

        <button className="mb-10 px-6 py-2 bg-red-600 text-white rounded-full hover:bg-red-700">
          Add to Calendar
        </button>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-black">Leave a Comment</h2>
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full p-4 border border-black text-black rounded-xl mb-2"
              rows="4"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              Submit
            </button>
          </form>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-black">Comments</h3>
            {comments.length === 0 ? (
              <p className="text-black/60">No comments yet.</p>
            ) : (
              <ul className="space-y-2">
                {comments.map((c, index) => (
                  <li key={index} className="bg-black/10 p-3 rounded-xl text-black">
                    {c}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
