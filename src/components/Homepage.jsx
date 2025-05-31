"use client"
import "../App.css"
import { useState } from "react"
import Navbar from "./Navbar"

export default function Homepage({ user, onLogout, onNavigate }) {
  const [feedMangas] = useState([
    {
      id: 1,
      title: "Dragon's Quest",
      author: "ArtistMike",
      likes: 245,
      views: 1200,
      thumbnail: "/placeholder.svg?height=200&width=150",
      tags: ["Fantasy", "Adventure"],
      createdAt: "2 days ago",
    },
    {
      id: 2,
      title: "Space Odyssey",
      author: "CosmicArt",
      likes: 189,
      views: 890,
      thumbnail: "/placeholder.svg?height=200&width=150",
      tags: ["Sci-Fi", "Action"],
      createdAt: "1 week ago",
    },
    {
      id: 3,
      title: "School Days",
      author: "MangaLover",
      likes: 156,
      views: 670,
      thumbnail: "/placeholder.svg?height=200&width=150",
      tags: ["Romance", "Comedy"],
      createdAt: "3 days ago",
    },
    {
      id: 4,
      title: "Ninja Chronicles",
      author: "ShadowDraw",
      likes: 298,
      views: 1500,
      thumbnail: "/placeholder.svg?height=200&width=150",
      tags: ["Action", "Historical"],
      createdAt: "5 days ago",
    },
    {
      id: 5,
      title: "Magic Academy",
      author: "WizardPen",
      likes: 203,
      views: 980,
      thumbnail: "/placeholder.svg?height=200&width=150",
      tags: ["Fantasy", "School"],
      createdAt: "1 day ago",
    },
    {
      id: 6,
      title: "Cyber Punk 2099",
      author: "FutureVision",
      likes: 167,
      views: 750,
      thumbnail: "/placeholder.svg?height=200&width=150",
      tags: ["Cyberpunk", "Thriller"],
      createdAt: "4 days ago",
    },
  ])

  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("recent")

  const filteredMangas = feedMangas.filter((manga) => {
    if (filter === "all") return true
    return manga.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase())
  })

  const sortedMangas = [...filteredMangas].sort((a, b) => {
    if (sortBy === "popular") return b.likes - a.likes
    if (sortBy === "views") return b.views - a.views
    return 0 // recent is default order
  })

  return (
    <div className="homepage">
      <Navbar user={user} onLogout={onLogout} onNavigate={onNavigate} currentView="homepage" />

      <div className="homepage-content">
        <div className="hero-section">
          <h1>Discover Amazing Collaborative Manga</h1>
          <p>Explore manga created by our community of artists and storytellers</p>
        </div>

        <div className="feed-controls">
          <div className="filter-section">
            <label>Filter by genre:</label>
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Genres</option>
              <option value="fantasy">Fantasy</option>
              <option value="sci-fi">Sci-Fi</option>
              <option value="romance">Romance</option>
              <option value="action">Action</option>
              <option value="comedy">Comedy</option>
              <option value="historical">Historical</option>
              <option value="cyberpunk">Cyberpunk</option>
              <option value="school">School</option>
              <option value="thriller">Thriller</option>
            </select>
          </div>

          <div className="sort-section">
            <label>Sort by:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="recent">Most Recent</option>
              <option value="popular">Most Liked</option>
              <option value="views">Most Viewed</option>
            </select>
          </div>
        </div>

        <div className="manga-feed">
          {sortedMangas.map((manga) => (
            <div key={manga.id} className="feed-card">
              <div className="feed-thumbnail">
                <img src={manga.thumbnail || "/placeholder.svg"} alt={manga.title} />
                <div className="overlay">
                  <button className="read-btn">Read</button>
                </div>
              </div>

              <div className="feed-info">
                <h3>{manga.title}</h3>
                <p className="author">by {manga.author}</p>

                <div className="tags">
                  {manga.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="stats">
                  <span className="likes">❤️ {manga.likes}</span>
                  <span className="views">👁️ {manga.views}</span>
                  <span className="date">{manga.createdAt}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
