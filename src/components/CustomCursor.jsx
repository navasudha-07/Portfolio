import { useEffect, useRef, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [bubbles, setBubbles] = useState([])

  const mousePos = useRef({ x: -100, y: -100 })
  const lastMousePos = useRef({ x: -100, y: -100 })
  const lastBubbleTime = useRef(0)

  useEffect(() => {
    // If touch-only screen, skip custom cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    let bubbleCounter = 0
    const spawnBubble = (x, y, count = 1, isBurst = false) => {
      const newBubbles = []
      for (let i = 0; i < count; i++) {
        bubbleCounter += 1
        const id = `${Date.now()}-${bubbleCounter}-${Math.random().toString(36).slice(2, 7)}`
        const size = isBurst ? Math.random() * 12 + 6 : Math.random() * 14 + 7
        const duration = isBurst ? Math.random() * 0.5 + 0.6 : Math.random() * 0.7 + 0.8
        const jitterX = (Math.random() - 0.5) * (isBurst ? 40 : 14)
        const jitterY = (Math.random() - 0.5) * (isBurst ? 40 : 14)
        const driftX = (Math.random() - 0.5) * (isBurst ? 60 : 36)
        const floatY = isBurst ? -(Math.random() * 40 + 25) : -(Math.random() * 75 + 45)

        newBubbles.push({
          id,
          x: x + jitterX,
          y: y + jitterY,
          size,
          duration,
          driftX,
          floatY,
        })
      }

      setBubbles((prev) => [...prev.slice(-30), ...newBubbles])

      // Clean up after life duration
      setTimeout(() => {
        setBubbles((prev) => prev.filter((b) => !newBubbles.some((nb) => nb.id === b.id)))
      }, 1500)
    }

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
      if (!isVisible) setIsVisible(true)

      // Move center focal dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
      }

      // Check distance moved to spawn bubbles according to motion
      const dist = Math.hypot(
        e.clientX - lastMousePos.current.x,
        e.clientY - lastMousePos.current.y
      )

      const now = Date.now()
      if (dist > 7 || now - lastBubbleTime.current > 120) {
        lastMousePos.current = { x: e.clientX, y: e.clientY }
        lastBubbleTime.current = now

        const count = dist > 40 ? 3 : dist > 20 ? 2 : 1
        spawnBubble(e.clientX, e.clientY, count, false)
      }

      // Check if hovering clickable elements
      const target = e.target
      const isInteractive =
        target.closest(
          'button, a, .v-project-item, .contact-pearl, .creature-wrapper, .tank-doll-entity, .doll-drag-handle, .dock-dolls-btn, .floating-tank-node, .tank-speech-bubble, .tank-prop-container, .panel-close, .cat-tab-btn, .replace-dolls-btn, .doll-choice-card, .kiosk-toggle-btn, .kiosk-tab-btn, .kiosk-nav-arrow, .deck-card-wrapper, .kiosk-screen-card'
        ) !== null

      setIsHovered(isInteractive)
    }

    const handleMouseDown = (e) => {
      setIsClicked(true)
      // Burst of bubbles appearing and scattering on click
      spawnBubble(e.clientX, e.clientY, 8, true)
    }

    const handleMouseUp = () => setIsClicked(false)
    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    // Gentle idle bubbling when resting in water
    const idleInterval = setInterval(() => {
      if (isVisible && mousePos.current.x > 0) {
        spawnBubble(mousePos.current.x, mousePos.current.y, 1, false)
      }
    }, 450)

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
      clearInterval(idleInterval)
    }
  }, [isVisible])

  return (
    <div className={`custom-cursor-container ${isVisible ? 'visible' : ''}`} aria-hidden="true">
      {/* Dynamic Aquatic Bubbles Appearing, Floating & Disappearing */}
      {bubbles.map((b) => (
        <div
          key={b.id}
          className="cursor-aquatic-bubble"
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            '--drift-x': `${b.driftX}px`,
            '--float-y': `${b.floatY}px`,
            animationDuration: `${b.duration}s`,
          }}
        >
          <div className="bubble-gleam" />
        </div>
      ))}

      {/* Subtle Aquatic Precision Dot */}
      <div
        ref={dotRef}
        className={`cursor-focal-dot ${isHovered ? 'hovered' : ''} ${isClicked ? 'clicked' : ''}`}
      />
    </div>
  )
}
