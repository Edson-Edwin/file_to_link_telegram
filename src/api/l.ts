import { VercelRequest, VercelResponse } from '@vercel/node';

export default function handler(req: VercelRequest, res: VercelResponse) {
  const { data } = req.query;
  const botUsername = process.env.BOT_USERNAME || '';
  
  if (!data) {
    return res.status(400).send('Missing data parameter');
  }

  const telegramUrl = `https://t.me/${botUsername}?start=${data}`;
  
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Redirecting to Telegram...</title>
        <meta http-equiv="refresh" content="0; url=${telegramUrl}">
        <style>
          body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #f0f2f5; margin: 0; }
          .card { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); text-align: center; }
          a { color: #0088cc; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Opening File in Telegram...</h2>
          <p>If you are not redirected automatically, <a href="${telegramUrl}">click here</a>.</p>
        </div>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
