// Relays form submissions to the studio's Telegram group.
// The bot token lives in Netlify environment variables (Site configuration →
// Environment variables: TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID) — never in code.

const ALLOWED_ORIGINS = [
  'https://emomotion.com',
  'https://www.emomotion.com',
];

// Telegram sendMessage hard limit
const MAX_MESSAGE_LENGTH = 4096;

function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  // This site's *.netlify.app URL and its deploy previews / branch deploys
  if (/^https:\/\/([a-z0-9-]+--)?steady-pastelito-b34eda\.netlify\.app$/.test(origin)) return true;
  // `netlify dev` local testing
  if (/^http:\/\/localhost(:\d+)?$/.test(origin)) return true;
  return false;
}

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return Response.json({ ok: false, error: 'Method not allowed' }, { status: 405 });
  }

  const origin = req.headers.get('origin') || '';
  if (!isAllowedOrigin(origin)) {
    return Response.json({ ok: false, error: 'Forbidden' }, { status: 403 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID env vars are not set');
    return Response.json({ ok: false, error: 'Server not configured' }, { status: 500 });
  }

  let message: unknown;
  try {
    const body = await req.json();
    message = body?.message;
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof message !== 'string' || !message.trim() || message.length > MAX_MESSAGE_LENGTH) {
    return Response.json({ ok: false, error: 'Invalid message' }, { status: 400 });
  }

  try {
    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!tgResponse.ok) {
      console.error('Telegram API error:', await tgResponse.text());
      return Response.json({ ok: false, error: 'Telegram API error' }, { status: 502 });
    }

    return Response.json({ ok: true });
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return Response.json({ ok: false, error: 'Network error' }, { status: 502 });
  }
};

export const config = {
  path: '/api/telegram',
};
