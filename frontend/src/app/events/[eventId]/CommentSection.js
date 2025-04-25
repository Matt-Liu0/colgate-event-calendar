"use client";
import { useState, useEffect } from 'react';

export default function CommentSection() {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments([...comments, comment.trim()]);
    setComment('');
  };

  return (
    <main className="items-center min-h-screen bg-[#821019] px-6 py-10">
      <div className="max-w-3xl mx-auto">
        <section>
            
          <h2 className="text-2xl font-semibold mb-2 text-[#D7B865]">Leave a Comment</h2>
          <form onSubmit={handleSubmit} className="mb-6">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment here..."
              className="w-full p-4 border border-[#D7B865] border-[2px] text-[#F3EBD3] rounded-xl mb-2"
              rows="4"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-[#F3EBD3] rounded-full hover:bg-red-700"
            >
              Submit
            </button>
          </form>

          <div>
            <h3 className="text-lg font-semibold mb-2 text-[#F3EBD3]">Comments</h3>
            {comments.length === 0 ? (
              <p className="text-[#F3EBD3]/60">No comments yet.</p>
            ) : (
              <ul className="space-y-2">
                {comments.map((c, index) => (
                  <li key={index} className="bg-black/10 p-3 rounded-xl text-[#F3EBD3]">
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
