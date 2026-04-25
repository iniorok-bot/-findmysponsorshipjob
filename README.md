# Find My Sponsorship Job

A personalised job search engine for UK care and support roles with visa sponsorship.
Covers NHS, private healthcare, specialist providers, residential care, domiciliary care, and local authority roles across the UK with a focus on Scotland.

## Features
- CV upload with automatic profile extraction (Claude API)
- Live job search via Adzuna API
- 5-sector classification (NHS Hospital, NHS Community, Specialist, Private, Residential, Domiciliary, Local Authority)
- Sponsorship confidence badge per sector
- 30-minute auto-refresh with new job alerts
- Green tick tracking — new vs seen jobs, persisted in browser
- CV gap analysis per job — shows skills to add to your CV
- Direct links to NHS Scotland, NHS Board pages, myjobscotland
- Displaced worker priority filter

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Add your Claude API key (for CV extraction)
Create a `.env` file in the root:
```
VITE_CLAUDE_API_KEY=your_claude_api_key_here
```
Get your key at: https://console.anthropic.com

The Adzuna API keys are already included in the app.

### 3. Run locally
```bash
npm run dev
```

### 4. Deploy to Vercel

**Option A — Via GitHub (recommended):**
1. Push this folder to a GitHub repository
2. Go to vercel.com and sign in with GitHub
3. Click "New Project" and import your repository
4. Add environment variable: `VITE_CLAUDE_API_KEY` = your key
5. Click Deploy
6. Your app will be live at `your-project.vercel.app`

**Option B — Via Vercel CLI:**
```bash
npm install -g vercel
vercel
```

## Notes
- Without a Claude API key, the CV upload still works but falls back to a demo profile
- Without Adzuna returning results (CORS in some environments), the app uses realistic demo data
- The seen/unseen tick state is stored per browser — each user has their own tracking
- Scotland is weighted higher in search results by default
