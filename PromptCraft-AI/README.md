# PromptCraft AI

An AI-powered web application that transforms simple user ideas into professional, detailed prompts and generates stunning images using OpenAI's GPT-4.1 and Images API.

---

## Project Overview

PromptCraft AI takes a user's simple text idea, enhances it into a rich, professional prompt using GPT-4.1, and then generates a high-quality image from that enhanced prompt using OpenAI's Images API. The application features a clean, modern UI built with React 19 and Tailwind CSS.

---

## Folder Structure

```
PromptCraft-AI/
├── client/                          # React 19 + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/                  # Static assets (images, icons)
│   │   ├── components/
│   │   │   ├── Navbar/
│   │   │   │   └── Navbar.jsx
│   │   │   ├── Hero/
│   │   │   │   └── Hero.jsx
│   │   │   ├── PromptInput/
│   │   │   │   └── PromptInput.jsx
│   │   │   ├── PromptCard/
│   │   │   │   └── PromptCard.jsx
│   │   │   ├── ImageCard/
│   │   │   │   └── ImageCard.jsx
│   │   │   ├── Loader/
│   │   │   │   └── Loader.jsx
│   │   │   ├── Button/
│   │   │   │   └── Button.jsx
│   │   │   └── Toast/
│   │   │       └── Toast.jsx
│   │   ├── pages/
│   │   │   └── Home/
│   │   │       └── Home.jsx
│   │   ├── hooks/
│   │   │   └── useGenerate.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── helpers.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── server/                          # Node.js + Express backend
│   ├── config/
│   │   └── openai.js
│   ├── controllers/
│   │   └── generateController.js
│   ├── middleware/
│   │   ├── errorHandler.js
│   │   └── validateInput.js
│   ├── routes/
│   │   └── generateRoutes.js
│   ├── services/
│   │   └── openaiService.js
│   ├── utils/
│   │   └── logger.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher
- An OpenAI API key (for Phase 2 & 3 implementation)

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/your-username/promptcraft-ai.git
cd promptcraft-ai
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

```bash
cd ../server
npm install
```

---

## Running the Application

### Frontend (React + Vite)

```bash
cd client
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Backend (Node.js + Express)

```bash
cd server
npm run dev
```

The backend will be available at `http://localhost:5000`.

> Run both the frontend and backend simultaneously for the full application experience.

---

## Environment Setup

1. Navigate to the `server/` directory.
2. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
3. Open `.env` and fill in your values:
   ```env
   OPENAI_API_KEY=your_actual_openai_api_key_here
   PORT=5000
   ```

> **Never commit your `.env` file.** It is already included in `.gitignore`.

---

## Tech Stack

| Layer      | Technology              | Version  |
|------------|-------------------------|----------|
| Frontend   | React                   | ^19.0.0  |
| Frontend   | Vite                    | ^5.x     |
| Frontend   | Tailwind CSS            | ^3.x     |
| Frontend   | React Router DOM        | ^6.x     |
| Frontend   | Axios                   | ^1.x     |
| Backend    | Node.js                 | ^18.x    |
| Backend    | Express.js              | ^4.x     |
| Backend    | OpenAI SDK              | ^4.x     |
| Backend    | dotenv                  | ^16.x    |
| Backend    | cors                    | ^2.x     |

---

## API Endpoints

| Method | Endpoint        | Description                               |
|--------|-----------------|-------------------------------------------|
| POST   | `/api/generate` | Accepts `userInput`, returns enhanced prompt + image URL |

### Request Body
```json
{
  "userInput": "a cat sitting on a mountain at sunset"
}
```

### Response Body
```json
{
  "success": true,
  "enhancedPrompt": "A majestic tabby cat perched on a rugged mountain peak...",
  "imageUrl": "https://..."
}
```

---

## Roadmap

### ✅ Phase 1 — Architecture & Boilerplate (Current)
- Monorepo structure scaffolded
- React 19 + Vite + Tailwind CSS frontend
- Express.js backend with routing and middleware
- Reusable component library
- Mock API responses

### 🔜 Phase 2 — GPT-4.1 Prompt Enhancement
- Integrate OpenAI GPT-4.1 in `openaiService.enhancePrompt()`
- Connect controller to call prompt enhancement service
- Add system prompt engineering for best results
- Stream responses for better UX

### 🔜 Phase 3 — OpenAI Images API Integration
- Integrate OpenAI Images API in `openaiService.generateImage()`
- Connect enhanced prompt to image generation pipeline
- Handle image storage or direct URL return
- Add image size/style configuration options

### 🔜 Phase 4 — Enhanced Features
- User authentication
- Prompt history & gallery
- Image download and sharing
- Rate limiting and usage tracking
- Deploy to Vercel (frontend) + Railway/Render (backend)

---

## License

MIT
