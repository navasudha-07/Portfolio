import { useState, useRef } from 'react'
import { availableDolls } from '../data/portfolioData'
import { playBubblePop } from '../utils/audioEngine'
import { X, Upload, Check, RotateCcw, Sparkles } from 'lucide-react'
import './DollSelectorModal.css'

export default function DollSelectorModal({
  isOpen,
  onClose,
  doll1,
  doll2,
  onSelectDoll1,
  onSelectDoll2,
}) {
  const [activeSlot, setActiveSlot] = useState(1) // 1 | 2
  const [customDolls, setCustomDolls] = useState(() => {
    try {
      const saved = localStorage.getItem('tank_custom_dolls')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const fileInputRef = useRef(null)

  if (!isOpen) return null

  const allDolls = [...availableDolls, ...customDolls]
  const currentSelectedId = activeSlot === 1 ? doll1?.id : doll2?.id

  const handleSelectDoll = (doll) => {
    playBubblePop(doll.pitch || 550)
    if (activeSlot === 1) {
      onSelectDoll1(doll)
    } else {
      onSelectDoll2(doll)
    }
  }

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const newCustomDoll = {
        id: `custom-${Date.now()}`,
        name: file.name.split('.')[0] || 'My Doll',
        species: 'Custom Companion',
        avatar: event.target.result,
        glowColor: 'rgba(94, 234, 212, 0.75)',
        accentColor: '#5eead4',
        bubbleClass: activeSlot === 1 ? 'axolotl-speech' : 'coral-bubble',
        pitch: 600,
        quotes: [
          'Hello from your custom aquarium companion!',
          'Exploring Nava Sudha’s portfolio with you.',
          'Knock on the glass to wake up ideas!',
        ],
      }

      const updated = [...customDolls, newCustomDoll]
      setCustomDolls(updated)
      try {
        localStorage.setItem('tank_custom_dolls', JSON.stringify(updated))
      } catch (err) {
        console.warn('Could not save to localStorage:', err)
      }

      handleSelectDoll(newCustomDoll)
    }
    reader.readAsDataURL(file)
  }

  const handleResetDefaults = () => {
    playBubblePop(440)
    onSelectDoll1(availableDolls[0])
    onSelectDoll2(availableDolls[1])
  }

  return (
    <div className="doll-modal-backdrop" onClick={onClose}>
      <div
        className="doll-modal-card tank-glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="doll-modal-close"
          onClick={() => {
            playBubblePop(450)
            onClose()
          }}
          aria-label="Close Doll Selector"
        >
          <X size={18} />
        </button>

        <div className="doll-modal-header">
          <span className="doll-modal-badge font-mono">
            <Sparkles size={13} />
            <span>AQUARIUM COMPANIONS</span>
          </span>
          <h2 className="doll-modal-title font-editorial">
            Replace Your Dolls
          </h2>
          <p className="doll-modal-subtitle font-mono">
            Choose or upload who swims at the seabed of Nava Sudha&apos;s portfolio.
          </p>
        </div>

        {/* Slot Switcher Tabs */}
        <div className="doll-slot-tabs font-mono">
          <button
            className={`doll-slot-btn ${activeSlot === 1 ? 'active-slot' : ''}`}
            onClick={() => {
              playBubblePop(520)
              setActiveSlot(1)
            }}
          >
            <span>SLOT 1 (LEFT DOLL)</span>
            <span className="current-doll-name">{doll1?.name}</span>
          </button>

          <button
            className={`doll-slot-btn ${activeSlot === 2 ? 'active-slot' : ''}`}
            onClick={() => {
              playBubblePop(520)
              setActiveSlot(2)
            }}
          >
            <span>SLOT 2 (RIGHT DOLL)</span>
            <span className="current-doll-name">{doll2?.name}</span>
          </button>
        </div>

        {/* Doll Grid Selection */}
        <div className="doll-cards-grid">
          {allDolls.map((doll) => {
            const isChosen = doll.id === currentSelectedId
            return (
              <div
                key={doll.id}
                className={`doll-choice-card ${isChosen ? 'is-chosen' : ''}`}
                onClick={() => handleSelectDoll(doll)}
              >
                <div
                  className="doll-card-glow"
                  style={{ background: doll.glowColor || 'rgba(94, 234, 212, 0.4)' }}
                />
                <img
                  src={doll.avatar}
                  alt={doll.name}
                  className="doll-card-avatar"
                />
                <div className="doll-card-info font-mono">
                  <div className="doll-name-row">
                    <span className="doll-card-name">{doll.name}</span>
                    {isChosen && <Check size={14} className="doll-check-icon" />}
                  </div>
                  <span className="doll-card-species">{doll.species}</span>
                </div>
              </div>
            )
          })}

          {/* Upload Custom Doll Card */}
          <div
            className="doll-choice-card upload-custom-card"
            onClick={() => fileInputRef.current?.click()}
            title="Upload custom image for your doll"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/*"
              style={{ display: 'none' }}
            />
            <div className="upload-icon-circle">
              <Upload size={22} />
            </div>
            <div className="doll-card-info font-mono">
              <span className="doll-card-name">Upload Custom</span>
              <span className="doll-card-species">Any PNG / JPG</span>
            </div>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="doll-modal-footer font-mono">
          <button
            className="tank-pill-btn reset-btn"
            onClick={handleResetDefaults}
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>

          <button
            className="tank-pill-btn confirm-btn"
            onClick={() => {
              playBubblePop(620)
              onClose()
            }}
          >
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  )
}
