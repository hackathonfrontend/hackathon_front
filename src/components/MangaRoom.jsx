"use client"
import "../App.css"
import { useState } from "react"
import Navbar from "./Navbar"
import StoryChat from "./StoryChat"
import DrawingCanvas from "./DrawingCanvas"
import WaitingScreen from "./WaitingScreen"
import FinalManga from "./FinalManga"

export default function MangaRoom({ user, room, onLeaveRoom, onLogout }) {
  const [phase, setPhase] = useState("story") // 'story', 'drawing', 'waiting', 'final'
  const [currentPrompt, setCurrentPrompt] = useState("")
  const [story, setStory] = useState("")

  const handleStoryComplete = (finalStory) => {
    setStory(finalStory)
    // Mock: Generate prompt for this user
    setCurrentPrompt(
      `Draw a scene showing: A brave warrior standing on a mountain peak, looking at the sunset. The warrior should be holding a magical sword that glows with blue light.`,
    )
    setPhase("drawing")
  }

  const handleDrawingComplete = () => {
    setPhase("waiting")
    // Mock: After 3 seconds, show final manga
    setTimeout(() => {
      setPhase("final")
    }, 3000)
  }

  return (
    <div className="manga-room">
      <Navbar user={user} onLogout={onLogout} />

      <div className="room-header">
        <h1>{room.title}</h1>
        <button onClick={onLeaveRoom} className="leave-btn">
          Leave Room
        </button>
      </div>

      {currentPrompt && phase === "drawing" && (
        <div className="prompt-display">
          <strong>Your prompt:</strong> {currentPrompt}
        </div>
      )}

      {phase === "story" && <StoryChat user={user} room={room} onStoryComplete={handleStoryComplete} />}

      {phase === "drawing" && <DrawingCanvas onComplete={handleDrawingComplete} />}

      {phase === "waiting" && <WaitingScreen message="Waiting for other members to finish drawing..." />}

      {phase === "final" && <FinalManga story={story} />}
    </div>
  )
}
