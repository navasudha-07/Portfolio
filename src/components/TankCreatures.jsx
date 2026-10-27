import { useState, useEffect, useRef, useCallback } from 'react'
import { playBubblePop } from '../utils/audioEngine'
import { RefreshCw, Anchor, Move } from 'lucide-react'
import './TankCreatures.css'

export default function TankCreatures({ currentView, doll1, doll2, onOpenDollSelector }) {
  const [doll1QuoteIdx, setDoll1QuoteIdx] = useState(0)
  const [doll2QuoteIdx, setDoll2QuoteIdx] = useState(0)
  const [doll1Bounce, setDoll1Bounce] = useState(false)
  const [doll2Bounce, setDoll2Bounce] = useState(false)

  // Cursor global tracking for 3D gaze
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 })

  // Dragging state
  const [isDragging, setIsDragging] = useState(null) // null | 'doll1' | 'doll2'
  const [doll1Tilt, setDoll1Tilt] = useState(0)
  const [doll2Tilt, setDoll2Tilt] = useState(0)

  // Default positions helper
  const getDefaultPositions = useCallback(() => {
    const h = typeof window !== 'undefined' ? window.innerHeight : 800
    return {
      doll1: { x: 38, y: Math.max(120, h - 185) },
      doll2: { x: 148, y: Math.max(120, h - 185) },
    }
  }, [])

  // Position state with localStorage persistence
  const [pos1, setPos1] = useState(() => {
    try {
      const saved = localStorage.getItem('tank_doll1_pos')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
          return parsed
        }
      }
    } catch {}
    const def = typeof window !== 'undefined' ? window.innerHeight - 185 : 615
    return { x: 38, y: Math.max(120, def) }
  })

  const [pos2, setPos2] = useState(() => {
    try {
      const saved = localStorage.getItem('tank_doll2_pos')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (typeof parsed?.x === 'number' && typeof parsed?.y === 'number') {
          return parsed
        }
      }
    } catch {}
    const def = typeof window !== 'undefined' ? window.innerHeight - 185 : 615
    return { x: 148, y: Math.max(120, def) }
  })

  // Synchronous refs for accurate drag coordinates
  const pos1Ref = useRef(pos1)
  const pos2Ref = useRef(pos2)
  pos1Ref.current = pos1
  pos2Ref.current = pos2

  const drag1Ref = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    hasMoved: false,
  })

  const drag2Ref = useRef({
    active: false,
    pointerId: null,
    startX: 0,
    startY: 0,
    originX: 0,
    originY: 0,
    hasMoved: false,
  })

  // Dialogue for "What's More" view
  const whatsMoreQuotes = {
    doll1: 'How to work with Nava Sudha?',
    doll2: 'Knock on the glass · navasudha07@gmail.com',
  }

  // Window resize bounds handler
  useEffect(() => {
    const handleResize = () => {
      const maxW = window.innerWidth - 105
      const maxH = window.innerHeight - 110

      setPos1((prev) => ({
        x: Math.max(16, Math.min(maxW, prev.x)),
        y: Math.max(70, Math.min(maxH, prev.y)),
      }))
      setPos2((prev) => ({
        x: Math.max(16, Math.min(maxW, prev.x)),
        y: Math.max(70, Math.min(maxH, prev.y)),
      }))
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Cursor tracking for independent 3D gaze
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Window-level tracking during active dragging for ultra-smooth responsiveness
  useEffect(() => {
    if (!isDragging) return

    const handleGlobalPointerMove = (e) => {
      if (isDragging === 'doll1' && drag1Ref.current.active) {
        const dx = e.clientX - drag1Ref.current.startX
        const dy = e.clientY - drag1Ref.current.startY
        if (!drag1Ref.current.hasMoved && Math.hypot(dx, dy) > 3) {
          drag1Ref.current.hasMoved = true
        }
        if (drag1Ref.current.hasMoved) {
          const maxW = window.innerWidth - 105
          const maxH = window.innerHeight - 110
          const newX = Math.max(16, Math.min(maxW, drag1Ref.current.originX + dx))
          const newY = Math.max(70, Math.min(maxH, drag1Ref.current.originY + dy))
          const tilt = Math.max(-18, Math.min(18, dx * 0.35))
          pos1Ref.current = { x: newX, y: newY }
          setPos1({ x: newX, y: newY })
          setDoll1Tilt(tilt)
        }
      } else if (isDragging === 'doll2' && drag2Ref.current.active) {
        const dx = e.clientX - drag2Ref.current.startX
        const dy = e.clientY - drag2Ref.current.startY
        if (!drag2Ref.current.hasMoved && Math.hypot(dx, dy) > 3) {
          drag2Ref.current.hasMoved = true
        }
        if (drag2Ref.current.hasMoved) {
          const maxW = window.innerWidth - 105
          const maxH = window.innerHeight - 110
          const newX = Math.max(16, Math.min(maxW, drag2Ref.current.originX + dx))
          const newY = Math.max(70, Math.min(maxH, drag2Ref.current.originY + dy))
          const tilt = Math.max(-18, Math.min(18, dx * 0.35))
          pos2Ref.current = { x: newX, y: newY }
          setPos2({ x: newX, y: newY })
          setDoll2Tilt(tilt)
        }
      }
    }

    const handleGlobalPointerUp = (e) => {
      if (isDragging === 'doll1') {
        onPointerUpDoll1(e)
      } else if (isDragging === 'doll2') {
        onPointerUpDoll2(e)
      }
    }

    window.addEventListener('pointermove', handleGlobalPointerMove)
    window.addEventListener('pointerup', handleGlobalPointerUp)
    window.addEventListener('pointercancel', handleGlobalPointerUp)

    return () => {
      window.removeEventListener('pointermove', handleGlobalPointerMove)
      window.removeEventListener('pointerup', handleGlobalPointerUp)
      window.removeEventListener('pointercancel', handleGlobalPointerUp)
    }
  }, [isDragging])

  // ── Drag Handlers for Doll 1 ──
  const onPointerDownDoll1 = (e) => {
    if (e.button !== undefined && e.button !== 0) return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    drag1Ref.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pos1Ref.current.x,
      originY: pos1Ref.current.y,
      hasMoved: false,
    }

    setIsDragging('doll1')
    document.body.classList.add('is-doll-dragging')
  }

  const onPointerMoveDoll1 = (e) => {
    if (!drag1Ref.current.active || drag1Ref.current.pointerId !== e.pointerId) return

    const dx = e.clientX - drag1Ref.current.startX
    const dy = e.clientY - drag1Ref.current.startY

    if (!drag1Ref.current.hasMoved && Math.hypot(dx, dy) > 3) {
      drag1Ref.current.hasMoved = true
    }

    if (drag1Ref.current.hasMoved) {
      const maxW = window.innerWidth - 105
      const maxH = window.innerHeight - 110
      const newX = Math.max(16, Math.min(maxW, drag1Ref.current.originX + dx))
      const newY = Math.max(70, Math.min(maxH, drag1Ref.current.originY + dy))
      const tilt = Math.max(-18, Math.min(18, dx * 0.35))

      pos1Ref.current = { x: newX, y: newY }
      setPos1({ x: newX, y: newY })
      setDoll1Tilt(tilt)
    }
  }

  const onPointerUpDoll1 = (e) => {
    if (!drag1Ref.current.active) return

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}

    if (drag1Ref.current.hasMoved) {
      playBubblePop(540)
      try {
        localStorage.setItem('tank_doll1_pos', JSON.stringify(pos1Ref.current))
      } catch {}
    } else {
      handleDoll1Click()
    }

    drag1Ref.current.active = false
    setIsDragging(null)
    setDoll1Tilt(0)
    document.body.classList.remove('is-doll-dragging')
  }

  // ── Drag Handlers for Doll 2 ──
  const onPointerDownDoll2 = (e) => {
    if (e.button !== undefined && e.button !== 0) return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}

    drag2Ref.current = {
      active: true,
      pointerId: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      originX: pos2Ref.current.x,
      originY: pos2Ref.current.y,
      hasMoved: false,
    }

    setIsDragging('doll2')
    document.body.classList.add('is-doll-dragging')
  }

  const onPointerMoveDoll2 = (e) => {
    if (!drag2Ref.current.active || drag2Ref.current.pointerId !== e.pointerId) return

    const dx = e.clientX - drag2Ref.current.startX
    const dy = e.clientY - drag2Ref.current.startY

    if (!drag2Ref.current.hasMoved && Math.hypot(dx, dy) > 3) {
      drag2Ref.current.hasMoved = true
    }

    if (drag2Ref.current.hasMoved) {
      const maxW = window.innerWidth - 105
      const maxH = window.innerHeight - 110
      const newX = Math.max(16, Math.min(maxW, drag2Ref.current.originX + dx))
      const newY = Math.max(70, Math.min(maxH, drag2Ref.current.originY + dy))
      const tilt = Math.max(-18, Math.min(18, dx * 0.35))

      pos2Ref.current = { x: newX, y: newY }
      setPos2({ x: newX, y: newY })
      setDoll2Tilt(tilt)
    }
  }

  const onPointerUpDoll2 = (e) => {
    if (!drag2Ref.current.active) return

    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {}

    if (drag2Ref.current.hasMoved) {
      playBubblePop(540)
      try {
        localStorage.setItem('tank_doll2_pos', JSON.stringify(pos2Ref.current))
      } catch {}
    } else {
      handleDoll2Click()
    }

    drag2Ref.current.active = false
    setIsDragging(null)
    setDoll2Tilt(0)
    document.body.classList.remove('is-doll-dragging')
  }

  // Handle clicking doll 1
  const handleDoll1Click = () => {
    playBubblePop(doll1?.pitch || 580)
    setDoll1Bounce(true)
    setTimeout(() => setDoll1Bounce(false), 600)
    if (doll1?.quotes?.length) {
      setDoll1QuoteIdx((prev) => (prev + 1) % doll1.quotes.length)
    }
  }

  // Handle clicking doll 2
  const handleDoll2Click = () => {
    playBubblePop(doll2?.pitch || 440)
    setDoll2Bounce(true)
    setTimeout(() => setDoll2Bounce(false), 600)
    if (doll2?.quotes?.length) {
      setDoll2QuoteIdx((prev) => (prev + 1) % doll2.quotes.length)
    }
  }

  // Reset / Dock Positions to default seabed
  const handleDockPositions = () => {
    playBubblePop(480)
    const def = getDefaultPositions()
    setPos1(def.doll1)
    setPos2(def.doll2)
    pos1Ref.current = def.doll1
    pos2Ref.current = def.doll2
    try {
      localStorage.removeItem('tank_doll1_pos')
      localStorage.removeItem('tank_doll2_pos')
    } catch {}
  }

  // Calculate 3D gaze vector for each doll from its own current position
  const calcGaze = (pos) => {
    const dollCenterX = pos.x + 44
    const dollCenterY = pos.y + 44
    const dx = (mousePos.x - dollCenterX) / 28
    const dy = (mousePos.y - dollCenterY) / 28
    return {
      x: Math.max(-18, Math.min(18, dx)),
      y: Math.max(-15, Math.min(15, dy)),
    }
  }

  const gaze1 = calcGaze(pos1)
  const gaze2 = calcGaze(pos2)

  const d1Quote =
    currentView === 'more'
      ? whatsMoreQuotes.doll1
      : doll1?.quotes?.[doll1QuoteIdx % (doll1?.quotes?.length || 1)] ||
        'Whenever we cannot decide on a layout...'

  const d2Quote =
    currentView === 'more'
      ? whatsMoreQuotes.doll2
      : doll2?.quotes?.[doll2QuoteIdx % (doll2?.quotes?.length || 1)] ||
        'We prototype.'

  const isD1NearTop = pos1.y < 130
  const isD2NearTop = pos2.y < 130

  return (
    <>
      {/* ── Independent Draggable Doll 1 ── */}
      <div
        className={`tank-doll-entity ${isDragging === 'doll1' ? 'is-dragging' : ''}`}
        style={{
          transform: `translate3d(${pos1.x}px, ${pos1.y}px, 0)`,
        }}
        id="mascot-doll-1"
        aria-label={`${doll1?.name || 'Doll 1'} — Drag anywhere with cursor`}
      >
        {/* Floating Speech Bubble */}
        <div
          className={`tank-speech-bubble ${doll1?.bubbleClass || 'axolotl-speech'} ${
            isD1NearTop ? 'flipped-below' : ''
          } font-mono`}
          onClick={handleDoll1Click}
          title={`Click ${doll1?.name || 'Doll 1'} to chat`}
        >
          {d1Quote}
        </div>

        {/* 3D Gaze Avatar Wrapper with Drag Physics & Pointer Capture */}
        <div
          className={`creature-wrapper ${doll1Bounce ? 'creature-bounce' : ''}`}
          onPointerDown={onPointerDownDoll1}
          onPointerMove={onPointerMoveDoll1}
          onPointerUp={onPointerUpDoll1}
          onPointerCancel={onPointerUpDoll1}
          style={{
            transform: `perspective(600px) rotateY(${gaze1.x}deg) rotateX(${-gaze1.y}deg) rotate(${doll1Tilt}deg)`,
          }}
          title={`${doll1?.name || 'Doll 1'} — Click to chat · Drag anywhere with cursor`}
        >
          <div
            className="creature-glow"
            style={{ background: doll1?.glowColor || 'rgba(244, 114, 182, 0.7)' }}
          />
          <img
            src={doll1?.avatar}
            alt={doll1?.name || 'Doll 1'}
            className="creature-avatar hd-mascot-img"
            draggable={false}
          />

          {/* Hover Drag Grip Indicator */}
          <div className="doll-drag-handle font-mono" title="Drag with cursor">
            <Move size={10} />
            <span>DRAG</span>
          </div>
        </div>
      </div>

      {/* ── Independent Draggable Doll 2 ── */}
      <div
        className={`tank-doll-entity ${isDragging === 'doll2' ? 'is-dragging' : ''}`}
        style={{
          transform: `translate3d(${pos2.x}px, ${pos2.y}px, 0)`,
        }}
        id="mascot-doll-2"
        aria-label={`${doll2?.name || 'Doll 2'} — Drag anywhere with cursor`}
      >
        {/* Floating Speech Bubble */}
        <div
          className={`tank-speech-bubble ${doll2?.bubbleClass || 'coral-bubble'} ${
            isD2NearTop ? 'flipped-below' : ''
          } octopus-speech font-mono`}
          onClick={handleDoll2Click}
          title={`Click ${doll2?.name || 'Doll 2'} to chat`}
        >
          {d2Quote}
        </div>

        {/* 3D Gaze Avatar Wrapper with Drag Physics & Pointer Capture */}
        <div
          className={`creature-wrapper ${doll2Bounce ? 'creature-bounce' : ''}`}
          onPointerDown={onPointerDownDoll2}
          onPointerMove={onPointerMoveDoll2}
          onPointerUp={onPointerUpDoll2}
          onPointerCancel={onPointerUpDoll2}
          style={{
            transform: `perspective(600px) rotateY(${gaze2.x}deg) rotateX(${-gaze2.y}deg) rotate(${doll2Tilt}deg)`,
          }}
          title={`${doll2?.name || 'Doll 2'} — Click to chat · Drag anywhere with cursor`}
        >
          <div
            className="creature-glow"
            style={{ background: doll2?.glowColor || 'rgba(248, 113, 113, 0.7)' }}
          />
          <img
            src={doll2?.avatar}
            alt={doll2?.name || 'Doll 2'}
            className="creature-avatar hd-mascot-img"
            draggable={false}
          />

          {/* Hover Drag Grip Indicator */}
          <div className="doll-drag-handle font-mono" title="Drag with cursor">
            <Move size={10} />
            <span>DRAG</span>
          </div>
        </div>
      </div>

      {/* ── Seabed Control Dock (Fixed above footer) ── */}
      <div className="tank-dolls-control-dock font-mono">
        {onOpenDollSelector && (
          <button
            className="replace-dolls-btn font-mono"
            onClick={() => {
              playBubblePop(540)
              onOpenDollSelector()
            }}
            title="Replace or customize your aquarium dolls"
            id="replace-dolls-button"
          >
            <RefreshCw size={12} className="replace-icon" />
            <span>SWAP DOLLS</span>
          </button>
        )}

        <button
          className="dock-dolls-btn font-mono"
          onClick={handleDockPositions}
          title="Reset dolls back to bottom seabed dock"
          id="dock-dolls-button"
        >
          <Anchor size={12} />
          <span>DOCK DOLLS</span>
        </button>

        <span className="dolls-tip font-mono">
          <span>⠿ Drag dolls anywhere with cursor</span>
        </span>
      </div>
    </>
  )
}
