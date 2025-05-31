"use client"

import { useState } from "react"
import "../App.css"
export default function Navbar({ user, onLogout, onNavigate, currentView }) {
  const [showNotifications, setShowNotifications] = useState(false)

  const notifications = [
    { id: 1, message: 'You were invited to "Epic Adventure"', type: "invite" },
    { id: 2, message: 'Your manga "Space Quest" is ready!', type: "complete" },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>MangaCreator</h2>
      </div>

      <div className="navbar-nav">
        <button
          className={`nav-btn ${currentView === "homepage" ? "active" : ""}`}
          onClick={() => onNavigate("homepage")}
        >
          🏠 Home
        </button>
        <button
          className={`nav-btn ${currentView === "dashboard" ? "active" : ""}`}
          onClick={() => onNavigate("dashboard")}
        >
          📚 My Mangas
        </button>
      </div>

      <div className="navbar-actions">
        <div className="notification-dropdown">
          <button className="notification-btn" onClick={() => setShowNotifications(!showNotifications)}>
            🔔 {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          </button>

          {showNotifications && (
            <div className="dropdown-menu">
              <h3>Notifications</h3>
              {notifications.length === 0 ? (
                <p>No notifications</p>
              ) : (
                notifications.map((notif) => (
                  <div key={notif.id} className="notification-item">
                    {notif.message}
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        <span className="username">Welcome, {user.username}</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
