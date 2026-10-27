import { useState, useEffect, useRef } from 'react'
import { playKnockSound } from '../utils/audioEngine'
import './TankBackground.css'

export default function TankBackground({ onTankKnock }) {
  const [ripples, setRipples] = useState([])
  const [bubbles, setBubbles] = useState([])
  const containerRef = useRef(null)

  // Generate initial bubbles with varied speeds, sizes, and delays
  useEffect(() => {
    const bubbleList = Array.from({ length: 28 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2,
      size: Math.random() * 14 + 6,
      duration: Math.random() * 8 + 7,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.45 + 0.25,
    }))
    setBubbles(bubbleList)
  }, [])

  // Handle glass knock click anywhere on screen
  const handleTankClick = (e) => {
    // If clicking an interactive button/input/link, don't trigger knock
    const targetTag = e.target.tagName.toLowerCase()
    if (['button', 'a', 'input', 'textarea'].includes(targetTag) || e.target.closest('button, a, input')) {
      return
    }

    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Play physical glass knock chime
    playKnockSound()

    // Add visual ripple
    const id = Date.now() + Math.random()
    setRipples((prev) => [...prev.slice(-6), { id, x, y }])

    // Notify parent if needed
    if (onTankKnock) {
      onTankKnock({ x, y })
    }

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 900)
  }

  return (
    <div
      ref={containerRef}
      className="tank-background-container"
      onClick={handleTankClick}
    >
      {/* Deep water gradient background */}
      <div className="water-depths" />

      {/* Surface wave with water shimmer */}
      <div className="water-surface-wave" aria-hidden="true">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="wave-svg"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,-20 1200,30 L1200,0 L0,0 Z"
            fill="rgba(70, 179, 184, 0.28)"
          />
          <path
            d="M0,0 C200,40 420,-20 600,60 C780,140 1020,10 1200,45 L1200,0 L0,0 Z"
            fill="rgba(162, 232, 231, 0.22)"
          />
        </svg>
      </div>

      {/* Sunlight God Rays streaming down */}
      <div className="sunlight-rays" aria-hidden="true">
        <div className="ray ray-1" />
        <div className="ray ray-2" />
        <div className="ray ray-3" />
        <div className="ray ray-4" />
      </div>

      {/* Water Caustics Shimmer */}
      <div className="water-caustics" aria-hidden="true" />

      {/* Ghost swimming silhouettes across the depths */}
      <div className="tank-creature-silhouette fish-1" aria-hidden="true">
        <svg viewBox="0 0 100 40" width="70" height="28" fill="rgba(162, 232, 231, 0.25)">
          <path d="M0,20 Q30,0 70,20 Q95,5 100,0 Q95,20 100,40 Q95,35 70,20 Q30,40 0,20 Z" />
        </svg>
      </div>
      <div className="tank-creature-silhouette fish-2" aria-hidden="true">
        <svg viewBox="0 0 120 50" width="95" height="38" fill="rgba(70, 179, 184, 0.2)">
          <path d="M0,25 Q35,2 85,25 Q115,8 120,0 Q115,25 120,50 Q115,42 85,25 Q35,48 0,25 Z" />
        </svg>
      </div>
      <div className="tank-creature-silhouette fish-3" aria-hidden="true">
        <svg viewBox="0 0 90 35" width="55" height="22" fill="rgba(162, 232, 231, 0.18)">
          <path d="M0,18 Q28,0 65,18 Q88,5 90,0 Q88,18 90,35 Q88,30 65,18 Q28,35 0,18 Z" />
        </svg>
      </div>

      {/* Floating aquatic bubbles */}
      <div className="bubbles-layer" aria-hidden="true">
        {bubbles.map((b) => (
          <div
            key={b.id}
            className="tank-bubble"
            style={{
              left: `${b.left}%`,
              width: `${b.size}px`,
              height: `${b.size}px`,
              animationDuration: `${b.duration}s`,
              animationDelay: `${b.delay}s`,
              opacity: b.opacity,
            }}
          />
        ))}
      </div>

      {/* Dynamic Knock Shockwave Ripples */}
      {ripples.map((r) => (
        <div
          key={r.id}
          className="knock-ripple"
          style={{
            left: `${r.x}px`,
            top: `${r.y}px`,
          }}
        />
      ))}

      {/* Glass refraction edge and vignette */}
      <div className="tank-refraction-overlay" />
      <div className="tank-glass-edge" />
    </div>
  )
}
