import { useEffect } from 'react'
import { playBubblePop } from '../utils/audioEngine'
import { X, ExternalLink, CheckCircle2, Sparkles, Code2, Smartphone } from 'lucide-react'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        playBubblePop(450)
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  if (!project) return null

  return (
    <div className="project-modal-backdrop" onClick={onClose}>
      <div
        className="project-modal-card tank-glass-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={() => {
            playBubblePop(450)
            onClose()
          }}
          aria-label="Close Project Details"
        >
          <X size={18} />
        </button>

        {/* Modal Content Layout */}
        <div className="modal-content-grid">
          {/* Visual Prop Showcase */}
          <div className="modal-visual-column">
            <div className="modal-image-wrapper">
              <img
                src={project.propImage}
                alt={project.propAlt}
                className="modal-prop-img"
              />
              <div className="modal-water-glare" />
            </div>
            <div className="modal-tech-pills font-mono">
              {project.tools.map((t) => (
                <span key={t} className="tech-pill">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Details Column */}
          <div className="modal-details-column">
            <div className="modal-header-info">
              <span className="modal-number font-mono">{project.number}</span>
              <div className="modal-genre-row font-mono">
                {project.genre.join(' · ')} · {project.year}
              </div>
            </div>

            <h2 className="modal-title font-editorial">{project.title}</h2>
            <p className="modal-headline font-editorial">{project.headline}</p>

            <div className="modal-divider" />

            <div className="modal-section">
              <h4 className="modal-section-title font-mono">
                <Sparkles size={14} /> OVERVIEW & UX APPROACH
              </h4>
              <p className="modal-desc font-mono">{project.description}</p>
            </div>

            <div className="modal-section">
              <h4 className="modal-section-title font-mono">
                <CheckCircle2 size={14} /> KEY DELIVERABLES & HIGHLIGHTS
              </h4>
              <ul className="modal-highlights-list font-mono">
                {project.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="modal-actions-row">
              {project.externalUrl && (
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tank-pill-btn modal-external-btn"
                  onClick={() => playBubblePop(550)}
                >
                  <ExternalLink size={15} />
                  <span>Open Project Link</span>
                </a>
              )}
              <button
                className="tank-pill-btn modal-dismiss-btn"
                onClick={() => {
                  playBubblePop(450)
                  onClose()
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
