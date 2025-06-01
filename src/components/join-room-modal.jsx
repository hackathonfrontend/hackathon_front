"use client"

import { useState, useEffect } from "react"
import "./join-room-modal.css"

export default function JoinRoomModal({ onClose, onJoinRoom, user, roomId }) {
  const [roomCode, setRoomCode] = useState(roomId ? String(roomId) : "")
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState("")

    useEffect(() => {
    if (roomId) setRoomCode(String(roomId))
  }, [roomId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!roomCode.trim()) {
      setError("Please enter a room code")
      return
    }

    if (roomCode.length !== 6) {
      setError("Room code must be 6 characters")
      return
    }

    setIsJoining(true)
    setError("")

    // Simulate joining room (in real app, this would be an API call)
    setTimeout(() => {
      // Mock room data - in real app this would come from server
      const mockRoom = {
        id: Date.now(),
        title: "Adventure Quest",
        code: roomCode.toUpperCase(),
        host: "Alice",
        members: ["Alice", "Bob"],
      }

      onJoinRoom(mockRoom)
      setIsJoining(false)
    }, 1500)
  }

  const handleCodeChange = (e) => {
    const value = e.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 6)
    setRoomCode(value)
    setError("")
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content join-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Join Room</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="join-form">
          <div className="form-group">
            <label>Room Code</label>
            <input
              type="text"
              value={roomCode}
              onChange={handleCodeChange}
              placeholder="Enter 6-character code..."
              className={`form-input code-input ${error ? "error" : ""}`}
              maxLength={6}
              disabled={isJoining}
            />
            {error && <span className="error-message">{error}</span>}
          </div>

          <div className="form-actions">
            <button type="submit" className="join-btn" disabled={isJoining || !roomCode.trim()}>
              {isJoining ? (
                <>
                  <span className="loading-spinner"></span>
                  Joining...
                </>
              ) : (
                "Join Room"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
