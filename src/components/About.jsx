import { motion } from 'framer-motion'
import { GraduationCap, MapPin, Mail, Phone, Calendar, ExternalLink } from 'lucide-react'
import { personal, education } from '../data/portfolioData'
import './About.css'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <motion.div {...fadeUp(0)}>
          <p className="section-label">About Me</p>
          <h2 className="section-title">Crafting Experiences, <br /><span className="grad-text">Not Just Interfaces</span></h2>
          <p className="section-subtitle">{personal.summary}</p>
        </motion.div>

        <div className="about-grid">
          {/* Extra Content */}
          <motion.div className="glass-card about-card about-card-wide" style={{ padding: '2rem' }} {...fadeUp(0.1)}>
            <p style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>{personal.extraContent}</p>
          </motion.div>

          {/* Education */}
          <motion.div className="glass-card about-card about-card-wide" {...fadeUp(0.2)}>
            <h3 className="about-card-title"><GraduationCap size={17} /> Education</h3>
            <div className="edu-timeline">
              {education.map((edu, i) => (
                <div key={i} className={`edu-item${edu.current ? ' current' : ''}`}>
                  <div className="edu-dot" />
                  <div className="edu-body">
                    <div className="edu-degree">{edu.degree}</div>
                    <div className="edu-institution">{edu.institution}</div>
                    {edu.university && <div className="edu-university">{edu.university}</div>}
                    <div className="edu-meta">
                      <span><Calendar size={12} /> {edu.period}</span>
                      {edu.current && <span className="edu-current-badge">Current</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
