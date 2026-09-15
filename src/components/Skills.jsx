import { motion } from 'framer-motion'
import { Palette, Globe, Zap, Users } from 'lucide-react'
import { skills } from '../data/portfolioData'
import './Skills.css'

const categoryMeta = {
  design:      { label: 'Design', icon: Palette, color: '#c77dff' },
  web:         { label: 'Web',    icon: Globe,   color: '#00b4d8' },
  productivity:{ label: 'Tools',  icon: Zap,     color: '#f72585' },
  general:     { label: 'General',icon: Zap,     color: '#f4a261' },
  soft:        { label: 'Soft',   icon: Users,   color: '#06d6a0' },
}

export default function Skills() {
  const grouped = skills.reduce((acc, s) => {
    const g = s.category
    if (!acc[g]) acc[g] = []
    acc[g].push(s)
    return acc
  }, {})

  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65 }}
        >
          <p className="section-label">Skills</p>
          <h2 className="section-title">What I Work With</h2>
          <p className="section-subtitle">A toolkit built for creating user-centred digital experiences.</p>
        </motion.div>

        {/* Highlight skills */}
        <div className="skills-highlights">
          {skills.filter(s => s.highlight).map((skill, i) => (
            <motion.div
              key={skill.name}
              className="skill-highlight glass-card"
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="sh-icon" style={{ '--skill-color': categoryMeta[skill.category]?.color || 'var(--accent-2)' }}>
                {skill.name[0]}
              </div>
              <div>
                <div className="sh-name">{skill.name}</div>
                <div className="sh-desc">{skill.description}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skill groups */}
        <div className="skill-groups">
          {Object.entries(grouped).map(([cat, items], gi) => {
            const meta = categoryMeta[cat] || { label: cat, color: 'var(--accent-2)' }
            return (
              <motion.div
                key={cat}
                className="skill-group glass-card"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: gi * 0.08 }}
              >
                <div className="sg-label" style={{ color: meta.color }}>{meta.label}</div>
                <div className="sg-tags">
                  {items.map(s => (
                    <span key={s.name} className="skill-tag" style={{ '--skill-color': meta.color }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
