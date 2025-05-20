'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function checkSession() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push('/');
      }
    }
    checkSession();
  }, [router]);

  const handleSignup = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    setMessage(error ? error.message : 'Check your email to verify your account.');
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#821019] px-4 py-10">
      <div className="bg-[#FDF9F1] p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-[cinzel] font-bold text-[#821019] mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
          <button
            type="submit"
            className="w-full bg-[#D7B865] text-[#821019] font-semibold py-3 rounded-md hover:bg-[#c0a75c] transition"
          >
            Sign Up
          </button>
          {message && <p className="text-red-600 text-sm text-center">{message}</p>}
        </form>
      </div>
    </main>
  );
}