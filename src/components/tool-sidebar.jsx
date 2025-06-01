"use client"

import { useState } from "react"
import "./tool-sidebar.css"

const BRUSH_SIZES = [1, 2, 4, 8, 16, 32, 64]

const STICKER_CATEGORIES = {
  faces: ["😀", "😎", "😍", "🤔", "😱", "😴", "🤯", "😇", "🥳", "😭", "😡", "🤪", "😵", "🤤", "😈", "👻"],
  actions: ["🚀", "💥", "⚡", "🔥", "💎", "🌟", "🎯", "🏆", "⚔️", "🛡️", "💪", "👊", "✊", "🤝", "👏", "🙌"],
  nature: ["🌈", "⭐", "🌙", "☀️", "🌸", "🍃", "🌊", "🏔️", "🌺", "🌻", "🌷", "🌹", "🌿", "🍀", "🌵", "🌴"],
  objects: ["👑", "💰", "📚", "🔮", "🎭", "🎨", "🎪", "🎸", "🎵", "🎮", "📱", "💻", "⌚", "🔑", "💡", "🔧"],
}

export default function ToolSidebar({
  selectedTool,
  onToolSelect,
  brushSize,
  onBrushSizeChange,
  canvasElements,
  onElementsChange,
}) {
  const [showStickers, setShowStickers] = useState(false)
  const [stickerCategory, setStickerCategory] = useState("faces")
  const [showTextInput, setShowTextInput] = useState(false)
  const [textInput, setTextInput] = useState("")

  const handleStickerSelect = (emoji) => {
    const newSticker = {
      type: "interactive-sticker",
      emoji,
      x: 100,
      y: 100,
      width: 60,
      height: 60,
      size: 40,
      rotation: 0,
      id: Date.now(),
    }
    onElementsChange((prev) => [...prev, newSticker])
  }

  const handleTextAdd = () => {
    if (textInput.trim()) {
      const newText = {
        type: "interactive-text",
        content: textInput,
        x: 150,
        y: 150,
        width: 200,
        height: 40,
        fontSize: 24,
        color: "black",
        rotation: 0,
        id: Date.now(),
      }
      onElementsChange((prev) => [...prev, newText])
      setTextInput("")
      setShowTextInput(false)
    }
  }

  return (
    <div className="tool-sidebar-container">
      <div className="tool-sidebar">
        <div className="tool-section">
          <h3>Tools</h3>

          <button
            className={`tool-btn ${selectedTool === "brush" ? "active" : ""}`}
            onClick={() => onToolSelect("brush")}
          >
            <span className="tool-icon">🖌️</span>
            <span>Brush</span>
          </button>

          <button
            className={`tool-btn ${selectedTool === "eraser" ? "active" : ""}`}
            onClick={() => onToolSelect("eraser")}
          >
            <span className="tool-icon">🧽</span>
            <span>Eraser</span>
          </button>
        </div>

        <div className="tool-section">
          <h3>Brush Size</h3>
          <div className="size-slider-container">
            <input
              type="range"
              min="0"
              max={BRUSH_SIZES.length - 1}
              value={BRUSH_SIZES.indexOf(brushSize)}
              onChange={(e) => onBrushSizeChange(BRUSH_SIZES[Number.parseInt(e.target.value)])}
              className="size-slider"
            />
            <div className="size-display">
              <div
                className="size-preview"
                style={{
                  width: `${Math.min(brushSize, 32)}px`,
                  height: `${Math.min(brushSize, 32)}px`,
                }}
              />
              <span>{brushSize}px</span>
            </div>
          </div>
        </div>

        <div className="tool-section">
          <h3>Elements</h3>

          <button className="tool-btn" onClick={() => setShowStickers(!showStickers)}>
            <span className="tool-icon">🎨</span>
            <span>Stickers</span>
          </button>

          <button className="tool-btn" onClick={() => setShowTextInput(!showTextInput)}>
            <span className="tool-icon">📝</span>
            <span>Text</span>
          </button>

          {showTextInput && (
            <div className="text-input-container">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Enter text..."
                className="text-input"
                onKeyPress={(e) => e.key === "Enter" && handleTextAdd()}
              />
              <button onClick={handleTextAdd} className="add-text-btn">
                Add
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticker Side Panel */}
      {showStickers && (
        <div className="sticker-side-panel">
          <div className="sticker-panel-header">
            <h3>Stickers</h3>
            <button className="close-panel-btn" onClick={() => setShowStickers(false)}>
              ×
            </button>
          </div>

          <div className="sticker-tabs">
            {Object.keys(STICKER_CATEGORIES).map((category) => (
              <button
                key={category}
                className={`sticker-tab ${stickerCategory === category ? "active" : ""}`}
                onClick={() => setStickerCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="sticker-list">
            {STICKER_CATEGORIES[stickerCategory].map((emoji, index) => (
              <button key={`${emoji}-${index}`} className="sticker-item" onClick={() => handleStickerSelect(emoji)}>
                <span className="sticker-emoji">{emoji}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
