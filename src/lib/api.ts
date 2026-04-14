const WEBHOOK_URL =
  process.env.NEXT_PUBLIC_WEBHOOK_URL ||
  'http://localhost:5678/webhook/fitness-coach';

export async function sendMessage(
  message: string,
  sessionId: string
): Promise<string> {
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    throw new Error(`Webhook error: ${res.status}`);
  }

  const data = await res.json();
  return data.response;
}
