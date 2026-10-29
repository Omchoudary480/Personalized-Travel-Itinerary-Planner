export const interestOptions = [
  { label: 'Food & cafés', icon: 'utensils' },
  { label: 'Art & culture', icon: 'landmark' },
  { label: 'Nature & outdoors', icon: 'tree' },
  { label: 'Local experiences', icon: 'sparkles' },
  { label: 'Shopping', icon: 'shopping-bag' },
  { label: 'Nightlife', icon: 'moon' },
]

export const destinationCatalog = [
  {
    city: 'Kyoto',
    country: 'Japan',
    subtitle: 'Temples, tea houses & hidden lanes',
    className: 'scene-kyoto',
    photo: '/destinations/kyoto.jpg',
    emoji: '⛩️',
    color: '#b9574a',
    tags: ['Culture', 'Slow travel'],
    blurb: 'A gentle rhythm of gardens, lantern-lit streets and unforgettable local flavours.',
  },
  {
    city: 'Tokyo',
    country: 'Japan',
    subtitle: 'Neon streets & quiet rituals',
    className: 'scene-tokyo',
    photo: '/destinations/tokyo.jpg',
    emoji: '🗼',
    color: '#b9574a',
    tags: ['City energy', 'Food'],
    blurb: 'A high-low mix of electric neighbourhoods, tiny restaurants and peaceful gardens.',
  },
  {
    city: 'Lisbon',
    country: 'Portugal',
    subtitle: 'Golden light on every corner',
    className: 'scene-lisbon',
    photo: '/destinations/lisbon.jpg',
    emoji: '🚋',
    color: '#d17b3f',
    tags: ['Food', 'City break'],
    blurb: 'Ride the trams, taste the pastries and let the hills lead you to the view.',
  },
  {
    city: 'Bali',
    country: 'Indonesia',
    subtitle: 'Island days, made your way',
    className: 'scene-bali',
    photo: '/destinations/bali.jpg',
    emoji: '🌴',
    color: '#4c8c83',
    tags: ['Wellness', 'Nature'],
    blurb: 'Rice terraces, ocean air and a little more room to breathe between plans.',
  },
  {
    city: 'Amalfi Coast',
    country: 'Italy',
    subtitle: 'A postcard around every bend',
    className: 'scene-amalfi',
    photo: '/destinations/amalfi.jpg',
    emoji: '🍋',
    color: '#417a92',
    tags: ['Scenic', 'Romantic'],
    blurb: 'Coastal villages, long lunches and views that make the journey the destination.',
  },
]

