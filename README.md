# PollyGlot Translation App 🦜

A modern, AI-powered translation application that provides seamless translation between multiple languages using OpenAI's GPT models.

## Features 🌟

- Clean, intuitive user interface
- Real-time translation
- Support for multiple languages:
  - 🇫🇷 French
  - 🇪🇸 Spanish
  - 🇯🇵 Japanese
- Powered by OpenAI's GPT models
- Responsive design for all devices
- Beautiful animations and transitions
- Instant feedback and error handling

## Tech Stack 💻

- Frontend:
  - HTML5
  - CSS3 with modern animations
  - Vanilla JavaScript (ES6+)
  - Vite (for development and building)

- Backend:
  - Cloudflare Workers
  - OpenAI API integration

## Prerequisites 📋

Before you begin, ensure you have:
- Node.js (v14 or higher)
- npm (Node Package Manager)
- An OpenAI API key
- A Cloudflare account

## Local Development 🛠️

1. Clone the repository:
```bash
git clone https://github.com/yourusername/pollyglot.git
cd pollyglot
```

2. Install dependencies:
```bash
npm install
```

3. Create a `wrangler.toml` file in the root directory and add your OpenAI API key:
```toml
name = "pollyglot-backend"
main = "server.js"
compatibility_date = "2024-01-04"

[vars]
OPENAI_API_KEY = "your-api-key-here"
```

4. Start the development servers:
```bash
# Terminal 1: Start the Cloudflare Worker
npm run dev

# Terminal 2: Start the frontend
npx vite
```

5. Open your browser and navigate to `http://localhost:3000`

## Production Deployment 🚀

### Backend (Cloudflare Workers)
1. Deploy to Cloudflare Workers:
```bash
npm run deploy
```
2. Set up environment variables in Cloudflare Dashboard:
   - Go to Workers & Pages
   - Select your worker
   - Add `OPENAI_API_KEY` in Settings > Variables

### Frontend (Netlify)
1. Push your code to GitHub
2. Connect your repository to Netlify
3. Deploy with these settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Environment variables: None required

## Available Scripts 📜

- `npm run dev` - Start the Cloudflare Worker development server
- `npm run deploy` - Deploy the worker to Cloudflare
- `npm run build` - Build for production
- `npx vite` - Start the frontend development server

## Project Structure 📁

```
pollyglot/
├── index.html          # Main HTML file
├── index.js           # Frontend JavaScript
├── index.css          # Styles
├── server.js          # Cloudflare Worker
├── package.json       # Dependencies and scripts
├── wrangler.toml      # Cloudflare configuration
├── netlify.toml       # Netlify configuration
└── .gitignore        # Git ignore rules
```

## Environment Variables 🔐

Required environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key (set in Cloudflare Dashboard for production)

## Security Notes 🔒

- Never commit your API keys
- API keys are stored securely in Cloudflare Workers
- All API calls are made server-side for security

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments 🙏

- OpenAI for providing the GPT API
- Cloudflare for Workers platform
- All contributors and users of the application

---
Made with ❤️ by Samuel Smith