"""Wayfarer API.

The frontend ships with a local-first demo mode so the planner is usable without
credentials. This small FastAPI service is the production seam for swapping in
Supabase persistence and a Groq/Gemini itinerary call later.
"""

from datetime import date, timedelta
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI(title="Wayfarer Travel Planner API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class GenerateRequest(BaseModel):
    destination: str = Field(min_length=2, max_length=120)
    start_date: date
    duration: int = Field(default=3, ge=2, le=14)
    travelers: int = Field(default=1, ge=1, le=20)
    budget: Literal["Budget", "Comfort", "Premium"] = "Comfort"
    pace: str = "Balanced"
    interests: list[str] = Field(default_factory=list)


class Activity(BaseModel):
    time: str
    type: str
    title: str
    location: str
    note: str


class DayPlan(BaseModel):
    day: str
    date: str
    title: str
    distance: str
    budget: str
    items: list[Activity]


CITY_PROFILES = {
    "paris": {
        "city": "Paris",
        "country": "France",
        "emoji": "✦",
        "weather": "12° / 7°",
        "weather_label": "Partly cloudy",
        "class_name": "scene-paris",
    },
    "kyoto": {
        "city": "Kyoto",
        "country": "Japan",
        "emoji": "⛩️",
        "weather": "16° / 8°",
        "weather_label": "Mild & bright",
        "class_name": "scene-kyoto",
    },
    "bali": {
        "city": "Bali",
        "country": "Indonesia",
        "emoji": "🌴",
        "weather": "29° / 24°",
        "weather_label": "Tropical & warm",
        "class_name": "scene-bali",
    },
    "lisbon": {
        "city": "Lisbon",
        "country": "Portugal",
        "emoji": "🚋",
        "weather": "20° / 14°",
        "weather_label": "Sunny & breezy",
        "class_name": "scene-lisbon",
    },
}

INTEREST_PLANS = {
    "Food & cafés": ("food", "A neighbourhood table worth slowing down for"),
    "Art & culture": ("culture", "A cultural deep dive"),
    "Nature & outdoors": ("nature", "A scenic side of the city"),
    "Local experiences": ("experience", "A local experience with room to wander"),
    "Shopping": ("shopping", "Independent shops and market finds"),
    "Nightlife": ("experience", "An easy evening with the locals"),
}


def profile_for(destination: str) -> dict:
    normalized = destination.lower()
    for key, profile in CITY_PROFILES.items():
        if key in normalized:
            return profile
    city, _, country = destination.partition(",")
    return {
        "city": city.strip().title() or "Your destination",
        "country": country.strip().title() or "Somewhere beautiful",
        "emoji": "✦",
        "weather": "18° / 11°",
        "weather_label": "Comfortable",
        "class_name": "scene-generic",
    }


def build_day(index: int, start: date, profile: dict, request: GenerateRequest) -> DayPlan:
    day_date = start + timedelta(days=index)
    chosen = request.interests or ["Local experiences", "Food & cafés"]
    focus = chosen[index % len(chosen)]
    activity_type, focus_title = INTEREST_PLANS.get(focus, ("experience", "A considered local stop"))
    is_first = index == 0
    is_last = index == request.duration - 1
    title = (
        f"Arrival & {profile['city']}" if is_first else
        "A slow goodbye" if is_last else
        f"{focus.split(' & ')[0]} discoveries"
    )
    budget = {"Budget": "$55", "Comfort": "$92", "Premium": "$180"}[request.budget]
    items = [
        Activity(
            time="09:30 AM",
            type="food",
            title="Coffee and something warm",
            location=f"A local favourite in {profile['city']}",
            note="Start close to the next stop with a recommendation chosen for your pace.",
        ),
        Activity(
            time="11:30 AM",
            type=activity_type,
            title=focus_title,
            location=f"A considered stop in {profile['city']}",
            note="A well-paced experience shaped around the things you said you want to notice.",
        ),
        Activity(
            time="03:30 PM",
            type="experience",
            title="A little room to wander",
            location="A walkable local pocket",
            note="Keep space for the unexpected: a shop, a view or a place locals love.",
        ),
        Activity(
            time="07:00 PM",
            type="food",
            title="Dinner worth planning for",
            location=f"Neighbourhood table · {profile['city']}",
            note="A memorable meal kept within your selected budget and travel style.",
        ),
    ]
    return DayPlan(
        day=f"Day {index + 1}",
        date=day_date.strftime("%b %-d"),
        title=title,
        distance=f"{3.2 + (index * 0.8):.1f} km on foot",
        budget=budget,
        items=items,
    )


@app.get("/api/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "wayfarer-api"}


@app.get("/api/destinations")
def destinations() -> list[dict[str, str]]:
    return [
        {"city": profile["city"], "country": profile["country"], "weather": profile["weather"]}
        for profile in CITY_PROFILES.values()
    ]


@app.post("/api/itineraries/generate")
def generate_itinerary(request: GenerateRequest) -> dict:
    profile = profile_for(request.destination)
    days = [build_day(index, request.start_date, profile, request) for index in range(request.duration)]
    budget_total = {"Budget": "$520", "Comfort": "$820", "Premium": "$1,240"}[request.budget]
    interests = request.interests or ["Local experiences", "Food & cafés"]
    return {
        "city": profile["city"],
        "country": profile["country"],
        "days": request.duration,
        "travelers": request.travelers,
        "budget": budget_total,
        "budgetLevel": request.budget,
        "style": request.pace,
        "weather": profile["weather"],
        "weatherLabel": profile["weather_label"],
        "className": profile["class_name"],
        "emoji": profile["emoji"],
        "tags": interests[:3],
        "intro": f"A {request.pace.lower()} {request.duration}-day plan shaped around {' and '.join(interests[:2])}.",
        "daysData": [day.model_dump() for day in days],
    }
