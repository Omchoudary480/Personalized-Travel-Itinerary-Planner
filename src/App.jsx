import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  BookmarkCheck,
  CalendarCheck2,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleHelp,
  Clock3,
  CloudSun,
  Compass,
  Download,
  ExternalLink,
  Globe2,
  Heart,
  Landmark,
  LayoutDashboard,
  LoaderCircle,
  LogOut,
  Map,
  MapPin,
  MapPinned,
  Menu,
  Moon,
  MoreHorizontal,
  Navigation,
  Pencil,
  Plane,
  Plus,
  RefreshCw,
  Route,
  Search,
  Send,
  Settings,
  Share2,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  TreePine,
  TrendingUp,
  Truck,
  UserRound,
  Users,
  Utensils,
  WalletCards,
  Waves,
  X,
  Zap,
} from 'lucide-react'
import {
  destinationCatalog,
  findDestination,
  initialTrips,
  interestOptions,
  makeGeneratedTrip,
  statData,
} from './data'

const iconMap = {
  dashboard: LayoutDashboard,
  trips: Map,
  explore: Compass,
  saved: Bookmark,
  settings: Settings,
  map: MapPinned,
  globe: Globe2,
  bookmark: Bookmark,
  utensils: Utensils,
  landmark: Landmark,
  tree: TreePine,
  'shopping-bag': ShoppingBag,
  moon: Moon,
  sparkles: Sparkles,
  stay: MapPin,
  food: Utensils,
  culture: Landmark,
  nature: TreePine,
  experience: Sparkles,
  shopping: ShoppingBag,
  wellness: Waves,
}

function Icon({ name, size = 18, strokeWidth = 1.8, ...props }) {
  const Component = iconMap[name] || Sparkles
  return <Component size={size} strokeWidth={strokeWidth} {...props} />
}

const defaultDraft = {
  destination: 'Paris, France',
  startDate: '2026-11-15',
  duration: 3,
  travelers: 1,
  budget: 'Comfort',
  pace: 'Slow & local',
  interests: ['Food & cafés', 'Art & culture', 'Local experiences'],
}

function loadTrips() {
  try {
    const saved = window.localStorage.getItem('wayfarer-trips')
    return saved ? JSON.parse(saved) : initialTrips
  } catch {
    return initialTrips
  }
}

