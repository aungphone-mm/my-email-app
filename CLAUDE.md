# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run both frontend (Vite) and backend (Express) concurrently
npm run dev

# Run only the Vite dev server (port 5173)
npm run dev:client

# Run only the Express proxy server (port 3001)
npm run dev:server

# Production build
npm run build
```

There are no tests in this project.

## Architecture

This is a two-process React app:

- **Frontend** (`src/App.jsx`): Single-component React app built with Vite. Uses Tailwind CSS utility classes inline (no separate config — classes are applied directly in JSX). Uses `lucide-react` for icons. No routing.

- **Backend** (`server.js`): Thin Express proxy on port 3001. Accepts `POST /api/generate` with `{ prompt, max_tokens? }`, forwards to the Groq API (`llama-3.3-70b-versatile` model), and normalises the response into `{ content: [{ text }] }` so the frontend doesn't need to know the underlying API shape. Also serves the `dist/` static build in production.

- **API key**: Stored in `.env` as `GROQ_API_KEY`. Loaded server-side via `dotenv`. The frontend never accesses this variable directly — all AI calls go through `fetch('/api/generate')`.

- **Vite proxy**: In dev, Vite proxies `/api/*` requests to `http://localhost:3001` so both processes appear on one origin. In production, `server.js` serves the static build and handles `/api/*` itself.

- **Response parsing**: The frontend reads `data.content[0].text`. The backend normalises the Groq OpenAI-compatible response (`data.choices[0].message.content`) into that shape before responding.
