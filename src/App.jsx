import { useState } from 'react'
import TankBackground from './components/TankBackground'
import SplashEnter from './components/SplashEnter'
import TankHeader from './components/TankHeader'
import TankShowcase from './components/TankShowcase'
import WhatsMoreView from './components/WhatsMoreView'
import TankCreatures from './components/TankCreatures'
import TankFooter from './components/TankFooter'
import ProjectPanel from './components/ProjectPanel'
import DollSelectorModal from './components/DollSelectorModal'
import CustomCursor from './components/CustomCursor'
import { availableDolls } from './data/portfolioData'
import './index.css'

export default function App() {
  const [hasEntered, setHasEntered] = useState(false)
  const [currentView, setCurrentView] = useState('tank') // 'tank' | 'more'
  const [panelProject, setPanelProject] = useState(null)
  const [isPanelOpen, setIsPanelOpen] = useState(false)
  const [isDollModalOpen, setIsDollModalOpen] = useState(false)

  // Replaceable companion dolls state with localStorage persistence
  const [doll1, setDoll1] = useState(() => {
    try {
      const saved = localStorage.getItem('tank_doll_slot1')
      return saved ? JSON.parse(saved) : availableDolls[0]
    } catch {
      return availableDolls[0]
    }
  })

  const [doll2, setDoll2] = useState(() => {
    try {
      const saved = localStorage.getItem('tank_doll_slot2')
      return saved ? JSON.parse(saved) : availableDolls[1]
    } catch {
      return availableDolls[1]
    }
  })

  const handleSelectDoll1 = (newDoll) => {
    setDoll1(newDoll)
    try {
      localStorage.setItem('tank_doll_slot1', JSON.stringify(newDoll))
    } catch (err) {
      console.warn('Failed to save doll1:', err)
    }
  }

  const handleSelectDoll2 = (newDoll) => {
    setDoll2(newDoll)
    try {
      localStorage.setItem('tank_doll_slot2', JSON.stringify(newDoll))
    } catch (err) {
      console.warn('Failed to save doll2:', err)
    }
  }

  const handleViewToggle = () => {
    setCurrentView((prev) => (prev === 'tank' ? 'more' : 'tank'))
  }

  const handleOpenProject = (project) => {
    setPanelProject(project)
    setIsPanelOpen(true)
  }

  const handleCloseProject = () => {
    setIsPanelOpen(false)
  }

  return (
    <div className="tank-portfolio-app">
      {/* Crechetank Fluid Interactive Cursor & Aquatic Bubble Stream */}
      <CustomCursor />

      {/* Dynamic Aquarium Water, Caustics & Glass Refraction Layer */}
      <TankBackground />

      {/* Opening Splash Screen (Crechetank 1:1 Entrance) */}
      {!hasEntered && (
        <SplashEnter onEnter={() => setHasEntered(true)} />
      )}

      {/* Main Tank Experience (Revealed upon Enter) */}
      {hasEntered && (
        <>
          {/* Top Bar Header with Echo Logo & Crechetank Lens Nav Toggle */}
          <TankHeader
            currentView={currentView}
            onViewToggle={handleViewToggle}
            onNavigate={(view) => setCurrentView(view)}
          />

          {/* Primary View Area */}
          <main className="tank-main-viewport">
            {currentView === 'tank' ? (
              <TankShowcase onSelectProject={handleOpenProject} />
            ) : (
              <WhatsMoreView onClose={() => setCurrentView('tank')} />
            )}
          </main>

          {/* Bottom Left Replaceable Dolls with Cursor Eye-Tracking & Swap Button */}
          <TankCreatures
            currentView={currentView}
            doll1={doll1}
            doll2={doll2}
            onOpenDollSelector={() => setIsDollModalOpen(true)}
          />

          {/* Bottom Bar with Brand line & Equalizer Web Audio Synthesizer */}
          <TankFooter />

          {/* Crechetank Slide-in 66vw Project Case Study Sheet */}
          <ProjectPanel
            project={panelProject}
            isOpen={isPanelOpen}
            onClose={handleCloseProject}
          />

          {/* Replaceable Dolls Modal Selector & Custom Image Uploader */}
          <DollSelectorModal
            isOpen={isDollModalOpen}
            onClose={() => setIsDollModalOpen(false)}
            doll1={doll1}
            doll2={doll2}
            onSelectDoll1={handleSelectDoll1}
            onSelectDoll2={handleSelectDoll2}
          />
        </>
      )}
    </div>
  )
}
