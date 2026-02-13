import { anthropic } from '@ai-sdk/anthropic';
import { streamText } from 'ai';
import { buildSystemPrompt } from '@/lib/chat-context';

export async function POST(request: Request) {
  const { messages } = await request.json();

  const result = streamText({
    model: anthropic('claude-haiku-4-5-20251001'),
    system: buildSystemPrompt(),
    messages,
  });

  return result.toTextStreamResponse();
}
