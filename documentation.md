# Telegram File Link Bot - Complete Documentation

## 1. Project Overview

The Telegram File Link Bot is a production-ready application designed to convert Telegram files into shareable, temporary, auto-expiring public links. It allows users to upload files via Telegram, retrieves a secure download link that expires in 30 minutes, and ensures that downloaders are active members of a designated Telegram channel (Force-Join verification).

The project is structured for a Serverless deployment environment on Vercel and relies on a Supabase PostgreSQL backend for managing user state, generating secure tokens, and enforcing expiration logic.

## 2. Technology Stack

- **Runtime & Language**: Node.js, TypeScript
- **Bot Framework**: grammY (`grammy`)
- **Database**: PostgreSQL (via `Supabase`)
- **Deployment Platform**: Vercel (Serverless Functions)
- **Code Formatting & Linting**: ESLint, Prettier

## 3. Project Architecture & Directory Structure

```text
src/
├── api/                  # Vercel Serverless API handlers
│   ├── cron.ts           # Cron job to clean up expired links
│   └── webhook.ts        # Telegram webhook endpoint
├── bot/                  # Core bot logic
│   ├── callbacks/        # Inline keyboard button callback handlers
│   ├── commands/         # Telegram command handlers (/start, /stats, upload)
│   ├── database/         # Database connection and client initialization
│   ├── middleware/       # Bot middlewares (Logging, Rate Limiting, User Auth)
│   ├── services/         # Encapsulated business logic for bot actions
│   ├── types/            # TypeScript interface definitions (Database, Context)
│   └── utils/            # Utility functions (e.g., cryptography, token generation)
├── services/             # Core Backend Services
│   ├── auth.service.ts   # Authentication and permissions
│   ├── channel.service.ts# Channel membership verification (Force Join)
│   ├── link.service.ts   # Secure link generation and management
│   ├── telegram.service.ts # Core Telegram API wrapper
│   └── user.service.ts   # User management and analytics
```

### Key Components:
- **`src/bot/index.ts`**: The main entry point for the bot configuration. It initializes the `grammY` instance, registers global middlewares (`logger`, `rateLimit`, `userRegister`), mounts commands, callbacks, and sets up a global error handler.
- **`src/api/webhook.ts`**: The serverless function that receives HTTP POST requests from the Telegram API and passes them to the `grammY` bot instance.
- **`src/api/cron.ts`**: A scheduled Vercel Cron function that deletes expired download links from the Supabase database to maintain security and manage storage/records.

## 4. Database Schema (Supabase PostgreSQL)

The database consists of two core tables: `users` and `download_links`.

### `users` Table
Tracks all unique users interacting with the bot.
- `telegram_id` (BIGINT, Primary Key): Unique Telegram User ID.
- `username` (TEXT): Telegram username.
- `first_name` (TEXT): Telegram first name.
- `joined_at` (TIMESTAMP): Date when the user first interacted with the bot.

### `download_links` Table
Stores generated tokens mapped to Telegram files.
- `id` (UUID, Primary Key): Unique row identifier.
- `token` (TEXT, Unique): The unique string generated for the shareable link.
- `telegram_file_id` (TEXT): The internal Telegram file ID required for fetching the file.
- `file_name` (TEXT): The name of the uploaded file.
- `file_size` (BIGINT): The file size in bytes.
- `created_by` (BIGINT, Foreign Key -> `users.telegram_id`): The user who uploaded the file.
- `created_at` (TIMESTAMP): Time of link generation.
- `expires_at` (TIMESTAMP): Expiration time (30 minutes after creation).

_Indexes:_ `idx_download_links_token` and `idx_download_links_expires_at` optimize lookup queries and cron job execution.

## 5. Core Features & Business Logic

### A. Link Generation
When a user sends a file (document, video, photo) to the bot, the `upload.ts` command handler is triggered. The bot relies on `link.service.ts` to:
1. Generate a secure, randomized token using `crypto`.
2. Determine the expiration time (Now + 30 minutes).
3. Save the mapping (`token` -> `telegram_file_id`) in the `download_links` table.
4. Reply to the user with the uniquely generated link pointing to the bot (e.g., `https://t.me/BotUsername?start=download_<token>`).

### B. Force-Join Channel Verification
When a user clicks a generated link, they are redirected to the bot with a `start` parameter containing the token.
The `start.ts` command handler relies on `channel.service.ts` to check if the user is a member of the configured `CHANNEL_ID`.
- If the user is **not** a member, the bot prompts them with an inline button to join the channel.
- If the user **is** a member, the `link.service.ts` validates the token, ensures it hasn't expired, and fetches the file from Telegram to send back to the user.

### C. Admin & Analytics
The bot includes a middleware (`admin.ts`) to restrict certain commands.
- **`/stats`**: Shows overall bot statistics such as total users registered and active download links.
- **`/broadcast <msg>`**: Allows the admin to send an announcement to all registered users in the database.

### D. Security & Optimization
- **Rate Limiting**: `rateLimit.ts` middleware prevents abuse and API spam.
- **Cron Jobs**: Vercel Cron hits `/api/cron` periodically to purge expired records from the database, minimizing stale data and potential token leaks.

## 6. Environment Variables configuration

To run the bot locally or in production, the following variables must be configured (e.g., inside `.env` or Vercel Dashboard):

```env
BOT_TOKEN=123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
BOT_USERNAME=MyCoolFileBot
ADMIN_ID=123456789
CHANNEL_ID=-100123456789
CHANNEL_URL=https://t.me/MyCoolChannel
SUPABASE_URL=https://xyz.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJh...
CRON_SECRET=super_secret_cron_string
```

## 7. Setup and Deployment Lifecycle

1. **Database initialization**: Apply `00000000000000_init.sql` to your Supabase project.
2. **Local Development**: Use `npm run build` to compile TypeScript. Set up local webhook tunneling (e.g., `ngrok`) if testing webhooks locally, or test via long-polling (requires modifying entry points).
3. **Deployment**: Deploy directly to Vercel via Vercel CLI (`vercel`) or GitHub integration.
4. **Webhook Registration**: Once deployed, manually call the Telegram API to register your Vercel API endpoint as the webhook receiver:
   `https://api.telegram.org/bot<BOT_TOKEN>/setWebhook?url=https://<VERCEL_DOMAIN>/api/webhook`
