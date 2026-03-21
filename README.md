# BullyChat

A sarcastic AI chatbot that roasts your ideas with wit, humor, and irony. Powered by [Groq](https://groq.com/) (Llama 4 Scout) and built with Next.js.

Every response is a clever punchline — served in Ukrainian.

## Features

- **Real-time streaming** — AI responses appear token-by-token as they're generated
- **Sarcastic persona** — the bot roasts your ideas, not you personally
- **Ukrainian language** — all responses are in Ukrainian
- **Warning modal** — disclaimer shown on first visit (it's just for fun)
- **Clean UI** — dark theme, chat bubbles, auto-scroll

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org/) (App Router) |
| Language | TypeScript 5 |
| UI | React 19, [Tailwind CSS 4](https://tailwindcss.com/) |
| State | [Zustand](https://zustand-demo.pmnd.rs/) |
| LLM | [Groq API](https://groq.com/) (Llama 4 Scout 17B) |
| Icons | [Lucide React](https://lucide.dev/) |
| Linting | [Biome](https://biomejs.dev/) |

## Getting Started

### Prerequisites

- Node.js 18+
- A [Groq API key](https://console.groq.com/keys)

### Installation

```bash
git clone https://github.com/your-username/BullyChat.git
cd BullyChat
npm install
```

### Environment Setup

Create a `.env` file in the project root:

```env
GROQ_API_KEY=your_groq_api_key_here
```

### Run

```bash
# Development
npm run dev

# Production build
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
app/
├── api/chatMessage/route.ts    # POST endpoint — streams LLM response
├── store/useBullyStore.ts      # Zustand store (messages, modal state)
├── component/
│   ├── Chat/Chat.tsx           # Input field + send button
│   ├── MessageFeed/MessageFeed.tsx  # Message display with auto-scroll
│   └── InfoModal/InfoModal.tsx      # Warning/disclaimer modal
├── page.tsx                    # Home page
├── layout.tsx                  # Root layout
└── globals.css                 # Global styles + animations
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run Biome linter |
| `npm run format` | Format code with Biome |

## License

MIT
