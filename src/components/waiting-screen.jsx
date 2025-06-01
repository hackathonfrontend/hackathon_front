"use client"

import "./waiting-screen.css"

export default function WaitingScreen({ message }) {
  return (
    <div className="waiting-overlay">
      <div className="waiting-content">
        <div className="loading-animation">
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
          <div className="loading-circle"></div>
        </div>
        <h2>{message}</h2>
        <p>Please wait while others complete their drawings...</p>
      </div>
    </div>
  )
}
