"use client"

import { useState } from "react"
import Navbar from "./Navbar"
import MangaGrid from "./MangaGrid"
import CreateMangaModal from "./CreateMangaModal"
import "../App.css"

export default function Dashboard({ user, onLogout, onJoinRoom, onNavigate }) {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [mangas, setMangas] = useState([
    { id: 1, title: "Adventure Quest", members: 3, status: "completed" },
    { id: 2, title: "Space Warriors", members: 2, status: "in-progress" },
  ])

  const handleCreateManga = (mangaData) => {
    const newManga = {
      id: Date.now(),
      ...mangaData,
      status: "waiting",
      host: user.username,
    }
    setMangas([...mangas, newManga])
    setShowCreateModal(false)
    onJoinRoom(newManga)
  }

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} onNavigate={onNavigate} currentView="dashboard" />

      <div className="dashboard-content">
        <h1>My Mangas</h1>
        <MangaGrid mangas={mangas} onJoinRoom={onJoinRoom} />

        <button className="add-manga-btn" onClick={() => setShowCreateModal(true)}>
          +
        </button>
      </div>

      {showCreateModal && (
        <CreateMangaModal onClose={() => setShowCreateModal(false)} onCreate={handleCreateManga} user={user} />
      )}
    </div>
  )
}
