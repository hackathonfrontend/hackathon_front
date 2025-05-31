"use client"

import { useState } from "react"
import "../App.css"

export default function CreateMangaModal({ onClose, onCreate, user }) {
  const [title, setTitle] = useState("")
  const [members, setMembers] = useState([])
  const [newMember, setNewMember] = useState("")

  const addMember = () => {
    if (newMember && !members.includes(newMember)) {
      setMembers([...members, newMember])
      setNewMember("")
    }
  }

  const removeMember = (member) => {
    setMembers(members.filter((m) => m !== member))
  }

  const handleStart = () => {
    if (title) {
      onCreate({
        title,
        members: [user.username, ...members],
      })
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create New Manga</h2>

        <input type="text" placeholder="Manga Title" value={title} onChange={(e) => setTitle(e.target.value)} />

        <div className="member-section">
          <h3>Add Members</h3>
          <div className="add-member">
            <input
              type="text"
              placeholder="Username"
              value={newMember}
              onChange={(e) => setNewMember(e.target.value)}
            />
            <button onClick={addMember}>Add</button>
          </div>

          <div className="member-list">
            <div className="member-item host">{user.username} (Host)</div>
            {members.map((member) => (
              <div key={member} className="member-item">
                {member}
                <button onClick={() => removeMember(member)}>×</button>
              </div>
            ))}
          </div>
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleStart} disabled={!title}>
            Start
          </button>
        </div>
      </div>
    </div>
  )
}
