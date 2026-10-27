import { useState } from 'react'
import { personal, education, experience, skills, contactPearls } from '../data/portfolioData'
import { playBubblePop } from '../utils/audioEngine'
import { GraduationCap, Briefcase, Sparkles, Copy, Check, ExternalLink } from 'lucide-react'
import './WhatsMoreView.css'

export default function WhatsMoreView({ onClose }) {
  const [copiedId, setCopiedId] = useState(null)

  const handlePearlClick = (pearl) => {
    playBubblePop(560)
    if (pearl.id === 'email') {
      navigator.clipboard?.writeText(pearl.value)
      setCopiedId('email')
      setTimeout(() => setCopiedId(null), 2000)
    }
  }

  return (
    <div className="whats-more-container">
      {/* Top Section Header */}
      <div className="whats-more-header">
        <h1 className="whats-more-title font-editorial">
          What&apos;s More
        </h1>
        <p className="whats-more-lead font-mono">
          {personal.tagline}
        </p>
      </div>

      {/* Floating Contact Pearls Stream */}
      <div className="pearls-stream-container">
        {contactPearls.map((pearl, idx) => (
          <a
            key={pearl.id}
            href={pearl.href}
            target={pearl.href.startsWith('http') ? '_blank' : '_self'}
            rel="noopener noreferrer"
            className="contact-pearl"
            style={{
              '--pearl-glow': pearl.ambient,
              backgroundColor: pearl.ambient,
              animationDelay: `${idx * 0.4}s`,
            }}
            onClick={() => handlePearlClick(pearl)}
            title={pearl.hint}
          >
            <span className="contact-pearl-label">{pearl.label}</span>
            {copiedId === pearl.id && (
              <span className="pearl-copied-toast font-mono">Copied!</span>
            )}
          </a>
        ))}
      </div>

      {/* Grid of Frosted Glass Bio & Credential Cards */}
      <div className="whats-more-grid">
        {/* Personal Statement Card */}
        <div className="tank-glass-card wm-card bio-card">
          <div className="wm-card-header">
            <Sparkles size={16} className="card-accent-icon" />
            <h3 className="wm-card-title font-mono">ABOUT NAVA SUDHA</h3>
          </div>
          <p className="bio-summary font-editorial">
            &ldquo;{personal.summary}&rdquo;
          </p>
          <p className="bio-extra font-mono">
            {personal.extraContent}
          </p>
          <div className="bio-badges">
            <span className="bio-badge">UI/UX Prototyping</span>
            <span className="bio-badge">Visual Hierarchy</span>
            <span className="bio-badge">Python Analytics</span>
            <span className="bio-badge">MCA Scholar</span>
          </div>
        </div>

        {/* Experience & Internship Card */}
        <div className="tank-glass-card wm-card exp-card">
          <div className="wm-card-header">
            <Briefcase size={16} className="card-accent-icon" />
            <h3 className="wm-card-title font-mono">EXPERIENCE & INTERNSHIP</h3>
          </div>
          {experience.map((exp, i) => (
            <div key={i} className="wm-exp-item">
              <div className="wm-exp-top">
                <h4 className="wm-role font-editorial">{exp.title}</h4>
                <a
                  href={exp.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wm-company font-mono"
                >
                  {exp.company} <ExternalLink size={12} />
                </a>
              </div>
              <p className="wm-exp-meta font-mono">{exp.period} · {exp.type}</p>
              <ul className="wm-exp-bullets font-mono">
                {exp.responsibilities.map((r, ri) => (
                  <li key={ri}>{r}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Education Journey Card */}
        <div className="tank-glass-card wm-card edu-card">
          <div className="wm-card-header">
            <GraduationCap size={16} className="card-accent-icon" />
            <h3 className="wm-card-title font-mono">EDUCATION JOURNEY</h3>
          </div>
          <div className="wm-edu-timeline">
            {education.map((edu, i) => (
              <div key={i} className="wm-edu-item">
                <div className="wm-edu-dot" />
                <div className="wm-edu-content">
                  <h4 className="wm-degree font-editorial">{edu.degree}</h4>
                  <p className="wm-institution font-mono">{edu.institution}</p>
                  {edu.university && <p className="wm-sub-uni font-mono">{edu.university}</p>}
                  <p className="wm-period font-mono">{edu.period} {edu.current ? '· Current' : ''}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Design & Tech Toolkit Card */}
        <div className="tank-glass-card wm-card skills-card">
          <div className="wm-card-header">
            <Sparkles size={16} className="card-accent-icon" />
            <h3 className="wm-card-title font-mono">CORE TOOLKIT</h3>
          </div>
          <div className="wm-skills-flex font-mono">
            {skills.map((s) => (
              <div key={s.name} className="wm-skill-pill">
                <span className="skill-dot" />
                <span className="skill-name">{s.name}</span>
                <span className="skill-desc">{s.description}</span>
              </div>
            ))}
          </div>

          <div className="wm-contact-action-bar">
            <a
              href={`mailto:${personal.email}`}
              className="tank-pill-btn wm-email-btn"
              onClick={() => playBubblePop(520)}
            >
              <span>Email: {personal.email}</span>
            </a>
            <button
              className="tank-pill-btn wm-copy-btn"
              onClick={() => {
                navigator.clipboard?.writeText(personal.email)
                setCopiedId('email-btn')
                playBubblePop(620)
                setTimeout(() => setCopiedId(null), 2000)
              }}
              title="Copy email to clipboard"
            >
              {copiedId === 'email-btn' ? <Check size={14} /> : <Copy size={14} />}
              <span>{copiedId === 'email-btn' ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
