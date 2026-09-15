import { GitFork, Globe, Mail } from 'lucide-react'
import { personal } from '../data/portfolioData'
import './Footer.css'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="footer-logo-dot" aria-hidden="true" />
          <span className="footer-name">{personal.name}</span>
        </div>

        <p className="footer-role">{personal.role}</p>

        <div className="footer-socials">
          <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" id="footer-linkedin">
          <Globe size={18} />
          </a>
          <a href={personal.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" id="footer-github">
          <GitFork size={18} />
          </a>
          <a href={`mailto:${personal.email}`} aria-label="Email" id="footer-email">
            <Mail size={18} />
          </a>
        </div>

        <p className="footer-copy">© {year} {personal.name}. Designed with 💜</p>
      </div>
    </footer>
  )
}
