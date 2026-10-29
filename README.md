# Wayfarer · Personalized Travel Itinerary Planner

Wayfarer is a polished, local-first travel planning dashboard built for the Personalized Travel Itinerary Planner brief. It combines a React + Vite interface with a small FastAPI service seam for itinerary generation.

## What is included

- Responsive SaaS-style travel dashboard with Overview, My trips, Explore, Saved and Settings sections.
- Three-step trip builder for destination, dates, duration, interests, pace, travelers and budget.
- Local itinerary generation that works immediately without API keys.
- Day-by-day itinerary view with activities, locations, estimated spend, weather, progress checks and a pre-trip checklist.
- Save / unsave trips, edit or regenerate a plan, search and filter trips, share, and export an itinerary as JSON.
- `localStorage` persistence so a reviewer can create a trip, reload the page and keep it.
- FastAPI endpoints at `/api/health`, `/api/destinations` and `/api/itineraries/generate` ready for Supabase / Groq integration.
- Scenic destination artwork is CSS/SVG based, so the demo does not depend on fragile third-party image URLs.

## Run the frontend

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal. The Vite config binds to `0.0.0.0` for hosted previews.

To create a production build:

```bash
npm run build
npm run preview
```

## Run the FastAPI service (optional)

The UI has a local-first fallback and does not require the backend for the demo. To run the API separately:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

Test it with:

```bash
curl http://localhost:8000/api/health
```

The API is deliberately provider-neutral. In a deployed version, the `generate_itinerary` route can call Groq AI using a server-side `GROQ_API_KEY`, retrieve destination imagery via Unsplash, and persist authenticated trips with Supabase. Secrets should stay on the backend and never be placed in the React bundle.

## Project structure

```text
.
├── backend/
│   ├── main.py
│   └── requirements.txt
├── src/
│   ├── App.jsx
│   ├── data.js
│   ├── main.jsx
│   └── styles.css
├── index.html
├── package.json
└── vite.config.js
```

## Suggested submission walkthrough

1. Open **Plan a new trip** from the dashboard.
2. Choose a destination, dates and duration; move through the three steps.
3. Generate the itinerary and open the day tabs.
4. Mark activities complete, switch days, save/share/export or regenerate the plan.
5. Visit **My trips**, **Explore**, **Saved** and **Settings** to demonstrate the rest of the product surface.
