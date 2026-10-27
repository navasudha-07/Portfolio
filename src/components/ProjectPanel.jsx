import { useEffect } from 'react'
import { playBubblePop } from '../utils/audioEngine'
import { ExternalLink, X, Sparkles, CheckCircle2 } from 'lucide-react'
import RotatingKioskPresentation from './RotatingKioskPresentation'
import './ProjectPanel.css'

export default function ProjectPanel({ project, isOpen, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        playBubblePop(440)
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`panel-backdrop ${isOpen ? 'is-open' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Crechetank Slide-in Project Panel */}
      <aside className={`project-panel ${isOpen ? 'is-open' : ''}`} aria-label="Project Case Study">
        {/* Circular Close Button with 90deg rotate on hover */}
        <button
          className="panel-close"
          onClick={() => {
            playBubblePop(440)
            onClose()
          }}
          aria-label="Close Case Study"
        >
          ✕
        </button>

        <div className="panel-scroll">
          {/* Title & Tagline in Crechetank Editorial Typography */}
          <h2 className="panel-title font-editorial">
            {project.title}
          </h2>

          <p className="panel-tagline font-editorial">
            {project.headline}
          </p>

          {/* Monospaced Meta Line */}
          <div className="panel-meta-line font-mono">
            <span>{project.number}</span>
            <span>·</span>
            <span>{project.category}</span>
            <span>·</span>
            <span>{project.genre.join(' / ')}</span>
            <span>·</span>
            <span>{project.year}</span>
          </div>

          {/* Media Feature Box or 3D Rotating Kiosk Presentation */}
          {project.isKioskPresentation && project.kioskScreens ? (
            <div className="panel-kiosk-feature">
              <RotatingKioskPresentation
                screens={project.kioskScreens}
                title={project.title}
                compact={false}
              />

              {/* Full Kiosk Screen Gallery Grid */}
              <div className="kiosk-gallery-grid">
                <h4 className="panel-subheading font-mono">
                  <Sparkles size={13} />
                  <span>ALL 5 KIOSK TOUCHSCREEN FLOWS</span>
                </h4>
                <div className="kiosk-screens-row">
                  {project.kioskScreens.map((s, idx) => (
                    <div key={s.id} className="kiosk-screen-card">
                      <div className="kiosk-card-img-wrap">
                        <img src={s.image} alt={s.title} className="kiosk-card-img" loading="lazy" />
                        <span className="kiosk-card-num font-mono">{`0${idx + 1}`}</span>
                      </div>
                      <div className="kiosk-card-info font-mono">
                        <span className="kiosk-card-title">{s.title}</span>
                        <p className="kiosk-card-desc">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="panel-media">
              <img
                src={project.propImage}
                alt={project.propAlt}
                className="panel-media-img"
                loading="lazy"
              />
              <div className="panel-media-reflection" />
            </div>
          )}

          {/* Summary Case Study */}
          <div className="panel-summary font-editorial">
            <p>{project.description}</p>
          </div>

          {/* Key Deliverables & Highlights */}
          <div className="panel-highlights-section">
            <h4 className="panel-subheading font-mono">
              <Sparkles size={13} />
              <span>KEY DELIVERABLES & SYSTEMS</span>
            </h4>
            <ul className="panel-highlights-list font-mono">
              {project.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Tools & Tech Chips */}
          <div className="panel-tools-row font-mono">
            {project.tools.map((t) => (
              <span key={t} className="panel-tool-tag">
                {t}
              </span>
            ))}
          </div>

          {/* Action CTA Button */}
          {project.externalUrl && (
            <div className="panel-actions">
              <a
                href={project.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="panel-cta font-mono"
                onClick={() => playBubblePop(560)}
              >
                <span>VISIT {project.actionLabel.toUpperCase()}</span>
                <ExternalLink size={13} style={{ marginLeft: '8px' }} />
              </a>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
