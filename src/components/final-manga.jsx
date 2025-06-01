"use client"

import "./final-manga.css"

export default function FinalManga({ room, onBackToDashboard }) {
  // Mock manga pages data
const mangaPages = [
  { id: 1, image: "/images/manga1.jpeg", artist: "User1" },
  { id: 2, image: "/images/manga2.jpeg", artist: "User2" },
  { id: 3, image: "/images/manga3.jpeg", artist: "User3" },
  { id: 4, image: "/images/manga4.jpeg", artist: "User4" },
]
  return (
    <div className="final-manga">
      <div className="manga-header">
        <button className="back-btn" onClick={onBackToDashboard}>
          ← Back to Dashboard
        </button>
        <h1>{room?.title || "Completed Manga"}</h1>
        <p>Your collaborative manga is complete!</p>
      </div>

      <div className="manga-pages">
        {mangaPages.map((page, index) => (
          <div key={page.id} className="manga-page">
            <div className="page-number">Page {index + 1}</div>
            <img src={page.image || "/placeholder.svg"} alt={`Page ${index + 1}`} />
            <div className="page-info">
              <span>Drawn by: {page.artist}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="manga-actions">
        <button className="download-btn">📥 Download Manga</button>
        <button className="share-btn">🔗 Share Manga</button>
      </div>
    </div>
  )
}
