# Telegram File Link Bot

A production-ready Telegram bot built with grammY, TypeScript, and deployed on Vercel with Supabase PostgreSQL.

## Features
- Convert Telegram files into temporary unique links
- Auto-expiring links (30 mins) via Vercel Cron
- Force-join channel check before downloading
- Admin stats and broadcast commands
- Serverless deployment

## Setup Instructions

### 1. Create Bot & Channel
- Message `@BotFather` to create a new bot and get the `BOT_TOKEN`.
- Create a Telegram Channel. Add your bot as an Administrator.
- Get the `CHANNEL_ID` (e.g. `-100123456789`) and `CHANNEL_URL` (invite link).

### 2. Supabase Setup
- Create a project on [Supabase](https://supabase.com/).
- Navigate to the **SQL Editor** and run the contents of `supabase/migrations/00000000000000_init.sql`.
- In **Project Settings > API**, copy the `Project URL` and `service_role` secret key.

### 3. Vercel Deployment
- Install Vercel CLI: `npm i -g vercel`
- Run `vercel` in the project directory to deploy.
- Add Environment Variables in the Vercel Dashboard:
  - `BOT_TOKEN`
  - `BOT_USERNAME`
  - `ADMIN_ID` (Your Telegram user ID)
  - `CHANNEL_ID`
  - `CHANNEL_URL`
  - `SUPABASE_URL`
  - `SUPABASE_SERVICE_ROLE_KEY`
  - `CRON_SECRET` (A random string for cron protection)
- Trigger a new deployment.

### 4. Webhook Setup
- Set the webhook to your Vercel deployment URL:
  `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook?url=https://<YOUR_VERCEL_DOMAIN>/api/webhook`

## Commands
- `/start` - Start the bot or open a link
- `/stats` - (Admin) Show bot statistics
- `/broadcast <msg>` - (Admin) Send a message to all users
