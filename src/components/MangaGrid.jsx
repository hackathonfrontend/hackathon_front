"use client"
import "../App.css"
export default function MangaGrid({ mangas, onJoinRoom }) {
  return (
    <div className="manga-grid">
      {mangas.map((manga) => (
        <div key={manga.id} className="manga-card" onClick={() => onJoinRoom(manga)}>
          <div className="manga-thumbnail">
            <img src="/placeholder.svg?height=150&width=120" alt={manga.title} />
          </div>
          <h3>{manga.title}</h3>
          <p>{manga.members} members</p>
          <span className={`status ${manga.status}`}>{manga.status.replace("-", " ")}</span>
        </div>
      ))}
    </div>
  )
}
