import { useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles.css'

const listingUrl = 'https://amsmtbuller.com.au/our-accommodation/candoux-4/'
const bookingUrl = 'https://bookings12.rmscloud.com/Search/Index/10604/1/?catIds=70'
const contactUrl = 'https://amsmtbuller.com.au/contact-us/'
const driveGuide = 'https://www.mtbuller.com.au/winter/drive-a-car'

const sections = [
  ['stay', 'The apartment'],
  ['photos', 'Photos'],
  ['seasons', 'On the mountain'],
  ['journey', 'Getting here'],
  ['questions', 'Good to know'],
]

const seasons = {
  winter: {
    name: 'Winter',
    title: 'Snow days, slow evenings.',
    description: 'Make a day of the slopes, try a ski lesson or find a spot for a hot chocolate in the village. Then watch the light go blue across the snow.',
    image: '/images/buller-winter.jpg',
    alt: 'Snow-covered alpine slopes and ridges',
    caption: 'Mount Buller in winter',
    photographer: 'Kody Appleton',
    photoSource: 'https://commons.wikimedia.org/wiki/File:The_West_Ridge.jpg',
    link: 'https://www.mtbuller.com.au/winter',
  },
  summer: {
    name: 'Summer',
    title: 'Take the long way round.',
    description: 'Follow a walking trail, get out on the mountain bike or take your time over lunch in the village. The High Country feels different when the snow melts.',
    image: '/images/buller-summer.jpg',
    alt: 'Rocky alpine ridge and distant forested valleys',
    caption: 'Mount Buller in the green season',
    photographer: 'Bill Bowden',
    photoSource: 'https://commons.wikimedia.org/wiki/File:The_West_Ridge_of_Mt_Buller,_Nov_2017.jpeg',
    link: 'https://www.mtbuller.com.au/summer',
  },
}

const photos = [
  ['living-2', 'Lounge and fireplace', 'Lounge and dining room with large windows and a lit stone fireplace'],
  ['kitchen', 'Kitchen', 'Kitchen with a green tiled splashback and four stools at the breakfast bar'],
  ['master', 'Main bedroom', 'Queen bed between bedside reading lamps'],
  ['bunks', 'Bunk bedroom', 'White single bunk beds beside a reading lamp'],
  ['trilogy', 'Trilogy bunk bedroom', 'Bunk bed with a double on the bottom and a single on top'],
  ['bathroom', 'Bathroom', 'Freestanding bath and separate glass-screened shower'],
  ['exterior', 'Candoux exterior', 'Candoux building and sign among snow gums'],
].map(([file, title, alt]) => ({ image: `/images/candoux-${file}.webp`, title, alt }))

function Icon({ name, className }) {
  const paths = {
    down: <path d="M12 4v15m-5-5 5 5 5-5" />,
    up: <path d="M12 20V5m-5 5 5-5 5 5" />,
    left: <path d="M20 12H5m5-5-5 5 5 5" />,
    right: <path d="M4 12h15m-5-5 5 5-5 5" />,
    external: <path d="M6 18 18 6M8 6h10v10" />,
    photo: <><rect x="3" y="4" width="18" height="16" rx="2" /><circle cx="8" cy="9" r="1.5" /><path d="m4 17 5-4 3 3 4-5 4 6" /></>,
    menu: <path d="M4 9h16M4 15h16" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    plus: <path d="M5 12h14M12 5v14" />,
    pin: <><path d="M19 10c0 5-7 10-7 10s-7-5-7-10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2" /></>,
    winter: <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5m-5 15L12 17l2.5 2.5" />,
    summer: <><circle cx="12" cy="12" r="4" /><path d="M12 2.5v3m0 13v3M2.5 12h3m13 0h3M5.3 5.3l2.1 2.1m9.2 9.2 2.1 2.1m0-13.4-2.1 2.1m-9.2 9.2-2.1 2.1" /></>,
  }

  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function Ridge({ className }) {
  return (
    <svg className={className} viewBox="0 0 80 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="m4 39 21-22 9 9L47 7l29 32M37 21l10 6 8-7M21 22l5 4 3-3M10 43h60" />
      <circle cx="21" cy="8" r="3" />
    </svg>
  )
}

function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Candoux 4 home">
      <Ridge />
      <span>
        <strong>Candoux 4</strong>
        <span className="brand-label">Alpine apartment</span>
      </span>
    </a>
  )
}

