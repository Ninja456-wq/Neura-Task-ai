import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { prompt } = req.body;

  try {
    const completion = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: 'mistral/mixtral-8x7b-instruct',
        messages: [
          { role: 'system', content: 'You are NeuraTask, a productivity-focused AI assistant.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const data = await completion.json();
    const output = data.choices?.[0]?.message?.content || 'No response received.';
    res.status(200).json({ output });
  } catch (err) {
    res.status(500).json({ output: 'Error fetching response. Please try again later.' });
  }
}
