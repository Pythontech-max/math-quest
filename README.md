# MathQuest - Gamified Math Learning Platform

A full-stack Next.js application for gamified math practice with XP, leaderboards, and admin dashboard.

## Tech Stack

- **Frontend**: Next.js 14, React, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: MySQL
- **Auth**: NextAuth.js with Google OAuth

## Getting Started

### Prerequisites

- Node.js 18+
- MySQL database
- Google OAuth credentials

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and fill in your values:
   ```bash
   cp .env.example .env
   ```

4. Push the database schema:
   ```bash
   npx prisma db push
   ```

5. (Optional) Seed the database:
   ```bash
   npx prisma db seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | MySQL connection string |
| `AUTH_SECRET` | Random secret for NextAuth (generate with `openssl rand -base64 32`) |
| `AUTH_URL` | Your app URL (e.g., `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret |

## Heroku Deployment

1. Create a Heroku app:
   ```bash
   heroku create your-app-name
   ```

2. Add MySQL addon (e.g., JawsDB):
   ```bash
   heroku addons:create jawsdb:kitefin
   ```

3. Set environment variables:
   ```bash
   heroku config:set AUTH_SECRET="your-secret"
   heroku config:set AUTH_URL="https://your-app.herokuapp.com"
   heroku config:set GOOGLE_CLIENT_ID="your-client-id"
   heroku config:set GOOGLE_CLIENT_SECRET="your-client-secret"
   ```

4. Update Google OAuth redirect URI to:
   `https://your-app.herokuapp.com/api/auth/callback/google`

5. Deploy:
   ```bash
   git push heroku main
   ```

## Project Structure

```
src/
├── app/
│   ├── api/          # API routes
│   ├── auth/         # Auth pages
│   ├── dashboard/    # Admin pages
│   ├── play/         # Game pages
│   └── student/      # Student pages
├── components/       # Reusable components
└── lib/              # Utilities
```

## Features

- **Students**: Play math games, earn XP, view leaderboard
- **Admin**: Manage students, view analytics, track payments
- **Game**: 4 operations, 3 difficulty levels, real-time scoring
