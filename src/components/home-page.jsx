"use client"
import "./home-page.css"

export default function HomePage({ onShowLogin }) {
  // Mock featured manga data
  const featuredMangas = [
    {
      id: 1,
      title: "Epic Adventure",
      creators: ["Alex", "Maria", "John"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "A thrilling journey through mystical lands",
    },
    {
      id: 2,
      title: "Space Warriors",
      creators: ["Sarah", "Mike"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Intergalactic battles and cosmic adventures",
    },
    {
      id: 3,
      title: "Magic School",
      creators: ["Emma", "David", "Lisa", "Tom"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Young wizards learning the art of magic",
    },
    {
      id: 4,
      title: "Cyber Punk",
      creators: ["Jake", "Nina"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Futuristic world of technology and rebellion",
    },
    {
      id: 5,
      title: "Dragon Quest",
      creators: ["Chris", "Anna", "Ben"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Ancient dragons and brave heroes",
    },
    {
      id: 6,
      title: "Ocean Depths",
      creators: ["Zoe", "Max"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Underwater mysteries and sea creatures",
    },
  ]

  return (
    <div className="home-page">
      {/* Navigation */}
      <nav className="home-navbar">
        <div className="navbar-content">
          <div className="navbar-brand">
            <h2>MANGA 雲</h2>
          </div>
          <button className="login-btn" onClick={onShowLogin}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img src="/images/manga-hero.png" alt="Manga characters background" />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <h1>Create Amazing Manga Together</h1>
            <p>
              Join the ultimate collaborative manga creation platform. Work with friends, get AI-powered story
              suggestions, and bring your imagination to life through beautiful artwork.
            </p>
            <button className="cta-button" onClick={onShowLogin}>
              Start Creating
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <div className="about-content">
          <h2>How MangaForge Works</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Collaborate</h3>
              <p>Invite friends to create manga together. Each member contributes their unique artistic style.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3>AI-Powered Stories</h3>
              <p>Get creative story suggestions from our AI assistant to spark your imagination.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Digital Drawing</h3>
              <p>Use our intuitive drawing tools with brushes, stickers, and text to create stunning pages.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📚</div>
              <h3>Share & Publish</h3>
              <p>Showcase your completed manga to the community and download your creations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Manga Section */}
      <section className="featured-section">
        <div className="featured-content">
          <h2>Community Creations</h2>
          <p>Discover amazing manga created by our talented community</p>
          <div className="manga-showcase">
            {featuredMangas.map((manga) => (
              <div key={manga.id} className="showcase-card">
                <div className="showcase-thumbnail">
                  <img src={manga.thumbnail || "/placeholder.svg"} alt={manga.title} />
                </div>
                <div className="showcase-info">
                  <h3>{manga.title}</h3>
                  <p className="creators">By: {manga.creators.join(", ")}</p>
                  <p className="description">{manga.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Create Your First Manga?</h2>
          <p>Join thousands of creators and start your manga journey today!</p>
          <button className="cta-button large" onClick={onShowLogin}>
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>MANGA 雲</h3>
            <p>Collaborative manga creation platform</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Platform</h4>
              <a href="#features">Features</a>
              <a href="#community">Community</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="link-group">
              <h4>Support</h4>
              <a href="#help">Help Center</a>
              <a href="#contact">Contact</a>
              <a href="#tutorials">Tutorials</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
