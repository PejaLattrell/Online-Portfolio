import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="App">
      {/* Header */}
      <header className="header">
        <h1 className="logo">Peja Lattrell A. Escares</h1>
        <nav>
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <img
          src="" 
          alt="Profile"
          className="profile-img"
        />
        <h2>Hello, I'm Peja 👋</h2>
        <p>A passionate Computer Science student aspiring to become a Data Engineer / DevOps Engineer.</p>
        <a href="#projects" className="btn">View My Work</a>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>Projects</h2>
        <div className="project-list">
          <div className="project-card">
            <h3>Smart Reusable Water Bottle</h3>
            <p>Designed a UV-C smart bottle that purifies water and reduces plastic waste in the Philippines.</p>
          </div>
          <div className="project-card">
            <h3>Portfolio Website</h3>
            <p>Built with React + TypeScript to showcase my skills and experience.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Contact Me</h2>
        <p>Email: <a href="mailto:pejalattrell@example.com">pejalattrell@example.com</a></p>
        <p>GitHub: <a href="https://github.com/yourusername" target="_blank">github.com/yourusername</a></p>
      </section>

      {/* Footer */}
      <footer>
        <p>© {new Date().getFullYear()} Peja Lattrell. All rights reserved.</p>
      </footer>
    </div>
    </>
  )
}

export default App
