import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai'

export async function POST(request: Request) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const data = await request.json();

  const completion = await openai.createCompletion({
    max_tokens: 2048,
    model: "text-davinci-003",
    prompt: `Convert the following code to TypeScript. Include any necessary types:
    ${data.text}
    `,
  });

  const success = completion.data.choices.length > 0;

  return NextResponse.json({success, result: completion.data.choices[0]?.text});
}
