"use client"

import { useState } from "react"
import "../App.css"

export default function DrawingSidebar({ tool, setTool, brushSize, setBrushSize, onAddSticker, onAddText }) {
  const [showStickers, setShowStickers] = useState(false)

  const brushSizes = [1, 2, 4, 8, 16, 32, 64]
  const stickers = ["😀", "😎", "🚀", "⭐", "❤️", "🔥", "💎", "🌟", "🎯", "🏆"]

  return (
    <div className="drawing-sidebar">
      <div className="tool-section">
        <h3>Tools</h3>

        <button className={`tool-btn ${tool === "brush" ? "active" : ""}`} onClick={() => setTool("brush")}>
          🖌️ Brush
        </button>

        <button className={`tool-btn ${tool === "eraser" ? "active" : ""}`} onClick={() => setTool("eraser")}>
          🧽 Eraser
        </button>
      </div>

      <div className="size-section">
        <h3>Brush Size</h3>
        <input
          type="range"
          min="0"
          max={brushSizes.length - 1}
          value={brushSizes.indexOf(brushSize)}
          onChange={(e) => setBrushSize(brushSizes[Number.parseInt(e.target.value)])}
          className="size-slider"
        />
        <span className="size-display">{brushSize}px</span>
      </div>

      <div className="sticker-section">
        <button className="tool-btn" onClick={() => setShowStickers(!showStickers)}>
          😀 Stickers
        </button>

        {showStickers && (
          <div className="sticker-grid">
            {stickers.map((sticker) => (
              <button key={sticker} className="sticker-btn" onClick={() => onAddSticker(sticker)}>
                {sticker}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="text-section">
        <button className="tool-btn" onClick={onAddText}>
          📝 Text
        </button>
      </div>
    </div>
  )
}