const parisDays = [
  {
    day: 'Day 1',
    date: 'Nov 15',
    title: 'Arrival & Montmartre',
    distance: '3.8 km on foot',
    budget: '€78',
    items: [
      { time: '10:30 AM', type: 'stay', title: 'Check in at Hôtel Le Milie', location: 'Le Marais · 4th arrondissement', note: 'Leave your bags, settle in and take a slow first walk through the neighbourhood.' },
      { time: '01:00 PM', type: 'food', title: 'Lunch at Café de Flore', location: 'Saint-Germain-des-Prés', note: 'A classic Parisian lunch with a table outside if the weather holds.' },
      { time: '03:30 PM', type: 'culture', title: 'Wander through Montmartre', location: 'Place du Tertre · 18th arrondissement', note: 'Take the quiet backstreets up to Sacré-Cœur for a first city panorama.' },
      { time: '07:30 PM', type: 'food', title: 'Natural wine at Le Barav', location: 'Rue Oberkampf · 11th arrondissement', note: 'A relaxed neighbourhood dinner with small plates and local bottles.' },
    ],
  },
  {
    day: 'Day 2',
    date: 'Nov 16',
    title: 'Art, gardens & the Seine',
    distance: '5.2 km on foot',
    budget: '€112',
    items: [
      { time: '09:00 AM', type: 'food', title: 'Coffee & a warm croissant', location: 'Fragments · Le Marais', note: 'Start close to home with an excellent flat white and something flaky.' },
      { time: '10:30 AM', type: 'culture', title: 'Musée de l’Orangerie', location: 'Jardin des Tuileries', note: 'Book the first entry to see Monet’s Water Lilies without the midday crowds.' },
      { time: '01:30 PM', type: 'nature', title: 'Picnic in Jardin du Luxembourg', location: '6th arrondissement', note: 'Pick up a picnic from a nearby market and take the long way through the gardens.' },
      { time: '05:00 PM', type: 'experience', title: 'Golden-hour Seine walk', location: 'Pont Neuf to Île Saint-Louis', note: 'The best light lands on the river just before dinner.' },
    ],
  },
  {
    day: 'Day 3',
    date: 'Nov 17',
    title: 'Markets & a slow goodbye',
    distance: '4.1 km on foot',
    budget: '€84',
    items: [
      { time: '09:30 AM', type: 'food', title: 'Market breakfast at Marché d’Aligre', location: 'Place d’Aligre · 12th arrondissement', note: 'Try the local cheese stalls, fresh fruit and a final pain au chocolat.' },
      { time: '12:00 PM', type: 'shopping', title: 'Independent shops in the 11th', location: 'Rue de Charonne', note: 'A low-key browse for ceramics, books and small gifts to bring home.' },
      { time: '03:00 PM', type: 'culture', title: 'Last look from Canal Saint-Martin', location: '10th arrondissement', note: 'A calm final stop before heading back for your bags and the airport.' },
    ],
  },
]

const kyotoDays = [
  {
    day: 'Day 1', date: 'Mar 12', title: 'Lanterns & first tastes', distance: '4.4 km on foot', budget: '¥9,600', items: [
      { time: '02:00 PM', type: 'stay', title: 'Check in at Noku Kyoto', location: 'Near Kyoto Imperial Palace', note: 'A calm base with easy access to the metro and the old city.' },
      { time: '04:30 PM', type: 'culture', title: 'Lantern-lit Gion walk', location: 'Hanamikoji Street', note: 'Explore respectfully at golden hour and keep an eye out for quiet side lanes.' },
      { time: '07:00 PM', type: 'food', title: 'Izakaya dinner at Pontocho', location: 'Pontocho Alley', note: 'Small plates, seasonal ingredients and a seat overlooking the Kamo River.' },
    ],
  },
  {
    day: 'Day 2', date: 'Mar 13', title: 'Shrines & bamboo', distance: '6.1 km on foot', budget: '¥12,800', items: [
      { time: '07:30 AM', type: 'culture', title: 'Fushimi Inari before the crowds', location: 'Fushimi Inari Taisha', note: 'Climb the first trail section early, then reward yourself with a tofu breakfast.' },
      { time: '11:30 AM', type: 'food', title: 'Soba at Arashiyama Yoshimura', location: 'Togetsukyo Bridge', note: 'A riverside lunch with handmade noodles and mountain views.' },
      { time: '01:30 PM', type: 'nature', title: 'Bamboo Grove & Okochi Sanso', location: 'Arashiyama', note: 'Continue beyond the main grove to find a quieter garden and tea house.' },
    ],
  },
  {
    day: 'Day 3', date: 'Mar 14', title: 'Tea, craft & a soft landing', distance: '3.2 km on foot', budget: '¥8,400', items: [
      { time: '10:00 AM', type: 'experience', title: 'Private tea ceremony', location: 'Camellia Garden', note: 'Learn the rhythm of matcha from a local host in a small group.' },
      { time: '01:00 PM', type: 'shopping', title: 'Browse Nishiki Market', location: 'Nishiki-dori', note: 'Taste your way through Kyoto’s kitchen, then pick up a few edible souvenirs.' },
      { time: '05:30 PM', type: 'food', title: 'Kaiseki farewell', location: 'Kiyamachi', note: 'A special final dinner focused on the season’s best ingredients.' },
    ],
  },
]

