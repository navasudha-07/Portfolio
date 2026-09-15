import { motion } from 'framer-motion'
import { Briefcase, ExternalLink, CheckCircle } from 'lucide-react'
import { experience, certifications } from '../data/portfolioData'
import './Experience.css'

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I&apos;ve Worked</h2>
          <p className="section-subtitle">Real-world experience shaping my design thinking and craft.</p>
        </motion.div>

        <div className="exp-grid">
          {/* Experience timeline */}
          <div className="exp-timeline">
            {experience.map((exp, i) => (
              <motion.div
                key={i}
                className="exp-card glass-card"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="exp-icon-wrap">
                  <Briefcase size={18} />
                </div>
                <div className="exp-content">
                  <div className="exp-header">
                    <div>
                      <h3 className="exp-title">{exp.title}</h3>
                      <div className="exp-company">
                        <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" id={`exp-company-${i}`}>
                          {exp.company} <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                    <span className="tag">{exp.type}</span>
                  </div>

                  <ul className="exp-responsibilities">
                    {exp.responsibilities.map((r, ri) => (
                      <li key={ri}>
                        <CheckCircle size={14} className="check-icon" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications */}
          <div className="certs-col">
            <h3 className="certs-heading">Certifications</h3>
            {certifications.map((cert, i) => (
              <motion.a
                key={i}
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-card glass-card"
                id={`cert-${i}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <div className="cert-badge">🏅</div>
                <div className="cert-body">
                  <div className="cert-title">{cert.title}</div>
                  <div className="cert-issuer">{cert.issuer}</div>
                </div>
                <ExternalLink size={14} className="cert-arrow" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
