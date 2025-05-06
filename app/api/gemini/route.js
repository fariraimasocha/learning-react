import { GoogleGenAI } from '@google/genai';
import { NextResponse } from 'next/server';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

export async function POST(req) {
  const { prompt } = await req.json();

  try {
    const response = await ai.chats({
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      model: 'gemini-2.0-flash',
    });

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}
