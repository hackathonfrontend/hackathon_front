import { useState, useRef, useEffect } from "react"
import Navbar from './Navbar.jsx'
import DrawingCanvas from "./drawing-canvas"
import ToolSidebar from "./tool-sidebar"
import WaitingScreen from "./waiting-screen"
import "./drawing-interface.css"

export default function DrawingInterface({ user, room, prompt, onLogout, onFinishManga }) {
  const [currentPrompt, setCurrentPrompt] = useState(prompt || "")
  const [isWaiting, setIsWaiting] = useState(false)
  const [selectedTool, setSelectedTool] = useState("brush")
  const [brushSize, setBrushSize] = useState(8)
  const [canvasElements, setCanvasElements] = useState([])
  const canvasRef = useRef()

  useEffect(() => {
    if (prompt) setCurrentPrompt(prompt)
  }, [prompt])

  const handleFinishDrawing = async () => {
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
          room_id: room?.room_id,
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

  return (
    <div className="drawing-interface">
      <Navbar user={user} onLogout={onLogout} />

      <div className="drawing-content">
        {currentPrompt && (
          <div className="prompt-display">
            <div className="prompt-content">
              <h3>Your Drawing Prompt:</h3>
              <p>{currentPrompt}</p>
            </div>
          </div>
        )}

        <div className="drawing-main with-prompt">
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
        </div>
      </div>

      {isWaiting && <WaitingScreen message="Waiting for other members to finish..." />}
    </div>
  )
}