import { motion } from 'framer-motion'
import { ArrowRight, GitFork, Globe, Sparkles } from 'lucide-react'
import { personal } from '../data/portfolioData'
import './Hero.css'

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function Hero() {
  return (
    <section id="home" className="hero-section">
      {/* Ambient background blobs */}
      <div className="hero-blob hero-blob-1" aria-hidden="true" />
      <div className="hero-blob hero-blob-2" aria-hidden="true" />
      <div className="hero-blob hero-blob-3" aria-hidden="true" />

      <div className="container hero-inner">
        {/* Badge */}
        <motion.div className="hero-badge" {...fade(0.1)}>
          <Sparkles size={13} />
          <span>Available for new opportunities</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 className="hero-title" {...fade(0.22)}>
          Hi, I&apos;m{' '}
          <span className="grad-text">{personal.firstName}</span>
        </motion.h1>

        <motion.p className="hero-role" {...fade(0.32)}>
          {personal.role}
        </motion.p>

        <motion.p className="hero-tagline" {...fade(0.42)}>
          {personal.tagline}
        </motion.p>

        {/* CTA row */}
        <motion.div className="hero-actions" {...fade(0.52)}>
          <a
            href={`mailto:${personal.email}`}
            className="btn btn-primary"
            id="hero-hire-btn"
          >
            Let&apos;s Talk <ArrowRight size={16} />
          </a>
          <a
            href="#projects"
            className="btn btn-outline"
            id="hero-projects-btn"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            View Work
          </a>
        </motion.div>

        {/* Social links */}
        <motion.div className="hero-socials" {...fade(0.62)}>
          <a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill"
            id="hero-linkedin"
            aria-label="LinkedIn Profile"
          >
            <Globe size={15} />
            <span>LinkedIn</span>
          </a>
          <a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="social-pill"
            id="hero-github"
            aria-label="GitHub Profile"
          >
            <GitFork size={15} />
            <span>GitHub</span>
          </a>
        </motion.div>

        {/* Scroll cue */}
        <motion.div className="scroll-cue" {...fade(0.8)} aria-hidden="true">
          <div className="scroll-line" />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}