function App() {
  const [trips, setTrips] = useState(loadTrips)
  const [activeView, setActiveView] = useState('overview')
  const [selectedTripId, setSelectedTripId] = useState(null)
  const [builderOpen, setBuilderOpen] = useState(false)
  const [builderDraft, setBuilderDraft] = useState(defaultDraft)
  const [isGenerating, setIsGenerating] = useState(false)
  const [query, setQuery] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    window.localStorage.setItem('wayfarer-trips', JSON.stringify(trips))
  }, [trips])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(timer)
  }, [toast])

  const selectedTrip = trips.find((trip) => trip.id === selectedTripId) || null

  const showToast = (message, tone = 'success') => setToast({ message, tone })

  const openTrip = (trip) => {
    setSelectedTripId(trip.id)
    setActiveView('itinerary')
    setSidebarOpen(false)
  }

  const goTo = (view) => {
    setActiveView(view)
    setSelectedTripId(null)
    setSidebarOpen(false)
    if (view !== 'trips' && view !== 'explore') setQuery('')
  }

  const openBuilder = (trip = null) => {
    if (trip) {
      setBuilderDraft({
        ...defaultDraft,
        destination: `${trip.city}, ${trip.country}`,
        startDate: trip.startDate || defaultDraft.startDate,
        duration: trip.days || 3,
        travelers: trip.travelers || 1,
        budget: trip.budgetLevel || 'Comfort',
        pace: trip.style || 'Balanced',
        interests: trip.tags?.length ? trip.tags : defaultDraft.interests,
      })
    } else {
      setBuilderDraft(defaultDraft)
    }
    setBuilderOpen(true)
  }

  const generateTrip = () => {
    setIsGenerating(true)
    window.setTimeout(() => {
      const created = makeGeneratedTrip(builderDraft)
      setTrips((current) => [created, ...current])
      setSelectedTripId(created.id)
      setBuilderOpen(false)
      setIsGenerating(false)
      setActiveView('itinerary')
      showToast(`${created.city} itinerary is ready to explore`)
    }, 1500)
  }

  const toggleSaved = (tripId) => {
    setTrips((current) => current.map((trip) => trip.id === tripId ? { ...trip, saved: !trip.saved } : trip))
    const trip = trips.find((item) => item.id === tripId)
    if (trip) showToast(trip.saved ? 'Removed from saved trips' : 'Saved to your trips')
  }

  const shareTrip = async () => {
    try {
      await navigator.clipboard?.writeText(window.location.href)
    } catch {
      // Clipboard access is optional in preview environments.
    }
    showToast('Share link copied to clipboard')
  }

  const exportTrip = (trip) => {
    const blob = new Blob([JSON.stringify(trip, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${trip.city.toLowerCase().replace(/\s+/g, '-')}-itinerary.json`
    link.click()
    URL.revokeObjectURL(url)
    showToast('Itinerary downloaded')
  }

  const renderView = () => {
    if (activeView === 'itinerary' && selectedTrip) {
      return (
        <ItineraryView
          trip={selectedTrip}
          onBack={() => goTo('trips')}
          onEdit={() => openBuilder(selectedTrip)}
          onShare={shareTrip}
          onExport={() => exportTrip(selectedTrip)}
          onToggleSave={() => toggleSaved(selectedTrip.id)}
          onRegenerate={() => openBuilder(selectedTrip)}
        />
      )
    }

    if (activeView === 'trips') {
      return (
        <MyTripsView
          trips={trips}
          query={query}
          onQuery={setQuery}
          onOpen={openTrip}
          onNewTrip={() => openBuilder()}
          onToggleSave={toggleSaved}
        />
      )
    }

    if (activeView === 'explore') {
      return <ExploreView onNewTrip={openBuilder} onOpenDestination={(destination) => openBuilder({ ...destination, days: 3, travelers: 1, budgetLevel: 'Comfort', style: 'Balanced', tags: destination.tags, startDate: defaultDraft.startDate })} query={query} onQuery={setQuery} />
    }

    if (activeView === 'saved') {
      return <SavedView trips={trips.filter((trip) => trip.saved)} onOpen={openTrip} onToggleSave={toggleSaved} onNewTrip={openBuilder} />
    }

    if (activeView === 'settings') {
      return <SettingsView onToast={showToast} />
    }

    return <DashboardView trips={trips} onOpen={openTrip} onNewTrip={() => openBuilder()} onExplore={() => goTo('explore')} onToggleSave={toggleSaved} />
  }

  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onNavigate={goTo} mobileOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && <button className="sidebar-scrim" aria-label="Close navigation" onClick={() => setSidebarOpen(false)} />}
      <div className="main-shell">
        <Topbar activeView={activeView} query={query} onQuery={setQuery} onOpenMenu={() => setSidebarOpen(true)} onNavigate={goTo} />
        <main className={`page-content ${activeView === 'itinerary' ? 'itinerary-page' : ''}`}>
          {renderView()}
        </main>
      </div>
      {builderOpen && (
        <TripBuilder
          draft={builderDraft}
          setDraft={setBuilderDraft}
          isGenerating={isGenerating}
          onClose={() => !isGenerating && setBuilderOpen(false)}
          onGenerate={generateTrip}
        />
      )}
      {toast && <Toast toast={toast} onClose={() => setToast(null)} />}
    </div>
  )
}

function Sidebar({ activeView, onNavigate, mobileOpen, onClose }) {
  const navigation = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'trips', label: 'My trips', icon: 'trips', count: 8 },
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'saved', label: 'Saved', icon: 'saved', count: 12 },
  ]

  return (
    <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
      <div className="brand-row">
        <button className="brand-mark" onClick={() => onNavigate('overview')} aria-label="Go to overview">
          <Compass size={21} strokeWidth={2.4} />
        </button>
        <button className="brand-name" onClick={() => onNavigate('overview')}>wayfarer<span>.</span></button>
        <button className="mobile-close" onClick={onClose} aria-label="Close navigation"><X size={19} /></button>
      </div>

      <div className="sidebar-label">Plan your journey</div>
      <nav className="sidebar-nav" aria-label="Main navigation">
        {navigation.map((item) => (
          <button key={item.id} className={`nav-item ${activeView === item.id ? 'active' : ''}`} onClick={() => onNavigate(item.id)}>
            <Icon name={item.icon} size={18} />
            <span>{item.label}</span>
            {item.count && <span className="nav-count">{item.count}</span>}
          </button>
        ))}
      </nav>

      <div className="sidebar-divider" />
      <div className="sidebar-label">Your account</div>
      <nav className="sidebar-nav">
        <button className={`nav-item ${activeView === 'settings' ? 'active' : ''}`} onClick={() => onNavigate('settings')}><Settings size={18} /><span>Settings</span></button>
        <button className="nav-item" onClick={() => window.open('https://github.com', '_blank', 'noopener,noreferrer')}><CircleHelp size={18} /><span>Help centre</span><ExternalLink size={13} className="nav-external" /></button>
      </nav>

      <div className="sidebar-bottom">
        <div className="upgrade-card">
          <div className="upgrade-icon"><Zap size={16} fill="currentColor" /></div>
          <strong>Make every trip count</strong>
          <span>Unlock unlimited AI plans</span>
          <button onClick={() => onNavigate('settings')}>See plans <ArrowRight size={13} /></button>
        </div>
        <div className="profile-row">
          <div className="avatar avatar-small">OC</div>
          <div className="profile-copy"><strong>Olivia Carter</strong><span>Free member</span></div>
          <button className="profile-menu" aria-label="Account menu"><MoreHorizontal size={18} /></button>
        </div>
      </div>
    </aside>
  )
}

function Topbar({ activeView, query, onQuery, onOpenMenu, onNavigate }) {
  const titles = { overview: 'Good morning, Olivia', trips: 'My trips', explore: 'Find your next story', saved: 'Saved for later', settings: 'Settings', itinerary: 'Your itinerary' }
  return (
    <header className="topbar">
      <button className="mobile-menu" onClick={onOpenMenu} aria-label="Open navigation"><Menu size={21} /></button>
      <div className="topbar-title-wrap">
        {activeView === 'itinerary' && <button className="topbar-back" onClick={() => onNavigate('trips')} aria-label="Back to trips"><ArrowLeft size={18} /></button>}
        <div>
          <div className="eyebrow">{activeView === 'overview' ? 'Thursday, October 29, 2026' : 'WAYFARER PLANNER'}</div>
          <h1>{titles[activeView] || 'Wayfarer'}</h1>
        </div>
      </div>
      <div className="topbar-actions">
        {(activeView === 'trips' || activeView === 'explore') && (
          <label className="top-search">
            <Search size={17} />
            <input value={query} onChange={(event) => onQuery(event.target.value)} placeholder={activeView === 'explore' ? 'Search destinations' : 'Search trips'} />
            {query && <button type="button" className="clear-search" onClick={() => onQuery('')} aria-label="Clear search"><X size={14} /></button>}
          </label>
        )}
        <button className="icon-button notification-button" aria-label="Notifications"><BellIcon /><span /></button>
        <div className="topbar-avatar avatar">OC</div>
      </div>
    </header>
  )
}

function BellIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  )
}

function DashboardView({ trips, onOpen, onNewTrip, onExplore, onToggleSave }) {
  const upcoming = trips.find((trip) => trip.status === 'upcoming') || trips[0]
  const recentTrips = trips.filter((trip) => trip.id !== upcoming?.id).slice(0, 3)
  return (
    <div className="view-stack dashboard-view">
      <section className="welcome-panel">
        <div className="welcome-copy">
          <div className="welcome-pill"><Sparkles size={14} /> Your personal travel co-pilot</div>
          <h2>Plan less.<br /><em>Experience more.</em></h2>
          <p>Tell us where you want to go and how you like to travel. We'll shape the details around you.</p>
          <div className="welcome-actions">
            <button className="button button-light" onClick={onNewTrip}><Plus size={17} /> Plan a new trip</button>
            <button className="text-button text-button-light" onClick={onExplore}>Get inspired <ArrowRight size={15} /></button>
          </div>
        </div>
        <div className="welcome-visual" aria-hidden="true">
          <div className="welcome-orbit orbit-one" />
          <div className="welcome-orbit orbit-two" />
          <div className="welcome-sun" />
          <div className="welcome-mountain mountain-back" />
          <div className="welcome-mountain mountain-front" />
          <div className="welcome-route"><span /><span /><span /><span /><span /></div>
          <div className="floating-note note-one"><MapPinned size={14} /> Built around you</div>
          <div className="floating-note note-two"><CloudSun size={15} /> 14° · perfect for a walk</div>
          <div className="visual-stamp">✦</div>
        </div>
      </section>

      <section className="stats-grid">
        {statData.map((stat, index) => (
          <div className="stat-card" key={stat.label}>
            <div className={`stat-icon stat-icon-${index}`}><Icon name={stat.icon} size={18} /></div>
            <div className="stat-value">{stat.value}</div>
            <div className="stat-label">{stat.label}</div>
            <div className="stat-change"><TrendingUp size={13} /> {stat.change}</div>
          </div>
        ))}
      </section>

      <div className="section-heading-row upcoming-heading">
        <div><div className="eyebrow">ON THE HORIZON</div><h2>Next up</h2></div>
        <button className="text-button" onClick={() => onOpen(upcoming)}>View itinerary <ArrowRight size={15} /></button>
      </div>

      {upcoming && <UpcomingTripCard trip={upcoming} onOpen={() => onOpen(upcoming)} onToggleSave={() => onToggleSave(upcoming.id)} />}

      <div className="section-heading-row recent-heading">
        <div><div className="eyebrow">YOUR COLLECTION</div><h2>Trips to revisit</h2></div>
        <button className="text-button" onClick={() => onExplore()}>Explore ideas <ArrowRight size={15} /></button>
      </div>
      <div className="trip-cards-grid">
        {recentTrips.map((trip) => <TripCard key={trip.id} trip={trip} onOpen={() => onOpen(trip)} onToggleSave={() => onToggleSave(trip.id)} />)}
        <button className="inspiration-card" onClick={onExplore}>
          <div className="inspiration-icon"><Plus size={21} /></div>
          <strong>Find somewhere new</strong>
          <span>Let curiosity lead</span>
          <ArrowRight size={17} />
        </button>
      </div>
    </div>
  )
}

function UpcomingTripCard({ trip, onOpen, onToggleSave }) {
  return (
    <article className="upcoming-trip-card">
      <div className={`destination-art large-art ${trip.className}`}>
        <SceneDecoration type={trip.city.toLowerCase()} />
        <div className="art-topline"><span className="art-chip"><CalendarDays size={13} /> Upcoming</span><button className="art-heart" onClick={(event) => { event.stopPropagation(); onToggleSave() }} aria-label="Save trip">{trip.saved ? <BookmarkCheck size={18} fill="currentColor" /> : <Bookmark size={18} />}</button></div>
        <div className="art-bottomline"><span className="art-location"><MapPin size={16} /> {trip.city}, {trip.country}</span><span className="art-weather"><CloudSun size={16} /> {trip.weather}</span></div>
      </div>
      <div className="upcoming-info">
        <div className="upcoming-meta"><span>{trip.dateLabel}</span><span className="dot-separator" /><span>{trip.days} days</span><span className="dot-separator" /><span>{trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}</span></div>
        <h3>{trip.city} <span>·</span> the good kind of busy</h3>
        <p>{trip.intro}</p>
        <div className="tag-row">{trip.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div>
        <div className="upcoming-footer"><button className="button button-dark" onClick={onOpen}>Open itinerary <ArrowRight size={16} /></button><span className="saved-note"><CircleCheck size={15} /> Your plan is ready</span></div>
      </div>
    </article>
  )
}

function TripCard({ trip, onOpen, onToggleSave }) {
  return (
    <article className="trip-card">
      <button className={`destination-art card-art ${trip.className}`} onClick={onOpen} aria-label={`Open ${trip.city} itinerary`}>
        <SceneDecoration type={trip.city.toLowerCase()} />
        <div className="art-topline"><span className="art-chip subtle-chip">{trip.status === 'draft' ? 'Draft' : 'Saved'}</span><span className="art-emoji">{trip.emoji}</span></div>
        <div className="art-bottomline"><span className="art-location"><MapPin size={14} /> {trip.city}</span></div>
      </button>
      <div className="trip-card-body">
        <div className="trip-card-title"><div><h3>{trip.city}, {trip.country}</h3><span>{trip.dateLabel}</span></div><button className="save-button" onClick={onToggleSave} aria-label={trip.saved ? 'Unsave trip' : 'Save trip'}>{trip.saved ? <BookmarkCheck size={17} fill="currentColor" /> : <Bookmark size={17} />}</button></div>
        <div className="trip-card-footer"><span><Clock3 size={14} /> {trip.days} days</span><button className="small-arrow" onClick={onOpen} aria-label="Open itinerary"><ArrowUpRight /></button></div>
      </div>
    </article>
  )
}

function ArrowUpRight() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7" /><path d="M7 7h10v10" /></svg>
}

function SceneDecoration({ type }) {
  return (
    <>
      <div className="scene-glow" />
      <div className="scene-moon" />
      <div className="scene-cloud cloud-a" />
      <div className="scene-cloud cloud-b" />
      {(type === 'paris' || type === 'amalfi coast') && <div className="scene-tower"><span /><span /><span /><i /></div>}
      {type === 'kyoto' && <div className="scene-pagoda"><span /><span /><span /><i /></div>}
      {type === 'bali' && <div className="scene-palm"><i /><span /><b /><em /></div>}
      {type === 'lisbon' && <div className="scene-tram"><i /><span /><b /></div>}
      <div className="scene-hills hill-far" /><div className="scene-hills hill-near" />
      <div className="scene-grain" />
    </>
  )
}

function MyTripsView({ trips, query, onQuery, onOpen, onNewTrip, onToggleSave }) {
  const [filter, setFilter] = useState('all')
  const filteredTrips = useMemo(() => trips.filter((trip) => {
    const matchesFilter = filter === 'all' || (filter === 'saved' ? trip.saved : trip.status === filter)
    const normalizedQuery = query.trim().toLowerCase()
    const matchesQuery = !normalizedQuery || `${trip.city} ${trip.country} ${trip.tags.join(' ')}`.toLowerCase().includes(normalizedQuery)
    return matchesFilter && matchesQuery
  }), [filter, query, trips])

  return (
    <div className="view-stack trips-view">
      <section className="page-intro-row">
        <div><div className="eyebrow">YOUR TRAVEL LIBRARY</div><h2>All your trips, in one place.</h2><p>Plans in progress, places you’ve loved and ideas waiting for a date.</p></div>
        <button className="button button-dark" onClick={onNewTrip}><Plus size={17} /> Plan a new trip</button>
      </section>
      <div className="filter-row">
        <div className="filter-tabs">
          {[['all', 'All trips'], ['upcoming', 'Upcoming'], ['saved', 'Saved'], ['draft', 'Drafts']].map(([id, label]) => <button key={id} className={filter === id ? 'active' : ''} onClick={() => setFilter(id)}>{label}<span>{id === 'all' ? trips.length : id === 'saved' ? trips.filter((trip) => trip.saved).length : trips.filter((trip) => trip.status === id).length}</span></button>)}
        </div>
        <button className="filter-button"><SlidersHorizontal size={16} /> Filters <ChevronDown size={14} /></button>
      </div>
      {filteredTrips.length ? <div className="all-trips-grid">{filteredTrips.map((trip) => <TripCard key={trip.id} trip={trip} onOpen={() => onOpen(trip)} onToggleSave={() => onToggleSave(trip.id)} />)}</div> : <EmptyState query={query} onClear={() => onQuery('')} onNewTrip={onNewTrip} />}
      <div className="library-tip"><div className="tip-mark"><Sparkles size={16} /></div><div><strong>Make your plan feel like you</strong><span>Add a few preferences to get recommendations that match your pace, budget and curiosity.</span></div><button className="text-button" onClick={onNewTrip}>Personalize <ArrowRight size={15} /></button></div>
    </div>
  )
}

function EmptyState({ query, onClear, onNewTrip }) {
  return <div className="empty-state"><div className="empty-icon"><Search size={22} /></div><h3>No trips found{query ? ` for “${query}”` : ''}</h3><p>Try another search, or start planning somewhere that feels exciting.</p><div><button className="button button-dark" onClick={onNewTrip}><Plus size={16} /> Start a new trip</button>{query && <button className="text-button" onClick={onClear}>Clear search</button>}</div></div>
}

function ExploreView({ onNewTrip, onOpenDestination, query, onQuery }) {
  const filtered = destinationCatalog.filter((destination) => `${destination.city} ${destination.country} ${destination.tags.join(' ')} ${destination.subtitle}`.toLowerCase().includes(query.trim().toLowerCase()))
  return (
    <div className="view-stack explore-view">
      <section className="explore-hero">
        <div className="explore-hero-copy"><div className="welcome-pill"><Sparkles size={14} /> Curated for curious people</div><h2>Go where your<br /><em>curiosity leads.</em></h2><p>Not sure where to start? Tell Wayfarer what sounds good and get a route made around it.</p><button className="button button-light" onClick={onNewTrip}>Build my itinerary <ArrowRight size={16} /></button></div><div className="explore-hero-art"><div className="explore-stamp">W</div><div className="explore-line line-one" /><div className="explore-line line-two" /><div className="explore-pin"><MapPin size={20} fill="currentColor" /></div></div>
      </section>
      <div className="section-heading-row explore-heading"><div><div className="eyebrow">HANDPICKED STARTING POINTS</div><h2>Where will you wander?</h2></div><span className="results-note">{filtered.length} destinations</span></div>
      {filtered.length ? <div className="destination-grid">{filtered.map((destination) => <DestinationCard key={destination.city} destination={destination} onClick={() => onOpenDestination(destination)} />)}</div> : <EmptyState query={query} onClear={() => onQuery('')} onNewTrip={onNewTrip} />}
      <section className="travel-style-card"><div className="travel-style-icon"><Route size={22} /></div><div><div className="eyebrow">A LITTLE HELP, IF YOU WANT IT</div><h3>Travel like a local, not a checklist.</h3><p>Answer three small questions and we’ll balance must-sees with the kind of moments you can’t Google.</p></div><button className="button button-dark" onClick={onNewTrip}>Find my style <ArrowRight size={16} /></button></section>
    </div>
  )
}

function DestinationCard({ destination, onClick }) {
  return <button className="destination-card" onClick={onClick}><div className={`destination-art destination-card-art ${destination.className}`}><SceneDecoration type={destination.city.toLowerCase()} /><span className="destination-emoji">{destination.emoji}</span><span className="destination-arrow"><ArrowUpRight /></span></div><div className="destination-card-copy"><div><h3>{destination.city}</h3><span>{destination.country}</span></div><div className="destination-tags">{destination.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p>{destination.subtitle}</p></div></button>
}

function SavedView({ trips, onOpen, onToggleSave, onNewTrip }) {
  return <div className="view-stack saved-view"><section className="page-intro-row"><div><div className="eyebrow">THE GOOD STUFF</div><h2>Saved for a someday.</h2><p>Keep the places and plans that spark something close.</p></div><button className="button button-dark" onClick={onNewTrip}><Plus size={17} /> Add a trip</button></section>{trips.length ? <div className="saved-layout"><div className="saved-main"><div className="saved-heading"><h3>{trips.length} saved {trips.length === 1 ? 'trip' : 'trips'}</h3><button className="sort-button">Recently saved <ChevronDown size={14} /></button></div><div className="all-trips-grid">{trips.map((trip) => <TripCard key={trip.id} trip={trip} onOpen={() => onOpen(trip)} onToggleSave={() => onToggleSave(trip.id)} />)}</div></div><aside className="saved-aside"><div className="aside-quote">“<br /><strong>The world is full of<br />beautiful reasons<br />to be curious.</strong><br /><span>— keep collecting them</span></div><div className="mini-note"><BookmarkCheck size={16} /><span>Your saved trips live on this device, ready whenever inspiration strikes.</span></div></aside></div> : <EmptyState onNewTrip={onNewTrip} />}</div>
}

function SettingsView({ onToast }) {
  const [name, setName] = useState('Olivia Carter')
  const [email, setEmail] = useState('olivia@wayfarer.demo')
  return <div className="view-stack settings-view"><section className="page-intro-row"><div><div className="eyebrow">YOUR SPACE</div><h2>Settings</h2><p>Make Wayfarer work the way you travel.</p></div></section><div className="settings-layout"><aside className="settings-menu"><button className="active"><UserRound size={17} /> Profile</button><button><SlidersHorizontal size={17} /> Preferences</button><button><BellIcon /> Notifications</button><button><WalletCards size={17} /> Plan & billing</button></aside><div className="settings-content"><section className="settings-section"><div className="settings-section-head"><div><h3>Profile details</h3><p>This is how your name appears across your travel plans.</p></div><div className="avatar avatar-profile">OC</div></div><label className="field-label">Full name<input value={name} onChange={(event) => setName(event.target.value)} /></label><label className="field-label">Email address<input value={email} onChange={(event) => setEmail(event.target.value)} /></label><div className="settings-actions"><button className="button button-dark" onClick={() => onToast('Profile details saved')}>Save changes</button><button className="text-button">Cancel</button></div></section><section className="settings-section"><div className="settings-section-head"><div><h3>Travel preferences</h3><p>These help us make your recommendations feel more personal.</p></div><Sparkles size={21} className="settings-spark" /></div><div className="pref-setting-row"><div><strong>Default travel pace</strong><span>How full should each day feel?</span></div><select defaultValue="Slow & local"><option>Slow & local</option><option>Balanced</option><option>See it all</option></select></div><div className="pref-setting-row"><div><strong>Currency</strong><span>Used for estimated trip budgets</span></div><select defaultValue="EUR · €"><option>EUR · €</option><option>USD · $</option><option>INR · ₹</option></select></div></section><section className="settings-section danger-section"><div><h3>Local data</h3><p>Your trips are saved in this browser. Export them from an itinerary at any time.</p></div><button className="button button-outline-danger" onClick={() => onToast('Your local trips are safe for this demo')}>Learn more</button></section></div></div></div>
}

function ItineraryView({ trip, onBack, onEdit, onShare, onExport, onToggleSave, onRegenerate }) {
  const [activeDay, setActiveDay] = useState(0)
  const [completed, setCompleted] = useState({})
  const currentDay = trip.daysData?.[activeDay] || trip.daysData?.[0]
  const completedCount = Object.values(completed).filter(Boolean).length
  const totalActivities = trip.daysData?.reduce((total, day) => total + day.items.length, 0) || 1
  const toggleActivity = (key) => setCompleted((current) => ({ ...current, [key]: !current[key] }))

  return <div className="itinerary-detail view-stack"><button className="back-link" onClick={onBack}><ChevronLeft size={17} /> All trips</button><section className={`itinerary-cover ${trip.className}`}><SceneDecoration type={trip.city.toLowerCase()} /><div className="itinerary-cover-content"><div className="itinerary-cover-top"><span className="art-chip"><CalendarCheck2 size={13} /> {trip.status === 'draft' ? 'Draft itinerary' : 'Your next adventure'}</span><div className="cover-actions"><button onClick={onToggleSave} aria-label="Save itinerary">{trip.saved ? <BookmarkCheck size={17} fill="currentColor" /> : <Bookmark size={17} />}</button><button onClick={onShare} aria-label="Share itinerary"><Share2 size={17} /></button><button onClick={onEdit} aria-label="Edit itinerary"><Pencil size={17} /></button></div></div><div className="cover-title"><div className="cover-place"><MapPin size={18} /> {trip.city}, {trip.country}</div><h2>{trip.city}<br /><em>made personal.</em></h2><p>{trip.intro}</p></div><div className="cover-facts"><span><CalendarDays size={16} /> {trip.dateLabel}</span><span><Users size={16} /> {trip.travelers} {trip.travelers === 1 ? 'traveler' : 'travelers'}</span><span><WalletCards size={16} /> {trip.budget} estimated</span><span><CloudSun size={16} /> {trip.weather}</span></div></div></section><div className="detail-toolbar"><div className="tag-row">{trip.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</div><div className="detail-toolbar-actions"><button className="text-button" onClick={onRegenerate}><RefreshCw size={15} /> Regenerate</button><button className="button button-outline" onClick={onExport}><Download size={15} /> Export</button></div></div><div className="itinerary-layout"><section className="itinerary-main"><div className="section-heading-row itinerary-heading"><div><div className="eyebrow">YOUR DAY-BY-DAY PLAN</div><h2>Follow your curiosity</h2></div><div className="completion-ring"><span>{Math.round((completedCount / totalActivities) * 100)}%</span><small>explored</small></div></div><div className="day-tabs">{trip.daysData.map((day, index) => <button key={day.day} className={activeDay === index ? 'active' : ''} onClick={() => setActiveDay(index)}><span>{day.day}</span><strong>{day.date}</strong></button>)}</div>{currentDay && <div className="day-plan"><div className="day-plan-heading"><div><span className="day-kicker">{currentDay.day} · {currentDay.date}</span><h3>{currentDay.title}</h3></div><div className="day-stats"><span><Route size={14} /> {currentDay.distance}</span><span><WalletCards size={14} /> {currentDay.budget}</span></div></div><div className="activity-list">{currentDay.items.map((item, index) => { const key = `${activeDay}-${index}`; return <ActivityItem key={key} item={item} complete={!!completed[key]} onToggle={() => toggleActivity(key)} /> })}</div><button className="add-activity"><Plus size={15} /> Add a personal note or activity</button></div>}</section><aside className="itinerary-aside"><div className="aside-card glance-card"><div className="aside-card-title"><h3>At a glance</h3><MoreHorizontal size={18} /></div><div className="glance-weather"><div className="weather-icon"><CloudSun size={27} /></div><div><strong>{trip.weather}</strong><span>{trip.weatherLabel} · {trip.city}</span></div></div><div className="glance-list"><div><span>Travel style</span><strong>{trip.style}</strong></div><div><span>Estimated total</span><strong>{trip.budget}</strong></div><div><span>Best for</span><strong>{trip.tags[0] || 'Exploring'}</strong></div></div><button className="text-button">See trip details <ArrowRight size={14} /></button></div><div className="aside-card checklist-card"><div className="aside-card-title"><h3>Before you go</h3><span className="check-count">2 / 5</span></div><ChecklistItem label="Confirm accommodation" done /><ChecklistItem label="Save offline maps" done /><ChecklistItem label="Check travel documents" /><ChecklistItem label="Share plans with a friend" /><ChecklistItem label="Pack for the forecast" /><button className="text-button">View checklist <ArrowRight size={14} /></button></div><div className="aside-card local-tip"><div className="tip-icon"><Sparkles size={16} /></div><div><strong>Wayfarer note</strong><p>Leave 20% of each day open. The best moments rarely come with a booking confirmation.</p></div></div></aside></div></div>
}

function ActivityItem({ item, complete, onToggle }) {
  return <div className={`activity-item ${complete ? 'completed' : ''}`}><div className="activity-time">{item.time}</div><div className={`activity-icon activity-${item.type}`}><Icon name={item.type} size={18} /></div><div className="activity-copy"><div className="activity-title-row"><h4>{item.title}</h4><button className={`activity-check ${complete ? 'checked' : ''}`} onClick={onToggle} aria-label={complete ? 'Mark as not done' : 'Mark as done'}>{complete && <Check size={13} />}</button></div><span className="activity-location"><MapPin size={13} /> {item.location}</span><p>{item.note}</p></div><button className="activity-more" aria-label="More activity options"><MoreHorizontal size={17} /></button></div>
}

function ChecklistItem({ label, done = false }) {
  const [checked, setChecked] = useState(done)
  return <button className={`checklist-item ${checked ? 'done' : ''}`} onClick={() => setChecked((value) => !value)}><span className="check-box">{checked && <Check size={12} />}</span><span>{label}</span></button>
}

function TripBuilder({ draft, setDraft, isGenerating, onClose, onGenerate }) {
  const [step, setStep] = useState(1)
  const update = (key, value) => setDraft((current) => ({ ...current, [key]: value }))
  const toggleInterest = (interest) => setDraft((current) => ({ ...current, interests: current.interests.includes(interest) ? current.interests.filter((item) => item !== interest) : [...current.interests, interest] }))
  const destination = findDestination(draft.destination)

  return <div className="modal-layer"><div className="modal-backdrop" onClick={onClose} /><section className={`builder-modal ${isGenerating ? 'is-generating' : ''}`} role="dialog" aria-modal="true" aria-labelledby="builder-title">{isGenerating ? <div className="generating-state"><div className={`generating-art ${destination.className}`}><SceneDecoration type={destination.city.toLowerCase()} /><span>{destination.emoji}</span></div><div className="generating-loader"><LoaderCircle size={25} /></div><div className="eyebrow">WAYFARER AI</div><h2>Mapping out your<br /><em>{destination.city} story.</em></h2><p>Balancing your interests, travel time and the little details that make a trip feel like yours.</p><div className="generating-steps"><span className="done"><Check size={13} /> Understanding your style</span><span className="active"><LoaderCircle size={13} /> Finding local favourites</span><span>Building a thoughtful route</span></div></div> : <><div className="builder-header"><div><div className="eyebrow">NEW ITINERARY · STEP {step} OF 3</div><h2 id="builder-title">{step === 1 ? 'Where are you going?' : step === 2 ? 'What sounds good?' : 'Make it yours.'}</h2></div><button className="modal-close" onClick={onClose} aria-label="Close"><X size={19} /></button></div><div className="builder-progress"><span className={step >= 1 ? 'active' : ''} /><span className={step >= 2 ? 'active' : ''} /><span className={step >= 3 ? 'active' : ''} /></div><div className="builder-body">{step === 1 && <div className="builder-step"><label className="builder-label">Destination<input autoFocus value={draft.destination} onChange={(event) => update('destination', event.target.value)} placeholder="e.g. Kyoto, Japan" /><MapPin size={18} /></label><div className="builder-label-row"><label className="builder-label">Start date<input type="date" value={draft.startDate} onChange={(event) => update('startDate', event.target.value)} /></label><label className="builder-label">How long?<select value={draft.duration} onChange={(event) => update('duration', Number(event.target.value))}><option value={2}>2 days</option><option value={3}>3 days</option><option value={4}>4 days</option><option value={5}>5 days</option><option value={7}>7 days</option></select></label></div><div className="quick-destinations"><span>Popular starting points</span><div>{destinationCatalog.slice(0, 3).map((item) => <button key={item.city} onClick={() => update('destination', `${item.city}, ${item.country}`)}><span className={`mini-scene ${item.className}`}>{item.emoji}</span>{item.city}</button>)}</div></div></div>}{step === 2 && <div className="builder-step"><div className="builder-question"><span>01</span><div><h3>What are you curious about?</h3><p>Pick as many as you like — we’ll find the balance.</p></div></div><div className="interest-grid">{interestOptions.map((interest) => <button key={interest.label} className={`interest-option ${draft.interests.includes(interest.label) ? 'selected' : ''}`} onClick={() => toggleInterest(interest.label)}><span className="interest-icon"><Icon name={interest.icon} size={18} /></span><span>{interest.label}</span>{draft.interests.includes(interest.label) && <Check size={15} />}</button>)}</div><div className="builder-question second-question"><span>02</span><div><h3>How should the days feel?</h3><p>We’ll use this to shape the rhythm of your route.</p></div></div><div className="pace-grid">{['Slow & local', 'Balanced', 'See it all'].map((pace) => <button key={pace} className={draft.pace === pace ? 'selected' : ''} onClick={() => update('pace', pace)}><span className={`pace-illustration pace-${pace.split(' ')[0].toLowerCase()}`} />{pace}{draft.pace === pace && <Check size={15} />}</button>)}</div></div>}{step === 3 && <div className="builder-step"><div className="builder-question"><span>03</span><div><h3>A few practical details</h3><p>Small details help us make a more useful plan.</p></div></div><label className="builder-label">Who is coming?<div className="stepper-input"><button onClick={() => update('travelers', Math.max(1, draft.travelers - 1))}>−</button><strong>{draft.travelers} {draft.travelers === 1 ? 'traveler' : 'travelers'}</strong><button onClick={() => update('travelers', Math.min(12, draft.travelers + 1))}>+</button></div></label><div className="builder-label budget-label">What’s your comfort zone?<div className="budget-options">{['Budget', 'Comfort', 'Premium'].map((budget) => <button key={budget} className={draft.budget === budget ? 'selected' : ''} onClick={() => update('budget', budget)}><span>{budget === 'Budget' ? '€' : budget === 'Comfort' ? '€€' : '€€€'}</span><strong>{budget}</strong><small>{budget === 'Budget' ? 'Keep it clever' : budget === 'Comfort' ? 'A little ease' : 'Treat yourself'}</small></button>)}</div></div><div className="builder-summary"><div className={`summary-scene ${destination.className}`}><SceneDecoration type={destination.city.toLowerCase()} /><span>{destination.emoji}</span></div><div><span>Ready to plan</span><strong>{destination.city}, {destination.country}</strong><small>{draft.duration} days · {draft.pace} · {draft.travelers} {draft.travelers === 1 ? 'traveler' : 'travelers'}</small></div><Sparkles size={20} /></div></div>}</div><div className="builder-footer">{step > 1 ? <button className="button button-ghost" onClick={() => setStep((value) => value - 1)}><ChevronLeft size={16} /> Back</button> : <span className="builder-footnote"><Sparkles size={14} /> AI-assisted, always editable</span>}{step < 3 ? <button className="button button-dark" onClick={() => setStep((value) => value + 1)}>Continue <ArrowRight size={16} /></button> : <button className="button button-dark" onClick={onGenerate}><Sparkles size={16} /> Generate itinerary</button>}</div></>}</section></div>
}

function Toast({ toast, onClose }) {
  return <div className={`toast toast-${toast.tone}`}><span className="toast-icon"><Check size={14} /></span><span>{toast.message}</span><button onClick={onClose} aria-label="Dismiss"><X size={14} /></button></div>
}

export default App
