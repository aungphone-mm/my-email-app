# Aung Phone Email Writing Assistant

An AI-powered email writing assistant that transforms your raw thoughts into polished, professional emails.

🌐 **Live demo**: [my-email-app-eta.vercel.app](https://my-email-app-eta.vercel.app)

## Features

- Transform rough thoughts into well-crafted emails
- Six tone options: Professional, Warm, Concise, Formal, Casual, Persuasive
- Optional context input for writing reply emails
- Copy to clipboard

## Tech Stack

- **Frontend**: React + Vite, Tailwind CSS, lucide-react
- **Backend**: Express proxy server
- **AI**: Groq API (`openai/gpt-oss-120b`)

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the project root with your API key:
   ```
   GROQ_API_KEY=your_api_key_here
   ```

3. Run the app:
   ```bash
   npm run dev
   ```

   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:3001`

## Deployment

The app is deployed on Vercel. Set the API key in your Vercel project's environment variables under **Settings → Environment Variables**.
