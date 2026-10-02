# Tundar Technologies

The official Tundar Technologies website — AI, cloud computing, intelligent search,
digital payments, education, and enterprise software.

## What's inside

| Path | Description |
|---|---|
| `index.html` | Homepage — hero, products, stats, about, global reach, team, contact, Regina AI section |
| `about.html` | About / company vision page |
| `Regina.html` | Regina AI assistant interface |
| `regina-backend/` | Express.js API server for Regina AI (chat endpoints, conversation memory, modular provider architecture) |
| `Images/`, `assets/` | Brand imagery and fonts/icons |

## Run the site

The frontend is static HTML/CSS/JS — open `index.html` directly or serve it with any
static host (Vercel, Netlify, GitHub Pages, nginx).

## Run the Regina backend

```bash
cd regina-backend
npm install
npm start        # or: npm run dev (nodemon)
```

The server runs on port 3000 by default (configurable via `.env`).

### API endpoints

- `GET /` — service info
- `GET /health` — health check
- `GET /api` — API overview
- `POST /api/chat` — send a chat message to Regina AI

---

© Tundar Technologies. All rights reserved.
