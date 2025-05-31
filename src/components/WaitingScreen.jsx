"use client"
import "../App.css"
export default function WaitingScreen({ message }) {
  return (
    <div className="waiting-screen">
      <div className="spinner"></div>
      <h2>{message}</h2>
      <p>Please wait while others complete their work...</p>
    </div>
  )
}
