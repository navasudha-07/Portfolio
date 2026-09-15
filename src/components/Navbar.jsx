import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { personal, navLinks } from '../data/portfolioData'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const sections = navLinks.map(l => l.href.replace('#', ''))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = (href) => {
    setOpen(false)
    const id = href.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`navbar${scrolled ? ' scrolled' : ''}`} role="banner">
      <div className="container nav-inner">
        {/* Logo */}
        <a href="#home" className="nav-logo" onClick={() => handleLink('#home')} aria-label="Go to home">
          <span className="logo-dot" aria-hidden="true" />
          <span className="logo-name">{personal.firstName}</span>
        </a>

        {/* Desktop links */}
        <nav className="nav-links" role="navigation" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => (
            <button
              key={href}
              className={`nav-link${active === href.replace('#', '') ? ' active' : ''}`}
              onClick={() => handleLink(href)}
              type="button"
            >
              {label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <a
          href={`mailto:${personal.email}`}
          className="btn btn-primary nav-cta"
          id="nav-contact-btn"
        >
          Hire Me
        </a>

        {/* Hamburger */}
        <button
          className="nav-hamburger"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          type="button"
          id="hamburger-btn"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`mobile-menu${open ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
        {navLinks.map(({ label, href }) => (
          <button
            key={href}
            className={`mobile-link${active === href.replace('#', '') ? ' active' : ''}`}
            onClick={() => handleLink(href)}
            type="button"
          >
            {label}
          </button>
        ))}
        <a
          href={`mailto:${personal.email}`}
          className="btn btn-primary mobile-cta"
          onClick={() => setOpen(false)}
        >
          Hire Me
        </a>
      </div>
    </header>
  )
}
