'use client';

import { useState, useTransition } from 'react';
import { verifyPassword } from './actions';

export default function AuthPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await verifyPassword(formData);
      if (result?.error) setError(result.error);
    });
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <div className="w-full max-w-sm px-6">
        <p className="text-zinc-500 text-xs font-mono tracking-widest uppercase mb-2">
          Restricted Access
        </p>
        <h1 className="text-white text-2xl font-semibold tracking-tight mb-8">
          Enter Password
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            autoComplete="current-password"
            className="bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 px-4 py-3 text-sm focus:outline-none focus:border-zinc-500 w-full transition-colors"
          />
          {error && (
            <p className="text-red-400 text-xs font-mono">{error}</p>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="bg-white text-black text-sm font-semibold py-3 px-4 hover:bg-zinc-200 transition-colors disabled:opacity-40 mt-1"
          >
            {isPending ? 'Verifying…' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}
