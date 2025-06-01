"use client"

import "./manga-grid.css"

export default function MangaGrid({ mangas }) {
  return (
    <div className="manga-grid">
      {mangas.map((manga) => (
        <div key={manga.id} className="manga-card">
          <div className="manga-thumbnail">
            <img src={manga.thumbnail || "/placeholder.svg"} alt={manga.title} />
            <div className="manga-status">
              <span className={`status-badge ${manga.status}`}>
                {manga.status === "completed" ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>
          <div className="manga-info">
            <h3>{manga.title}</h3>
            <p>{manga.members} members</p>
          </div>
        </div>
      ))}
    </div>
  )
}
