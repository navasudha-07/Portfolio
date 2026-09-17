import './index.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'

const BouncingDots = () => {
  return (
    <div className="dots-container">
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className="bouncing-dot" style={{
          left: `${Math.random() * 100}vw`,
          top: `${Math.random() * 100}vh`,
          animationDuration: `${3 + Math.random() * 4}s`,
          animationDelay: `${Math.random() * 2}s`,
          transform: `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px)`
        }} />
      ))}
    </div>
  )
}

function App() {
  return (
    <>
      {/* Bouncing radiant white small dots overlay */}
      <BouncingDots />

      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