function ExternalLink({ href, children, className = 'text-link' }) {
  return <a className={className} href={href}>{children}<Icon name="external" /></a>
}

function Header() {
  const drawer = useRef(null)
  const trigger = useRef(null)
  const focusDestination = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)

  function openMenu() {
    drawer.current.showModal()
    setMenuOpen(true)
  }

  function closeMenu() {
    drawer.current.close()
  }

  function jumpFromMenu(id) {
    focusDestination.current = document.getElementById(id)
    closeMenu()
  }

  function closeOnBackdrop(event) {
    if (event.target !== drawer.current) return
    const bounds = drawer.current.getBoundingClientRect()
    if (event.clientX > bounds.right || event.clientY > bounds.bottom) closeMenu()
  }

  return (
    <header className="site-header shell">
      <Brand />
      <nav className="header-links" aria-label="Main navigation">
        {sections.slice(0, 4).map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
      </nav>
      <button className="menu-button" ref={trigger} type="button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="site-menu" aria-expanded={menuOpen} onClick={openMenu}>
        <Icon name="menu" />
      </button>
      <dialog className="drawer" id="site-menu" aria-labelledby="menu-heading" ref={drawer} onClick={closeOnBackdrop} onClose={() => {
        setMenuOpen(false)
        const target = focusDestination.current ?? trigger.current
        focusDestination.current = null
        target.focus({ preventScroll: true })
      }}>
        <div className="drawer-content">
          <div className="drawer-header">
            <span id="menu-heading" className="eyebrow">Explore Candoux 4</span>
            <button className="menu-button" type="button" aria-label="Close menu" onClick={closeMenu}><Icon name="close" /></button>
          </div>
          <nav aria-label="Site menu" className="drawer-links">
            {sections.map(([id, label], index) => (
              <a href={`#${id}`} key={id} onClick={() => jumpFromMenu(id)}><span>0{index + 1}</span>{label}<Icon name="right" /></a>
            ))}
          </nav>
          <div className="drawer-footer"><Ridge /><p className="eyebrow">Mount Buller, Victoria</p></div>
        </div>
      </dialog>
    </header>
  )
}

function Scene({ className = '', image, alt, caption, photographer, photoSource, license, priority = false }) {
  return (
    <figure className={`scene ${className}`}>
      <div className="scene-image">
        <img src={image} alt={alt} loading={priority ? 'eager' : 'lazy'} fetchPriority={priority ? 'high' : 'auto'} decoding="async" />
      </div>
      <figcaption className="scene-caption">
        <span><Icon name="pin" />{caption}</span>
        <span className="photo-credit">
          <a href={photoSource}>{photographer}</a>
          {license && <><span aria-hidden="true">·</span><a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a></>}
        </span>
      </figcaption>
    </figure>
  )
}

function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="eyebrow hero-location"><span /> Mount Buller, Victoria</p>
        <h1 id="hero-title">Candoux 4 <em>in the High Country.</em></h1>
        <p className="hero-description">A three-bedroom alpine apartment with a fireside lounge, a balcony and views towards Mount Stirling.</p>
        <div className="hero-actions">
          <ExternalLink href={bookingUrl} className="button button-primary">Book Candoux 4</ExternalLink>
          <a className="button button-outline" href="#stay">Explore the apartment<Icon name="down" /></a>
        </div>
      </div>
      <Scene className="hero-scene" {...photos[0]} caption="The Candoux 4 lounge" photographer="AMS Mt Buller" photoSource={listingUrl} priority />
    </section>
  )
}

