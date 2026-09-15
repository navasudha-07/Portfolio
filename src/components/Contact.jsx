import { motion } from 'framer-motion'
import { Mail, Phone, Globe, GitFork, Send } from 'lucide-react'
import { personal } from '../data/portfolioData'
import './Contact.css'

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <motion.div
          className="contact-inner"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          {/* Left */}
          <div className="contact-left">
            <p className="section-label">Contact</p>
            <h2 className="section-title">
              Let&apos;s Work <br /><span className="grad-text">Together</span>
            </h2>
            <p className="contact-desc">
              I&apos;m actively looking for UI/UX opportunities. Whether you have a project in mind or just want to chat, my inbox is always open.
            </p>

            <div className="contact-links">
              <a href={`mailto:${personal.email}`} className="contact-link" id="contact-email">
                <div className="cl-icon"><Mail size={18} /></div>
                <div>
                  <div className="cl-label">Email</div>
                  <div className="cl-value">{personal.email}</div>
                </div>
              </a>
              <a href={`tel:${personal.phone}`} className="contact-link" id="contact-phone">
                <div className="cl-icon"><Phone size={18} /></div>
                <div>
                  <div className="cl-label">Phone</div>
                  <div className="cl-value">{personal.phone}</div>
                </div>
              </a>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-li">
                <div className="cl-icon"><Globe size={18} /></div>
                <div>
                  <div className="cl-label">LinkedIn</div>
                  <div className="cl-value">{personal.linkedinHandle}</div>
                </div>
              </a>
              <a href={personal.github} target="_blank" rel="noopener noreferrer" className="contact-link" id="contact-gh">
                <div className="cl-icon"><GitFork size={18} /></div>
                <div>
                  <div className="cl-label">GitHub</div>
                  <div className="cl-value">{personal.githubHandle}</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — CTA card */}
          <motion.div
            className="glass-card contact-cta-card"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, delay: 0.15 }}
          >
            <div className="cta-glow" aria-hidden="true" />
            <div className="cta-body">
              <h3 className="cta-title">Open to Work</h3>
              <p className="cta-text">
                Seeking UI/UX Design roles where I can craft meaningful digital experiences and grow my skills alongside a passionate team.
              </p>
              <a
                href={`mailto:${personal.email}`}
                className="btn btn-primary cta-btn"
                id="contact-hire-btn"
              >
                <Send size={16} />
                Send a Message
              </a>
              <p className="cta-note">Usually responds within 24 hours</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
