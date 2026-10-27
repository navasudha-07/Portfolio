import { useState } from 'react'
import { playBubblePop } from '../utils/audioEngine'
import { personal } from '../data/portfolioData'
import { ExternalLink, Mail, Phone, Sparkles } from 'lucide-react'
import './TankHeader.css'

export default function TankHeader({ currentView, onViewToggle, onNavigate }) {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleToggleClick = () => {
    playBubblePop(540)
    setIsNavOpen((prev) => !prev)
  }

  const handleMenuSelect = (view) => {
    playBubblePop(480)
    setIsNavOpen(false)
    if (onNavigate) {
      onNavigate(view)
    } else if (currentView !== view) {
      onViewToggle()
    }
  }

  return (
    <>
      <header className="tank-header">
        {/* Brand & Subtitle */}
        <div className="tank-brand-group">
          <button
            className="brand-logo-btn"
            onClick={() => handleMenuSelect('tank')}
            title="Return to Tank View"
          >
            <span className="echo-logo-small">NAVA SUDHA</span>
          </button>
          <span className="tank-brand-badge font-mono">
            {currentView === 'tank' ? 'portfolio' : "what's more"}
          </span>
        </div>

        {/* Top Right Crechetank Circular Lens Nav Toggle */}
        <div className="tank-header-actions">
          <span className="toggle-hint-label font-mono">
            {currentView === 'tank' ? "WHAT'S MORE" : "PORTFOLIO"}
          </span>

          <button
            className={`nav-toggle ${isNavOpen ? 'is-open' : ''}`}
            onClick={handleToggleClick}
            title={isNavOpen ? 'Close Menu' : 'Open Navigation'}
            aria-label="Toggle Navigation Menu"
            id="tank-view-toggle-btn"
          >
            <div className="toggle-lens-orb" />
          </button>
        </div>
      </header>

      {/* Crechetank Slide-in Frosted Glass Sidebar Menu */}
      <div
        className={`tank-nav-backdrop ${isNavOpen ? 'is-open' : ''}`}
        onClick={() => setIsNavOpen(false)}
        aria-hidden="true"
      />

      <div className={`tank-nav-drawer ${isNavOpen ? 'is-open' : ''}`}>
        <div className="tank-drawer-refract" />

        <div className="tank-drawer-content font-mono">
          <p className="drawer-heading">NAVIGATION</p>

          <nav className="drawer-menu-links">
            <button
              className={`drawer-link ${currentView === 'tank' ? 'active-link' : ''}`}
              onClick={() => handleMenuSelect('tank')}
            >
              <span>WORK</span>
              <span className="drawer-link-meta">Portfolio</span>
            </button>

            <button
              className={`drawer-link ${currentView === 'more' ? 'active-link' : ''}`}
              onClick={() => handleMenuSelect('more')}
            >
              <span>WHAT&apos;S MORE</span>
              <span className="drawer-link-meta">About &amp; Journey</span>
            </button>

            <a
              href={personal.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-link"
              onClick={() => playBubblePop(520)}
            >
              <span>LINKEDIN</span>
              <ExternalLink size={12} />
            </a>

            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="drawer-link"
              onClick={() => playBubblePop(520)}
            >
              <span>GITHUB</span>
              <ExternalLink size={12} />
            </a>
          </nav>

          <div className="drawer-footer-block">
            <p className="drawer-hint-title">KNOCK ON THE GLASS</p>
            <a href={`mailto:${personal.email}`} className="drawer-email-link">
              <Mail size={13} />
              <span>{personal.email}</span>
            </a>
            <p className="drawer-phone">
              <Phone size={13} />
              <span>{personal.phoneFormatted}</span>
            </p>
            <p className="drawer-role-desc font-editorial">
              &ldquo;{personal.tagline}&rdquo;
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
