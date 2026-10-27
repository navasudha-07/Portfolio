import { useState, useEffect, useRef } from 'react'
import { tankProjects } from '../data/portfolioData'
import { playBubblePop } from '../utils/audioEngine'
import { Sparkles, ExternalLink, Layers } from 'lucide-react'
import RotatingKioskPresentation from './RotatingKioskPresentation'
import './TankShowcase.css'

// Spatial coordinate offsets for floating portfolio entities
const spatialLayout = [
  { id: 'kiwi-kiosk', top: 36, left: 32, depth: 1.15 },
  { id: 'expense-tracker', top: 20, left: 62, depth: 0.9 },
  { id: 'shms', top: 18, left: 40, depth: 0.75 },
  { id: 'transaction-history', top: 58, left: 22, depth: 0.85 },
  { id: 'digisailor-internship', top: 66, left: 64, depth: 0.9 },
  { id: 'budget-goals', top: 76, left: 36, depth: 0.8 },
  { id: 'mca-academic', top: 80, left: 66, depth: 0.65 },
]

export default function TankShowcase({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 })
  const stageRef = useRef(null)

  // Filter projects by category
  const filteredProjects =
    activeCategory === 'ALL'
      ? tankProjects
      : tankProjects.filter((p) => p.category === activeCategory)

  // Ensure index in bounds
  const safeIndex = selectedIndex >= filteredProjects.length ? 0 : selectedIndex
  const currentProject = filteredProjects[safeIndex] || filteredProjects[0]

  // Track cursor position across whole window for fluid 3D parallax
  useEffect(() => {
    let animId
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0

    const handleMouseMove = (e) => {
      // Normalized between -1 and 1
      targetX = (e.clientX / window.innerWidth - 0.5) * 2
      targetY = (e.clientY / window.innerHeight - 0.5) * 2
    }

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.08
      currentY += (targetY - currentY) * 0.08
      setMouseParallax({ x: currentX, y: currentY })
      animId = requestAnimationFrame(updateParallax)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    animId = requestAnimationFrame(updateParallax)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animId)
    }
  }, [])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % filteredProjects.length)
        playBubblePop(500)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        setSelectedIndex(
          (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
        )
        playBubblePop(500)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [filteredProjects.length])

  // Category select
  const handleCategorySelect = (cat) => {
    playBubblePop(480)
    setActiveCategory(cat)
    setSelectedIndex(0)
  }

  // Project select
  const handleProjectSelect = (idx) => {
    playBubblePop(520)
    setSelectedIndex(idx)
  }

  const categories = ['ALL', 'DESIGN', 'TECH', 'EXPERIENCE']

  return (
    <div ref={stageRef} className="tank-spatial-stage">
      {/* ── Spatial Floating Project Entities (Crechetank 3D field) ── */}
      <div className="tank-spatial-field" aria-hidden="true">
        {filteredProjects.map((p, i) => {
          const isSelected = i === safeIndex
          const layout = spatialLayout[i] || { top: 40 + i * 8, left: 40, depth: 0.8 }

          // Depth-based cursor parallax displacement
          const offsetX = mouseParallax.x * layout.depth * 28
          const offsetY = mouseParallax.y * layout.depth * 22

          return (
            <div
              key={p.id}
              className={`floating-tank-node ${isSelected ? 'is-active-node' : 'is-ambient-node'}`}
              style={{
                top: `${layout.top}%`,
                left: `${layout.left}%`,
                transform: `translate3d(${offsetX}px, ${offsetY}px, 0)`,
              }}
              onClick={() => handleProjectSelect(i)}
            >
              <h3 className="node-title font-editorial">
                {p.title}
              </h3>
            </div>
          )
        })}
      </div>

      {/* ── Center Active Showcase Display ── */}
      <div
        className="tank-center-stage"
        style={{
          transform: `translate3d(${mouseParallax.x * 12}px, ${mouseParallax.y * 10}px, 0)`,
        }}
      >
        {currentProject && (
          <div className="tank-active-project-card">
            {/* Title */}
            <h2 className="tank-project-title font-editorial">
              {currentProject.title}
            </h2>

            {/* Monospace Genre Badges */}
            <div className="tank-project-tags font-mono">
              {currentProject.genre.map((g, idx) => (
                <span key={g} className="tank-tag-item">
                  {g}
                  {idx < currentProject.genre.length - 1 && (
                    <span className="tag-separator">·</span>
                  )}
                </span>
              ))}
              <span className="tag-separator">·</span>
              <span className="tank-tag-year">{currentProject.year}</span>
            </div>

            {/* Evocative Headline */}
            <p className="tank-project-headline font-editorial">
              {currentProject.headline}
            </p>

            {/* Description */}
            <p className="tank-project-desc font-mono">
              {currentProject.description}
            </p>

            {/* Action CTA Row */}
            <div className="tank-project-actions">
              <button
                className="tank-pill-btn explore-btn"
                onClick={() => {
                  playBubblePop(600)
                  onSelectProject(currentProject)
                }}
                id={`explore-proj-${currentProject.id}`}
              >
                <Sparkles size={14} />
                <span>{currentProject.actionLabel}</span>
              </button>

              {currentProject.externalUrl && (
                <a
                  href={currentProject.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tank-pill-btn external-btn"
                  title="Visit external link"
                  onClick={(e) => {
                    e.stopPropagation()
                    playBubblePop(560)
                  }}
                >
                  <ExternalLink size={14} />
                  <span>Link</span>
                </a>
              )}
            </div>
          </div>
        )}

        {/* 3D Floating Prop Visual or Rotating Kiosk Presentation */}
        {currentProject && (
          currentProject.isKioskPresentation ? (
            <div className="tank-kiosk-showcase-wrapper">
              <RotatingKioskPresentation
                screens={currentProject.kioskScreens}
                title={currentProject.title}
                compact={true}
              />
            </div>
          ) : (
            <div
              className="tank-prop-container"
              style={{
                transform: `perspective(1000px) rotateY(${mouseParallax.x * 16}deg) rotateX(${-mouseParallax.y * 16}deg)`,
              }}
              onClick={() => {
                playBubblePop(600)
                onSelectProject(currentProject)
              }}
              title="Click to view full case study"
            >
              {/* Dynamic Cursor Light Sheen */}
              <div
                className="prop-cursor-glare"
                style={{
                  transform: `translate3d(${-mouseParallax.x * 30}px, ${-mouseParallax.y * 30}px, 0)`,
                }}
              />

              <img
                src={currentProject.propImage}
                alt={currentProject.propAlt}
                className="tank-prop-image"
                loading="eager"
              />

              <div className="prop-hover-cue font-mono">
                <Layers size={13} />
                <span>Inspect Case Study</span>
              </div>
            </div>
          )
        )}
      </div>

      {/* ── Right Sidebar: Crechetank Project Rail ── */}
      <aside className="tank-right-sidebar">
        {/* Category Filter Tabs */}
        <div className="category-filter-tabs font-mono">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-tab-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Vertical Project List with Line & Dot Rail */}
        <div className="vertical-project-list-container">
          <div className="timeline-rail" />

          <ul className="vertical-project-list font-mono">
            {filteredProjects.map((p, idx) => {
              const isSelected = idx === safeIndex
              return (
                <li
                  key={p.id}
                  className={`v-project-item ${isSelected ? 'active-item' : ''}`}
                  onClick={() => handleProjectSelect(idx)}
                >
                  {isSelected && <span className="active-rail-dot" />}
                  <span className="v-project-name">{p.title}</span>
                </li>
              )
            })}
          </ul>
        </div>

        {/* Counter: e.g. 01 / 06 */}
        <div className="project-counter-display font-mono">
          <span>{String(safeIndex + 1).padStart(2, '0')}</span>
          <span className="counter-divider">/</span>
          <span>{String(filteredProjects.length).padStart(2, '0')}</span>
        </div>
      </aside>
    </div>
  )
}
