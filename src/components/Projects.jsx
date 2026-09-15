import { motion } from 'framer-motion'
import { ExternalLink, Code } from 'lucide-react'
import { projects, designProjects } from '../data/portfolioData'
import './Projects.css'

export default function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label">Projects</p>
          <h2 className="section-title">Things I&apos;ve Built &amp; Designed</h2>
          <p className="section-subtitle">From sensor-based monitoring systems to polished mobile interfaces.</p>
        </motion.div>

        {/* Dev Projects */}
        <h3 className="proj-category-label"><Code size={16} /> Development Projects</h3>
        <div className="dev-projects">
          {projects.map((proj, i) => (
            <motion.div
              key={proj.id}
              className="dev-card glass-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Color accent bar */}
              <div className="dev-accent-bar" style={{ background: proj.color }} />

              <div className="dev-card-body">
                <div className="dev-header">
                  <h3 className="dev-title">{proj.title}</h3>
                  <span className="dev-short">{proj.shortTitle}</span>
                </div>
                <p className="dev-desc">{proj.description}</p>

                <ul className="dev-highlights">
                  {proj.highlights.map((h, hi) => (
                    <li key={hi}>{h}</li>
                  ))}
                </ul>

                <div className="dev-footer">
                  <div className="dev-tech">
                    {proj.tech.map(t => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Design Projects */}
        <h3 className="proj-category-label" style={{ marginTop: '48px' }}>
          <span style={{ fontSize: '1rem' }}>🎨</span> Design Projects
        </h3>
        <div className="design-projects">
          {designProjects.map((proj, i) => (
            <motion.div
              key={proj.id}
              className="design-card glass-card"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              {/* Mock phone screen placeholder */}
              <div className="design-preview">
                <div className="phone-mock">
                  <div className="phone-notch" />
                  <div className="phone-screen">
                    <div className="screen-shimmer" />
                    <span className="screen-label">{proj.title.split(' ')[0]}</span>
                  </div>
                </div>
              </div>
              <div className="design-info">
                <h3 className="design-title">{proj.title}</h3>
                <p className="design-desc">{proj.description}</p>
                <span className="tag">Figma</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
