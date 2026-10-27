import { useState } from 'react'
import { playDiveSound, initAudio, toggleAudio } from '../utils/audioEngine'
import './SplashEnter.css'

export default function SplashEnter({ onEnter }) {
  const [isDiving, setIsDiving] = useState(false)

  const handleEnterClick = () => {
    initAudio()
    // Start with sound enabled when user interacts with Enter
    toggleAudio()
    playDiveSound()
    setIsDiving(true)

    setTimeout(() => {
      onEnter()
    }, 750)
  }

  return (
    <div className={`splash-enter-screen ${isDiving ? 'diving' : ''}`}>
      {/* Surface water layers */}
      <div className="splash-water-top" aria-hidden="true">
        <svg viewBox="0 0 1440 180" preserveAspectRatio="none" className="splash-wave">
          <path
            d="M0,80 C320,160 540,20 860,110 C1140,180 1340,40 1440,90 L1440,0 L0,0 Z"
            fill="rgba(70, 179, 184, 0.45)"
          />
          <path
            d="M0,60 C280,30 620,130 920,50 C1180,0 1380,80 1440,60 L1440,0 L0,0 Z"
            fill="rgba(162, 232, 231, 0.35)"
          />
        </svg>
      </div>

      {/* Floating Bubbles */}
      <div className="splash-bubbles" aria-hidden="true">
        <span className="s-bubble b1" />
        <span className="s-bubble b2" />
        <span className="s-bubble b3" />
        <span className="s-bubble b4" />
        <span className="s-bubble b5" />
      </div>

      <div className="splash-center-content">
        {/* Echo brand logo matching crechetank brand style */}
        <h1 className="echo-logo splash-title">
          NAVA SUDHA
        </h1>

        <div className="splash-status font-mono">
          <span className="status-dot" />
          <span>READY 100%</span>
        </div>

        <button
          className="splash-enter-btn font-mono"
          onClick={handleEnterClick}
          id="splash-enter-button"
        >
          ENTER
        </button>

        <p className="splash-hint font-mono">
          UI/UX Designer & Creative Technologist
        </p>
      </div>
    </div>
  )
}
