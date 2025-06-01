"use client"

import { useState } from "react"
import "./navbar.css"
import JoinRoomModal from "./join-room-modal"

export default function Navbar({ user, onLogout }) {
  const [showJoinModal, setShowJoinModal] = useState(false)

  const handleJoinRoom = (room) => {
    setShowJoinModal(false)
    // Handle joining room - you'll need to pass this up to parent
    console.log("Joined room:", room)
  }

  const handleLogout = () => {
    localStorage.removeItem("access_token")
    onLogout()
  }

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <h2>MANGA 雲</h2>
        </div>

        <div className="navbar-actions">
          <button className="join-room-btn" onClick={() => setShowJoinModal(true)}>
            <span className="join-icon">🚪</span>
            <span>Join Room</span>
          </button>

          {showJoinModal && (
            <JoinRoomModal onClose={() => setShowJoinModal(false)} onJoinRoom={handleJoinRoom} user={user} />
          )}

          <div className="user-info">
            <span>Welcome, {user.username}</span>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}