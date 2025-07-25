// NeuraTask: AI Assistant (Chat + Planner + Summarizer)
// Built with Next.js, React, and OpenRouter (Mixtral API)

import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: input })
    });

    const data = await res.json();
    setResponse(data.output);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <Head>
        <title>NeuraTask</title>
      </Head>
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">NeuraTask: Your AI Work Assistant</h1>
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything: plan your day, summarize text, write content..."
            className="w-full p-3 rounded shadow"
            rows={5}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Thinking...' : 'Ask NeuraTask'}
          </button>
        </form>
        {response && (
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">Response:</h2>
            <p>{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}