const baliDays = [
  {
    day: 'Day 1', date: 'Apr 04', title: 'Welcome to Ubud', distance: '2.6 km on foot', budget: '$86', items: [
      { time: '12:00 PM', type: 'stay', title: 'Settle into the jungle villa', location: 'Penestanan, Ubud', note: 'Take a breath, unpack slowly and let the afternoon stay unplanned.' },
      { time: '04:00 PM', type: 'nature', title: 'Campuhan Ridge walk', location: 'Ubud', note: 'An easy sunset walk through palm-lined hills just outside the centre.' },
      { time: '07:30 PM', type: 'food', title: 'Plant-based dinner at Moksa', location: 'Sayan', note: 'A garden-to-table tasting menu surrounded by tropical greenery.' },
    ],
  },
  {
    day: 'Day 2', date: 'Apr 05', title: 'Water, rice & stillness', distance: '5.4 km on foot', budget: '$72', items: [
      { time: '07:00 AM', type: 'nature', title: 'Tegalalang rice terraces', location: 'North of Ubud', note: 'Arrive early for cooler air and soft morning light on the fields.' },
      { time: '11:30 AM', type: 'experience', title: 'Balinese cooking workshop', location: 'Paon Bali Cooking Class', note: 'Shop at a local market, then make a family-style lunch together.' },
      { time: '05:00 PM', type: 'wellness', title: 'Flower bath & massage', location: 'Ubud', note: 'A restorative treatment to close a very full day.' },
    ],
  },
]

export const initialTrips = [
  {
    id: 'paris-weekend',
    city: 'Paris',
    country: 'France',
    dateLabel: 'Nov 15 – 17, 2026',
    startDate: '2026-11-15',
    photo: '/destinations/paris.jpg',
    endDate: '2026-11-17',
    days: 3,
    travelers: 1,
    budget: '€420',
    budgetLevel: 'Comfort',
    style: 'Slow & local',
    status: 'upcoming',
    saved: true,
    className: 'scene-paris',
    emoji: '✦',
    weather: '12° / 7°',
    weatherLabel: 'Partly cloudy',
    tags: ['Food & cafés', 'Art & culture', 'Local experiences'],
    intro: 'A thoughtful long weekend built around neighbourhood walks, excellent food and the city’s quieter corners.',
    daysData: parisDays,
  },
  {
    id: 'kyoto-spring',
    city: 'Kyoto',
    country: 'Japan',
    dateLabel: 'Mar 12 – 14, 2027',
    startDate: '2027-03-12',
    photo: '/destinations/kyoto.jpg',
    endDate: '2027-03-14',
    days: 3,
    travelers: 2,
    budget: '¥92,000',
    budgetLevel: 'Comfort',
    style: 'Culture & food',
    status: 'saved',
    saved: true,
    className: 'scene-kyoto',
    emoji: '⛩️',
    weather: '16° / 8°',
    weatherLabel: 'Mild & bright',
    tags: ['Art & culture', 'Food & cafés', 'Local experiences'],
    intro: 'A gentle Kyoto rhythm of early-morning shrines, small tea houses and beautifully made meals.',
    daysData: kyotoDays,
  },
  {
    id: 'bali-reset',
    city: 'Bali',
    country: 'Indonesia',
    dateLabel: 'Apr 04 – 05, 2027',
    startDate: '2027-04-04',
    photo: '/destinations/bali.jpg',
    endDate: '2027-04-05',
    days: 2,
    travelers: 2,
    budget: '$680',
    budgetLevel: 'Premium',
    style: 'Nature & wellness',
    status: 'draft',
    saved: false,
    className: 'scene-bali',
    emoji: '🌴',
    weather: '29° / 24°',
    weatherLabel: 'Tropical & warm',
    tags: ['Nature & outdoors', 'Food & cafés'],
    intro: 'A soft reset in Ubud with green walks, nourishing food and generous space to slow down.',
    daysData: baliDays,
  },
]

