// Sends the message through our Netlify Function (/api/telegram) so the
// Telegram bot token never reaches the browser.
// Local testing needs `netlify dev` — plain `npm run dev` has no /api/telegram
// handler, so the form will show a send error there.
export async function sendToTelegram(message: string): Promise<boolean> {
  try {
    const response = await fetch('/api/telegram', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      console.error('Telegram send failed:', response.status, await response.text());
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
}
