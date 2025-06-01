"use client"

import { useState } from "react"
import "./create-room-modal.css"
import { createMangaRoom } from "../api" // asigură-te că ai acest import

export default function CreateRoomModal({ onClose, onCreateRoom }) {
  const [roomData, setRoomData] = useState({
    title: "",
    pagesPerMember: 1,
  })

const handleSubmit = async (e) => {
  e.preventDefault()
  if (roomData.title.trim()) {
    try {
      const user_id = Number(localStorage.getItem("user_id"))
      const response = await createMangaRoom({
        user_id,
        userPrompt: roomData.title,
        pagesPerUser: roomData.pagesPerMember,
      })
      // response.room_id conține id-ul camerei create
      onCreateRoom({
        title: roomData.title,
        pagesPerMember: roomData.pagesPerMember,
        room_id: response.room_id, // transmite room_id mai departe
      })
      onClose()
    } catch (err) {
      alert("Failed to create room: " + (err.response?.data?.detail || err.message))
    }
  }
}

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Manga</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="room-form">
          <div className="form-group">
            <label>Manga Title</label>
            <input
              type="text"
              value={roomData.title}
              onChange={(e) => setRoomData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Enter manga title..."
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Pages per Member</label>
            <select
              value={roomData.pagesPerMember}
              onChange={(e) => setRoomData((prev) => ({ ...prev, pagesPerMember: Number(e.target.value) }))}
              className="form-input"
            >
              {[...Array(9)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <div className="form-actions">
            <button type="submit" className="start-btn">
              Start Creating
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}