export const statData = [
  { label: 'Trips planned', value: '8', change: '+2 this year', icon: 'map' },
  { label: 'Places explored', value: '14', change: 'Across 6 countries', icon: 'globe' },
  { label: 'Saved for later', value: '12', change: 'Ideas worth keeping', icon: 'bookmark' },
]

export function findDestination(value = '') {
  const normalized = value.toLowerCase()
  const found = destinationCatalog.find((destination) => normalized.includes(destination.city.toLowerCase()))
  if (found) return found
  if (normalized.includes('paris')) return { city: 'Paris', country: 'France', className: 'scene-paris', photo: '/destinations/paris.jpg', emoji: '✦', color: '#6a6fa7', tags: ['Food & cafés', 'Art & culture'], blurb: 'A beautiful balance of classic landmarks and local discoveries.' }
  return { city: value.split(',')[0].trim() || 'New adventure', country: value.split(',')[1]?.trim() || 'Somewhere beautiful', className: 'scene-generic', emoji: '✦', color: '#66788f', tags: ['Local experiences'], blurb: 'A flexible, thoughtful route shaped around the way you want to travel.' }
}

export function makeGeneratedTrip(preferences) {
  const destination = findDestination(preferences.destination)
  const duration = Math.max(2, Math.min(7, preferences.duration || 3))
  const start = preferences.startDate || '2026-11-15'
  const date = new Date(`${start}T12:00:00`)
  const dateLabel = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  const days = Array.from({ length: duration }, (_, index) => {
    const dayDate = new Date(date)
    dayDate.setDate(date.getDate() + index)
    return {
      day: `Day ${index + 1}`,
      date: dayDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      title: index === 0 ? `Arrival & ${destination.city}` : index === duration - 1 ? 'A slow goodbye' : `${preferences.interests[index % preferences.interests.length] || 'Local'} discoveries`,
      distance: `${(3.2 + index * 0.8).toFixed(1)} km on foot`,
      budget: preferences.budget === 'Premium' ? '$180' : preferences.budget === 'Budget' ? '$55' : '$92',
      items: [
        { time: '09:30 AM', type: 'food', title: `${index === 0 ? 'A local breakfast' : 'Coffee and something warm'}`, location: `${destination.city} neighbourhood favourite`, note: 'Start the day with a relaxed local recommendation, close to the next stop.' },
        { time: '11:30 AM', type: index % 2 ? 'culture' : 'nature', title: `${index % 2 ? 'A cultural deep dive' : 'A scenic side of the city'}`, location: `A considered stop in ${destination.city}`, note: 'A well-paced experience chosen around your interests and the best time to visit.' },
        { time: '03:30 PM', type: 'experience', title: 'A little room to wander', location: 'A walkable local pocket', note: 'Keep this space open for the unexpected: a shop, a view or a place locals love.' },
        { time: '07:00 PM', type: 'food', title: 'Dinner worth planning for', location: `Neighbourhood table · ${destination.city}`, note: 'A memorable meal that stays within your trip style and budget.' },
      ],
    }
  })
  return {
    id: `trip-${Date.now()}`,
    city: destination.city,
    country: destination.country,
    dateLabel: `${dateLabel} · ${duration} days`,
    startDate: start,
    endDate: start,
    days: duration,
    travelers: Number(preferences.travelers) || 1,
    budget: preferences.budget === 'Premium' ? '$1,240' : preferences.budget === 'Budget' ? '$520' : '$820',
    budgetLevel: preferences.budget || 'Comfort',
    style: preferences.pace || 'Balanced',
    status: 'upcoming',
    saved: true,
    className: destination.className,
    photo: destination.photo,
    emoji: destination.emoji,
    weather: '18° / 11°',
    weatherLabel: 'Comfortable',
    tags: preferences.interests.length ? preferences.interests.slice(0, 3) : destination.tags,
    intro: `A ${preferences.pace?.toLowerCase() || 'balanced'} ${duration}-day plan shaped around ${preferences.interests.slice(0, 2).join(' and ') || 'your favourite ways to explore'}.`,
    daysData: days,
  }
}
