'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError('Invalid username or password');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Login failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Image
            src="/images/Main_Mass_Timber_Logo.PNG"
            alt="IW Mass Timber"
            width={80}
            height={80}
            className="mx-auto rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold text-cream font-[family-name:var(--font-jakarta)]">
            Admin Panel
          </h1>
          <p className="text-cream/50 text-sm mt-1">Sign in to manage site content</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-[#1E3A2A] rounded-2xl p-8 shadow-2xl border border-white/[0.06]">
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="mb-5">
            <label htmlFor="username" className="block text-sm font-semibold text-cream/80 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="Enter username"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-semibold text-cream/80 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-charcoal-950/50 border border-white/10 rounded-lg text-cream placeholder-cream/30 focus:outline-none focus:border-amber-500 transition-colors"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 text-charcoal-950 font-bold rounded-lg hover:bg-amber-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
