"use client"

import { useState } from "react"
import Navbar from './Navbar.jsx'
import MangaGrid from "./manga-grid"
import CreateRoomModal from "./create-room-modal"
import RoomLobby from "./room-lobby"
import JoinRoomModal from "./join-room-modal"
import "./dashboard.css"
// Ensure this import is correct

export default function Dashboard({ user, onLogout, onStartDrawing, onGoToChat }) {
  const [lastRoomId, setLastRoomId] = useState(null)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showLobby, setShowLobby] = useState(false)
  const [currentRoom, setCurrentRoom] = useState(null)
  const [mangas, setMangas] = useState([
    {
      id: 1,
      title: "Epic Adventure",
      members: 3,
      status: "completed",
      thumbnail: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 2,
      title: "Space Warriors",
      members: 2,
      status: "in-progress",
      thumbnail: "/placeholder.svg?height=200&width=150",
    },
    {
      id: 3,
      title: "Magic School",
      members: 4,
      status: "completed",
      thumbnail: "/placeholder.svg?height=200&width=150",
    },
  ])

  // Community manga data
  const [communityMangas] = useState([
    {
      id: 101,
      title: "Dragon's Legacy",
      creators: ["Akira", "Yuki", "Hana"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Ancient dragons awaken to reclaim their lost kingdom",
      likes: 245,
      views: 1200,
    },
    {
      id: 102,
      title: "Neon Dreams",
      creators: ["Cyber_Artist", "Neo_Writer"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Cyberpunk adventure in a dystopian future",
      likes: 189,
      views: 890,
    },
    {
      id: 103,
      title: "Forest Spirits",
      creators: ["Nature_Lover", "Spirit_Guide", "Tree_Whisperer"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Mystical creatures protect the enchanted forest",
      likes: 312,
      views: 1567,
    },
    {
      id: 104,
      title: "Time Travelers",
      creators: ["ChronoMaster", "TimeLord"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Journey through different eras to save history",
      likes: 156,
      views: 743,
    },
    {
      id: 105,
      title: "Ocean Guardians",
      creators: ["AquaHero", "DeepSea_Explorer", "Coral_Keeper"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Underwater heroes defend the marine world",
      likes: 278,
      views: 1034,
    },
    {
      id: 106,
      title: "Sky Pirates",
      creators: ["CloudCaptain", "WindRider"],
      thumbnail: "/placeholder.svg?height=300&width=200",
      description: "Aerial adventures with flying ships and sky islands",
      likes: 203,
      views: 967,
    },
  ])

const handleCreateRoom = (room) => {
    setCurrentRoom(room)
    setShowCreateModal(false)
    onGoToChat(room) // This should be called here
  }
  const handleJoinRoom = (room) => {
    setCurrentRoom(room)
    setShowJoinModal(false)

  }

  const handleStartFromLobby = (room) => {
    setShowLobby(false)
    onStartDrawing(room)
  }

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={onLogout} />

      <main className="dashboard-main">
        <div className="dashboard-content">
          <div className="dashboard-header">
            <h1>Your Manga Collection</h1>
            <p>Create amazing stories together</p>
          </div>

          <MangaGrid mangas={mangas} />

          <button className="add-manga-btn" onClick={() => setShowCreateModal(true)}>
            <span className="plus-icon">+</span>
            <span>Create New Manga</span>
          </button>

          {/* Community Creations Section */}
          <section className="community-section">
            <div className="community-header">
              <h2>Community Creations</h2>
              <p>Discover amazing manga created by our talented community</p>
            </div>
            <div className="community-grid">
              {communityMangas.map((manga) => (
                <div key={manga.id} className="community-card">
                  <div className="community-thumbnail">
                    <img src={manga.thumbnail || "/placeholder.svg"} alt={manga.title} />
                    <div className="community-stats">
                      <span className="stat-item">
                        <span className="stat-icon">👁️</span>
                        {manga.views}
                      </span>
                      <span className="stat-item">
                        <span className="stat-icon">❤️</span>
                        {manga.likes}
                      </span>
                    </div>
                  </div>
                  <div className="community-info">
                    <h3>{manga.title}</h3>
                    <p className="creators">By: {manga.creators.join(", ")}</p>
                    <p className="description">{manga.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {showCreateModal && (
        <CreateRoomModal
          onClose={() => setShowCreateModal(false)}
          onCreateRoom={handleCreateRoom}
        />
      )}

      {showLobby && (
        <RoomLobby
          room={currentRoom}
          user={user}
          onClose={() => setShowLobby(false)}
          onStartDrawing={handleStartFromLobby}
        />
      )}

      {showJoinModal && (
        <JoinRoomModal
          onClose={() => setShowJoinModal(false)}
          onJoinRoom={() => {}} // pune aici funcția ta de join dacă ai una
          user={user}
          roomId={lastRoomId}
        />
      )}
      
    </div>
  )
}