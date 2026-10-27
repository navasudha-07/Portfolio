import { useState, useEffect, useRef } from 'react'
import { playBubblePop } from '../utils/audioEngine'
import { RotateCw, ChevronLeft, ChevronRight, Layers, Eye, Sparkles } from 'lucide-react'
import './RotatingKioskPresentation.css'

export default function RotatingKioskPresentation({
  screens = [],
  title = 'KIWI Restaurant & Café Kiosk',
  onInspectScreen,
  compact = false,
}) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [viewMode, setViewMode] = useState('single') // 'single' | 'deck'
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)

  const currentScreen = screens[activeIdx] || screens[0]

  // Track cursor movement for interactive 3D tilt
  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMouseTilt({
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    })
  }

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 })
  }

  const handleNext = () => {
    playBubblePop(520)
    setActiveIdx((prev) => (prev + 1) % screens.length)
  }

  const handlePrev = () => {
    playBubblePop(520)
    setActiveIdx((prev) => (prev - 1 + screens.length) % screens.length)
  }

  const handleSelectTab = (idx) => {
    playBubblePop(550)
    setActiveIdx(idx)
  }

  const toggleAutoRotate = () => {
    playBubblePop(600)
    setIsAutoRotating((prev) => !prev)
  }

  const toggleViewMode = () => {
    playBubblePop(580)
    setViewMode((prev) => (prev === 'single' ? 'deck' : 'single'))
  }

  // Keyboard navigation when hovered
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [screens.length])

  // Calculated 3D transform for the device frame
  const tiltY = mouseTilt.x * 14
  const tiltX = -mouseTilt.y * 10

  return (
    <div
      ref={containerRef}
      className={`kiosk-presentation-stage ${compact ? 'is-compact' : ''} ${
        isAutoRotating ? 'is-auto-rotating' : ''
      }`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-label="3D Rotating Kiosk Presentation"
    >
      {/* Ambient Radial Spotlight */}
      <div className="kiosk-ambient-glow" />

      {/* Top Controls Bar */}
      <div className="kiosk-controls-header font-mono">
        <div className="kiosk-badge">
          <Sparkles size={12} />
          <span>KIOSK 3D SHOWROOM</span>
        </div>

        <div className="kiosk-action-toggles">
          <button
            className={`kiosk-toggle-btn ${isAutoRotating ? 'active-toggle' : ''}`}
            onClick={toggleAutoRotate}
            title={isAutoRotating ? 'Pause 3D rotation' : 'Start 3D rotation'}
          >
            <RotateCw size={12} className={isAutoRotating ? 'spin-icon' : ''} />
            <span>{isAutoRotating ? 'ROTATING' : 'PAUSED'}</span>
          </button>

          <button
            className={`kiosk-toggle-btn ${viewMode === 'deck' ? 'active-toggle' : ''}`}
            onClick={toggleViewMode}
            title={viewMode === 'deck' ? 'Switch to Stand View' : 'Switch to 3D Fan Deck'}
          >
            <Layers size={12} />
            <span>{viewMode === 'deck' ? 'STAND VIEW' : '3D DECK'}</span>
          </button>
        </div>
      </div>

      {/* ── 3D Rotating Stage ── */}
      <div className="kiosk-3d-viewport">
        {viewMode === 'single' ? (
          /* Single Kiosk Mockup with 3D Rotation Animation */
          <div
            className={`kiosk-3d-turntable ${isAutoRotating ? 'animating-orbit' : ''}`}
            style={{
              '--tilt-x': `${tiltX}deg`,
              '--tilt-y': `${tiltY}deg`,
            }}
          >
            {/* Kiosk Standing Frame */}
            <div className="kiosk-device-shell">
              {/* Top Glass Bezel Camera & Speaker */}
              <div className="kiosk-bezel-top">
                <span className="kiosk-camera-dot" />
                <span className="kiosk-sensor-bar" />
              </div>

              {/* Active Display Screen */}
              <div className="kiosk-screen-viewport">
                <img
                  src={currentScreen.image}
                  alt={currentScreen.title}
                  className="kiosk-screen-img"
                  loading="lazy"
                />

                {/* Glare and Reflection Overlay */}
                <div className="kiosk-glass-glare" />

                {/* Floating Feature Pill on Screen */}
                <div className="kiosk-screen-badge font-mono">
                  <span>{currentScreen.tag}</span>
                </div>
              </div>

              {/* Bottom Bezel with Logo */}
              <div className="kiosk-bezel-bottom font-mono">
                <span className="kiosk-hardware-brand">KIWI TOUCH KIOSK · 24"</span>
              </div>
            </div>

            {/* Kiosk Stand Base & Ground Shadow */}
            <div className="kiosk-stand-neck" />
            <div className="kiosk-stand-pedestal" />
            <div className="kiosk-ground-shadow" />
          </div>
        ) : (
          /* 3D Cylindrical Deck Mode (Fan-out of all 5 screens) */
          <div
            className={`kiosk-3d-deck-ring ${isAutoRotating ? 'deck-rotating' : ''}`}
            style={{
              '--tilt-x': `${tiltX * 0.5}deg`,
              '--tilt-y': `${tiltY * 0.7}deg`,
            }}
          >
            {screens.map((s, idx) => {
              const count = screens.length
              const angle = (idx - activeIdx) * (360 / count)
              const isSelected = idx === activeIdx

              return (
                <div
                  key={s.id}
                  className={`deck-card-wrapper ${isSelected ? 'selected-deck-card' : ''}`}
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(260px)`,
                  }}
                  onClick={() => handleSelectTab(idx)}
                >
                  <img src={s.image} alt={s.title} className="deck-card-img" />
                  <div className="deck-card-label font-mono">
                    <span>{`0${idx + 1} · ${s.title}`}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Screen Navigation Tabs */}
      <div className="kiosk-navigation-bar font-mono">
        <button
          className="kiosk-nav-arrow prev-arrow"
          onClick={handlePrev}
          title="Previous Screen"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="kiosk-screen-tabs">
          {screens.map((s, idx) => (
            <button
              key={s.id}
              className={`kiosk-tab-btn ${idx === activeIdx ? 'active-kiosk-tab' : ''}`}
              onClick={() => handleSelectTab(idx)}
            >
              <span className="tab-number">{`0${idx + 1}`}</span>
              <span className="tab-name">{s.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>

        <button
          className="kiosk-nav-arrow next-arrow"
          onClick={handleNext}
          title="Next Screen"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Active Screen Metadata & Description */}
      <div className="kiosk-meta-card font-mono">
        <div className="kiosk-meta-row">
          <span className="kiosk-meta-title font-editorial">
            {currentScreen.title}
          </span>
          <span className="kiosk-meta-counter">
            {activeIdx + 1} / {screens.length}
          </span>
        </div>
        <p className="kiosk-meta-sub">{currentScreen.subtitle}</p>
        <p className="kiosk-meta-desc">{currentScreen.desc}</p>
      </div>
    </div>
  )
}
