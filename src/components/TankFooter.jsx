import { useState, useEffect } from 'react'
import { personal } from '../data/portfolioData'
import { toggleAudio, getAudioState, playBubblePop } from '../utils/audioEngine'
import './TankFooter.css'

export default function TankFooter() {
  const [soundOn, setSoundOn] = useState(false)
  const [copiedNotice, setCopiedNotice] = useState(false)

  useEffect(() => {
    setSoundOn(getAudioState())
  }, [])

  const handleSoundToggle = () => {
    const newState = toggleAudio()
    setSoundOn(newState)
  }

  const handleCopyNotice = () => {
    navigator.clipboard?.writeText(personal.email)
    playBubblePop(600)
    setCopiedNotice(true)
    setTimeout(() => setCopiedNotice(false), 2000)
  }

  return (
    <footer className="tank-footer font-mono">
      {/* Bottom Left Brand & Knock Notice */}
      <div className="tank-footer-left">
        <span className="tank-footer-brand">
          NAVA SUDHA
        </span>
        <button
          className="tank-knock-notice-btn"
          onClick={handleCopyNotice}
          title="Click to copy email address"
        >
          {copiedNotice ? (
            <span className="notice-copied">Copied navasudha07@gmail.com to clipboard!</span>
          ) : (
            <span>Knock on the glass · {personal.email}</span>
          )}
        </button>
      </div>

      {/* Bottom Right Sound Synthesizer Equalizer Toggle */}
      <div className="tank-footer-right">
        <button
          className="tank-sound-toggle-btn font-mono"
          onClick={handleSoundToggle}
          title={soundOn ? 'Mute ambient underwater sound' : 'Enable ambient underwater audio'}
          id="tank-sound-toggle"
        >
          <div className={`sound-bars ${soundOn ? 'active' : ''}`} aria-hidden="true">
            <span className="sound-bar" />
            <span className="sound-bar" />
            <span className="sound-bar" />
          </div>
          <span className="sound-label">
            {soundOn ? 'sound on' : 'sound off'}
          </span>
        </button>
      </div>
    </footer>
  )
}
