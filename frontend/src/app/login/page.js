'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';

export default function LoginPage() {
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

  const handleLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(error.message);
    } else {
      router.push('/');
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-[#821019] px-4 py-10">
      <div className="absolute top-4 right-4 text-white">
        <Link href="/signup" className="hover:underline">Sign up</Link>
      </div>
      <div className="bg-[#FDF9F1] p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-3xl font-[cinzel] font-bold text-[#821019] mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
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
            Login
          </button>
          {message && <p className="text-red-600 text-sm text-center">{message}</p>}
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">Don't have an account?</p>
          <Link href="/signup" className="text-[#821019] font-medium hover:underline">Sign up here</Link>
        </div>
      </div>
    </main>
  );
} 