function Stay() {
  return (
    <section className="stay section-space shell" id="stay" tabIndex={-1} aria-labelledby="stay-title">
      <div className="stay-intro">
        <p className="eyebrow index-label"><span>01</span> The apartment</p>
        <h2 id="stay-title">A place to land <em>after the lifts.</em></h2>
        <p>Candoux 4 sits on the quieter north-east side of the village, near Village Square and Bourke Street. Come back from the slopes, hang up your gear and settle in by the gas fire.</p>
        <p className="stay-address"><Icon name="pin" />8 Chamois Close, Mount Buller VIC 3723</p>
      </div>
      <aside className="stay-note" aria-label="Apartment layout">
        <Ridge className="stay-ridge" />
        <p className="eyebrow">Inside Candoux 4</p>
        <dl className="stay-facts">
          <div><dt>Guests</dt><dd>7</dd></div>
          <div><dt>Bedrooms</dt><dd>3</dd></div>
          <div><dt>Bathroom</dt><dd>1</dd></div>
        </dl>
        <p>One queen room, one single-bunk room and one room with a double bed and a single bunk above.</p>
      </aside>
      <div className="amenities" aria-label="Apartment amenities">
        <div><h3>Cook together</h3><p>Equipped kitchen, coffee pod machine and BBQ.</p></div>
        <div><h3>Warm up</h3><p>Gas fire, central heating and Wi-Fi.</p></div>
        <div><h3>Ready for tomorrow</h3><p>Ski racks, drying cupboard, washer and dryer.</p></div>
      </div>
    </section>
  )
}

function Gallery() {
  const dialog = useRef(null)
  const opener = useRef(null)
  const [index, setIndex] = useState(0)
  const activePhoto = photos[index]

  function openGallery(event, photoIndex) {
    opener.current = event.currentTarget
    setIndex(photoIndex)
    dialog.current.showModal()
  }

  function step(offset) {
    setIndex(current => (current + offset + photos.length) % photos.length)
  }

  function handleGalleryKeys(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault()
      step(event.key === 'ArrowLeft' ? -1 : 1)
    }
  }

  return (
    <section className="gallery shell" id="photos" tabIndex={-1} aria-labelledby="photos-title">
      <div className="gallery-header">
        <div>
          <p className="eyebrow index-label"><span>02</span> The photo album</p>
          <h2 id="photos-title">A look <em>inside.</em></h2>
        </div>
        <button className="button button-outline" type="button" aria-haspopup="dialog" onClick={event => openGallery(event, 0)}>
          View all {photos.length} photos<Icon name="photo" />
        </button>
      </div>
      <div className="gallery-grid">
        {photos.slice(0, 3).map((photo, photoIndex) => (
          <button className="gallery-tile" key={photo.image} type="button" aria-haspopup="dialog" aria-label={`View photo: ${photo.title}`} onClick={event => openGallery(event, photoIndex)}>
            <img src={photo.image} alt="" width="750" height="341" loading="lazy" />
            <span>{photo.title}<Icon name="external" /></span>
          </button>
        ))}
      </div>
      <p className="gallery-credit">Apartment photos from <a href={listingUrl}>AMS Mt Buller</a></p>
      <dialog ref={dialog} className="gallery-dialog" aria-labelledby="gallery-dialog-heading" onKeyDown={handleGalleryKeys} onClose={() => opener.current?.focus({ preventScroll: true })} onClick={event => {
        if (event.target === dialog.current) dialog.current.close()
      }}>
        <div className="gallery-dialog-content">
          <div className="gallery-dialog-header">
            <h3 id="gallery-dialog-heading">Candoux 4 photos</h3>
            <button className="menu-button" type="button" aria-label="Close photo gallery" onClick={() => dialog.current.close()}><Icon name="close" /></button>
          </div>
          <img src={activePhoto.image} alt={activePhoto.alt} width="750" height="341" />
          <div className="gallery-dialog-footer">
            <div aria-live="polite" aria-atomic="true">
              <p>{activePhoto.title}</p>
              <p className="eyebrow">{index + 1} of {photos.length}</p>
            </div>
            <div className="gallery-dialog-buttons">
              <button className="menu-button" type="button" aria-label="Previous photo" onClick={() => step(-1)}><Icon name="left" /></button>
              <button className="menu-button" type="button" aria-label="Next photo" onClick={() => step(1)}><Icon name="right" /></button>
            </div>
          </div>
        </div>
      </dialog>
    </section>
  )
}

