"use client"
import "../App.css"

export default function FinalManga({ story }) {
  // Mock manga pages
  const pages = [
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
  ]

  return (
    <div className="final-manga">
      <h2>Your Completed Manga!</h2>

      <div className="story-summary">
        <h3>Story:</h3>
        <p>{story}</p>
      </div>

      <div className="manga-pages">
        {pages.map((page, index) => (
          <div key={index} className="manga-page">
            <h4>Page {index + 1}</h4>
            <img src={page || "/placeholder.svg"} alt={`Manga page ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="manga-actions">
        <button className="download-btn">Download Manga</button>
        <button className="share-btn">Share</button>
      </div>
    </div>
  )
}
