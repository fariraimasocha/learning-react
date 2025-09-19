import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

const apiKey = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({
  apiKey,
});

const prompt =
  'Create a picture of a nano banana dish in a fancy restaurant with a Gemini theme';

export async function POST(request) {
  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash-image-preview',
    contents: prompt,
  });

  return NextResponse.json({ result: response });
}
