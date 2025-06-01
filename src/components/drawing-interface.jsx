"use client"

import { useState,useRef } from "react"
import Navbar from "./navbar"
import DrawingCanvas from "./drawing-canvas"
import ToolSidebar from "./tool-sidebar"
import ChatInterface from "./chat-interface"
import WaitingScreen from "./waiting-screen"
import "./drawing-interface.css"

export default function DrawingInterface({ user, room, onLogout, onFinishManga }) {
  const [currentPrompt, setCurrentPrompt] = useState(
    "Draw a heroic character standing on a mountain peak, looking towards the horizon with determination.",
  )
  const [isWaiting, setIsWaiting] = useState(false)
  const [showChat, setShowChat] = useState(true)
  const [selectedTool, setSelectedTool] = useState("brush")
  const [brushSize, setBrushSize] = useState(8)
  const [canvasElements, setCanvasElements] = useState([])
  const canvasRef = useRef()

const handleFinishDrawing = async () => {
  // Ia imaginea PNG din canvas
  const imageData = canvasRef.current.getImage()
  try {
    const token = localStorage.getItem("access_token")
    const response = await fetch("http://127.0.0.1:8000/save-drawing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        image: imageData,
        room_id: room?.room_id, // sau ce id ai nevoie
        user_id: user?.user_id,
      }),
    })
    if (response.ok) {
      setIsWaiting(true)
      setTimeout(() => {
        onFinishManga()
      }, 3000)
    } else {
      alert("Failed to save drawing!")
    }
  } catch (err) {
    alert("Error: " + err.message)
  }
}

  const handleStoryGenerated = () => {
    setShowChat(false)
    // Simulate receiving prompt from AI
    setCurrentPrompt(
      "Draw a heroic character standing on a mountain peak, looking towards the horizon with determination.",
    )
  }

  return (
    <div className="drawing-interface">
      <Navbar user={user} onLogout={onLogout} />

      <div className="drawing-content">
        {currentPrompt && !showChat && (
          <div className="prompt-display">
            <div className="prompt-content">
              <h3>Your Drawing Prompt:</h3>
              <p>{currentPrompt}</p>
            </div>
          </div>
        )}

        <div className={`drawing-main ${currentPrompt && !showChat ? "with-prompt" : ""}`}>
          {showChat ? (
            <ChatInterface room={room} user={user} onStoryGenerated={handleStoryGenerated} />
          ) : (
            <>
              <ToolSidebar
                selectedTool={selectedTool}
                onToolSelect={setSelectedTool}
                brushSize={brushSize}
                onBrushSizeChange={setBrushSize}
                canvasElements={canvasElements}
                onElementsChange={setCanvasElements}
              />

              <div className="canvas-container">
                <DrawingCanvas
                  ref={canvasRef}
                  selectedTool={selectedTool}
                  brushSize={brushSize}
                  elements={canvasElements}
                  onElementsChange={setCanvasElements}
                />

                <button className="done-btn" onClick={handleFinishDrawing}>
                  Done!
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {isWaiting && <WaitingScreen message="Waiting for other members to finish..." />}
    </div>
  )
}
