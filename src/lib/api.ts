export async function sendMessage(
  message: string,
  sessionId: string
): Promise<string> {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionId }),
  });

  if (!res.ok) {
    throw new Error(`Request error: ${res.status}`);
  }

  const data = await res.json();
  return data.response;
}
