import { useState } from 'react'
import './App.css'

const API_URL = import.meta.env.MODE === 'production' 
  ? 'https://your-api-endpoint.com/api/contact'  // Or remove this line entirely
  : 'http://localhost:5000/api/contact'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [status, setStatus] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    alert('Contact form is currently disabled')
    // Remove the fetch call
  }

  return (
    <>
      <div className="App">
      {/* Header */}
      <header className="header">
        <h1 className="logo">Welcome!🤫</h1>
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
        <img src="/images/photo_me.jpeg" 
          alt="My Profile"
          className="profile-img"
        />
        <div className="hero-text-content">
          <h2 className="greetings">Hello, I'm Peja 👋</h2>
          <p>A passionate Computer Science student aspiring to become a Data Engineer / DevOps Engineer.</p>
          <a href="#projects" className="btn">View My Work</a>
        </div>

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
        <p>Email: <a href="mailto:lattrellp@gmail.com">lattrellp@gmail.com</a></p>
        <p>GitHub: <a href="https://github.com/pejalattrell" target="_blank">My Github Account</a></p>
        
        <div className="contact-form-container">
          <h3>Send me a message</h3>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your message here..."
              />
            </div>
            
            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
            
            {status && (
              <div className={`status-message ${status.includes('Error') ? 'error' : 'success'}`}>
                {status}
              </div>
            )}
          </form>
        </div>
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