function Seasons() {
  const [season, setSeason] = useState('winter')
  const activeSeason = seasons[season]

  return (
    <section className="seasons section-space" id="seasons" tabIndex={-1} aria-labelledby="seasons-title">
      <div className="shell seasons-inner">
        <div className="seasons-intro">
          <p className="eyebrow index-label"><span>03</span> On the mountain</p>
          <h2 id="seasons-title">Buller, <em>by season.</em></h2>
          <div className="season-select" role="group" aria-label="Choose a season">
            {Object.entries(seasons).map(([id, option]) => (
              <button key={id} className="season-button" type="button" aria-controls="season-content" aria-pressed={season === id} onClick={() => setSeason(id)}>
                <Icon name={id} />{option.name}
              </button>
            ))}
          </div>
          <div className="season-copy" id="season-content" aria-live="polite">
            <h3>{activeSeason.title}</h3>
            <p>{activeSeason.description}</p>
            <ExternalLink href={activeSeason.link}>Explore {activeSeason.name.toLowerCase()} at Mt Buller</ExternalLink>
          </div>
        </div>
        <Scene key={season} className="season-scene" {...activeSeason} license />
      </div>
    </section>
  )
}

function RouteIllustration() {
  return (
    <svg className="route-illustration" viewBox="0 0 490 262" fill="none" aria-hidden="true">
      <g className="contours">
        <path d="M-35 39C32 68 50 10 105 27c47 15 28 57 86 59 57 3 63-44 115-46 63-2 65 40 115 27 30-8 44-36 98-29" />
        <path d="M-35 58c69 29 90-25 139-10 40 12 33 58 87 60 59 2 68-46 118-48 54-2 62 41 115 28 31-7 46-37 95-31" />
        <path d="M-35 77c71 30 94-23 138-10 35 10 36 58 90 60 59 2 71-45 119-46 51-2 62 39 115 27 33-8 44-34 92-30" />
        <path d="M-35 96c73 31 97-20 137-9 33 10 41 57 93 59 60 2 73-44 120-45 49-1 61 40 115 26 33-8 45-33 89-28" />
        <path d="M-35 115c75 31 102-18 137-8 29 9 46 56 96 59 60 2 73-44 119-45 47 0 63 39 116 25 33-8 45-34 86-28" />
        <path d="M-35 134c76 31 103-15 136-7 28 7 48 57 98 59 61 2 74-43 121-43 44 0 64 38 116 24 35-10 44-34 83-29" />
        <path d="M-35 153c78 32 107-12 135-6 28 6 52 57 102 59 60 3 76-43 120-43 45 0 67 38 117 24 35-10 43-34 80-29" />
        <path d="M-35 172c80 32 112-11 135-5 27 7 56 56 105 59 61 3 79-44 120-43 43 1 68 39 117 24 36-10 43-33 77-29" />
        <path d="M-35 191c83 32 112-7 135-4 26 5 61 56 107 59 63 4 81-44 120-43 41 1 70 39 118 24 35-11 43-31 74-28" />
        <path d="M-35 210c85 32 115-5 135-3 25 4 64 55 109 59 65 5 84-45 120-43 40 2 72 39 118 24 36-11 43-33 72-28" />
      </g>
      <path className="route-line" d="M68 201c45-8 50-45 84-48 37-4 37 21 80 10s45-57 82-57c28 0 46 14 60 3 16-12 9-28 44-36" />
      <circle className="route-stop" cx="68" cy="201" r="5" />
      <circle className="route-stop" cx="268" cy="136" r="5" />
      <circle className="route-stop route-end" cx="418" cy="73" r="7" />
      <g className="route-labels">
        <text x="67" y="228" textAnchor="middle">Melbourne</text>
        <text x="269" y="123" textAnchor="middle">Mansfield</text>
        <text x="419" y="53" textAnchor="middle">Mount Buller</text>
      </g>
    </svg>
  )
}

