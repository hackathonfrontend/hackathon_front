"use client"

import { useState, useEffect } from "react"
import "./room-lobby.css"

export default function RoomLobby({ room, user, onClose, onStartDrawing }) {
  const [roomCode] = useState(() => {
    // Generate a 6-digit room code
    return Math.random().toString(36).substring(2, 8).toUpperCase()
  })

  const [joinedUsers, setJoinedUsers] = useState([user.username])
  const [isHost] = useState(true) // The creator is always the host

  // Simulate users joining (in a real app, this would come from a server)
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && joinedUsers.length < 4) {
        const mockUsers = ["Alice", "Bob", "Charlie", "Diana", "Eve"]
        const availableUsers = mockUsers.filter((name) => !joinedUsers.includes(name))
        if (availableUsers.length > 0) {
          const randomUser = availableUsers[Math.floor(Math.random() * availableUsers.length)]
          setJoinedUsers((prev) => [...prev, randomUser])
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [joinedUsers])

  const handleStartDrawing = () => {
    onStartDrawing({
      ...room,
      code: roomCode,
      members: joinedUsers,
    })
  }

  const copyRoomCode = () => {
    navigator.clipboard.writeText(roomCode)
    // You could add a toast notification here
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content lobby-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Room Lobby - {room.title}</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <div className="lobby-body">
          <div className="room-code-section">
            <h3>Room Code</h3>
            <div className="room-code-display">
              <span className="room-code">{roomCode}</span>
              <button className="copy-btn" onClick={copyRoomCode} title="Copy room code">
                📋
              </button>
            </div>
            <p className="code-instruction">Share this code with your friends to join the room</p>
          </div>

          <div className="users-section">
            <h3>Joined Users ({joinedUsers.length})</h3>
            <div className="users-list">
              {joinedUsers.map((username, index) => (
                <div key={index} className="user-item">
                  <div className="user-avatar">{username.charAt(0).toUpperCase()}</div>
                  <span className="username">
                    {username}
                    {username === user.username && " (You)"}
                    {index === 0 && " (Host)"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {isHost && (
            <div className="lobby-actions">
              <button className="start-drawing-btn" onClick={handleStartDrawing} disabled={joinedUsers.length < 1}>
                Start Creating Manga
              </button>
            </div>
          )}

          {!isHost && (
            <div className="waiting-message">
              <p>Waiting for the host to start the manga creation...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