function Journey() {
  return (
    <section className="journey section-space shell" id="journey" tabIndex={-1} aria-labelledby="journey-title">
      <div className="journey-copy">
        <p className="eyebrow index-label"><span>04</span> Getting here</p>
        <h2 id="journey-title">Up through <em>Mansfield.</em></h2>
        <p>Mount Buller is about three hours (248 km) from Melbourne by road via Mansfield. Before setting out, check Mt Buller’s guide for current entry, parking and wheel-chain information.</p>
        <ExternalLink href={driveGuide}>View the Mt Buller driving guide</ExternalLink>
      </div>
      <figure className="route-card" aria-label="Illustrative route from Melbourne to Mount Buller via Mansfield">
        <RouteIllustration />
        <figcaption className="eyebrow">Melbourne to Mount Buller <span>Illustrative route</span></figcaption>
      </figure>
    </section>
  )
}

function Questions() {
  return (
    <section className="questions section-space" id="questions" tabIndex={-1} aria-labelledby="questions-title">
      <div className="shell questions-inner">
        <div>
          <p className="eyebrow index-label"><span>05</span> Frequently asked</p>
          <h2 id="questions-title">Good to <em>know.</em></h2>
        </div>
        <div className="questions-list">
          <details>
            <summary>How many guests can stay?<Icon name="plus" /></summary>
            <p>The apartment sleeps up to seven across three bedrooms.</p>
          </details>
          <details>
            <summary>Is there parking at Candoux 4?<Icon name="plus" /></summary>
            <p>Candoux 4 has no allocated car park. Check the <a href={driveGuide}>official driving guide</a> for overnight parking and transfer information.</p>
          </details>
          <details>
            <summary>How do I book or ask a question?<Icon name="plus" /></summary>
            <p><a href={bookingUrl}>Check dates and book Candoux 4</a> through the property’s booking page. For questions, <a href={contactUrl}>contact AMS Mt Buller</a>, the booking manager.</p>
          </details>
          <details>
            <summary>What is there to do outside ski season?<Icon name="plus" /></summary>
            <p>Mount Buller has walking and mountain biking trails in the warmer months. See the <a href={seasons.summer.link}>official summer guide</a> for trail information and seasonal updates.</p>
          </details>
          <details>
            <summary>What should I check before driving up?<Icon name="plus" /></summary>
            <p>Read the <a href={driveGuide}>official driving guide</a> for the latest road access, resort entry, parking and wheel-chain information.</p>
          </details>
        </div>
      </div>
    </section>
  )
}

function ApartmentPage() {
  return (
    <div id="top">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <Stay />
        <Gallery />
        <Seasons />
        <Journey />
        <Questions />
      </main>
      <footer className="site-footer">
        <div className="shell footer-booking">
          <div>
            <p className="eyebrow">Stay at Candoux 4</p>
            <h2>See you <em>up there.</em></h2>
            <p>Booking enquiries are managed by AMS Mt Buller.</p>
          </div>
          <div className="footer-actions">
            <ExternalLink href={bookingUrl} className="button button-light">Book Candoux 4</ExternalLink>
            <ExternalLink href={contactUrl} className="text-link">Contact the booking manager</ExternalLink>
          </div>
        </div>
        <div className="shell footer-inner">
          <Brand />
          <p><a href={listingUrl}>AMS Mt Buller property listing</a></p>
          <a className="back-to-top" href="#top">Back to top<Icon name="up" /></a>
        </div>
      </footer>
    </div>
  )
}

const host = window.location.hostname
const environment = host.endsWith('.ts.net') ? 'TS'
  : host.endsWith('.vercel.app') && host !== 'tmp-rose-nine.vercel.app' ? 'VC'
    : import.meta.env.DEV ? 'LC' : ''

if (environment) document.title = `[${environment}] ${document.title}`

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ApartmentPage />} />
      <Route path="/index.html" element={<ApartmentPage />} />
    </Routes>
  </BrowserRouter>,
)
