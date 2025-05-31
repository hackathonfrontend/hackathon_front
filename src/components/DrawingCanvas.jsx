"use client"

import { useState, useRef, useEffect } from "react"
import DrawingSidebar from "./DrawingSidebar"
import "../App.css"

export default function DrawingCanvas({ onComplete }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [tool, setTool] = useState("brush")
  const [brushSize, setBrushSize] = useState(4)
  const [elements, setElements] = useState([]) // For stickers and text
  const [selectedElement, setSelectedElement] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }, [])

  const startDrawing = (e) => {
    if (tool === "brush" || tool === "eraser") {
      setIsDrawing(true)
      draw(e)
    }
  }

  const draw = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    ctx.lineWidth = brushSize
    ctx.lineCap = "round"

    if (tool === "brush") {
      ctx.globalCompositeOperation = "source-over"
      ctx.strokeStyle = "black"
    } else if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out"
    }

    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(x, y)
  }

  const stopDrawing = () => {
    if (isDrawing) {
      setIsDrawing(false)
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      ctx.beginPath()
    }
  }

  const addSticker = (sticker) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()

    const newElement = {
      id: Date.now(),
      type: "sticker",
      content: sticker,
      x: rect.left + 100, // Position relative to viewport
      y: rect.top + 100,
      width: 50,
      height: 50,
      rotation: 0,
    }
    setElements([...elements, newElement])
  }

  const addText = () => {
    const text = prompt("Enter text:")
    if (text) {
      const canvas = canvasRef.current
      const rect = canvas.getBoundingClientRect()

      const newElement = {
        id: Date.now(),
        type: "text",
        content: text,
        x: rect.left + 100, // Position relative to viewport
        y: rect.top + 100,
        width: Math.max(100, text.length * 12),
        height: 30,
        rotation: 0,
      }
      setElements([...elements, newElement])
    }
  }

  const handleElementMouseDown = (element, e) => {
    e.stopPropagation()
    e.preventDefault()

    setSelectedElement(element)
    setIsDragging(true)

    // Calculate offset from element's top-left corner
    const elementRect = e.currentTarget.getBoundingClientRect()
    setDragOffset({
      x: e.clientX - elementRect.left,
      y: e.clientY - elementRect.top,
    })
  }

  const handleMouseMove = (e) => {
    if (isDragging && selectedElement) {
      const canvas = canvasRef.current
      const canvasRect = canvas.getBoundingClientRect()

      // Calculate new position relative to canvas
      const newX = e.clientX - dragOffset.x
      const newY = e.clientY - dragOffset.y

      // Check if dragging to trash (bottom-right corner of canvas)
      const trashZoneX = canvasRect.right - 100
      const trashZoneY = canvasRect.bottom - 100

      if (newX > trashZoneX && newY > trashZoneY) {
        // Remove element if in trash zone
        setElements(elements.filter((el) => el.id !== selectedElement.id))
        setSelectedElement(null)
        setIsDragging(false)
        return
      }

      // Update element position
      setElements(elements.map((el) => (el.id === selectedElement.id ? { ...el, x: newX, y: newY } : el)))
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleCanvasClick = (e) => {
    // Only deselect if clicking on canvas, not on elements
    if (e.target === canvasRef.current) {
      setSelectedElement(null)
    }
  }

  const handleElementResize = (element, corner, e) => {
    e.stopPropagation()
    // Simple resize logic - you can expand this
    const newWidth = Math.max(20, element.width + (e.movementX || 0))
    const newHeight = Math.max(20, element.height + (e.movementY || 0))

    setElements(elements.map((el) => (el.id === element.id ? { ...el, width: newWidth, height: newHeight } : el)))
  }

  const rasterizeAndSubmit = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const canvasRect = canvas.getBoundingClientRect()

    // Draw all elements onto canvas
    elements.forEach((element) => {
      ctx.save()

      // Convert viewport coordinates to canvas coordinates
      const canvasX = element.x - canvasRect.left
      const canvasY = element.y - canvasRect.top

      ctx.translate(canvasX + element.width / 2, canvasY + element.height / 2)
      ctx.rotate((element.rotation * Math.PI) / 180)

      if (element.type === "sticker") {
        ctx.font = `${element.height}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(element.content, 0, 0)
      } else if (element.type === "text") {
        ctx.font = `${Math.min(element.height, 24)}px Arial`
        ctx.fillStyle = "black"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(element.content, 0, 0)
      }

      ctx.restore()
    })

    // Convert to blob and submit
    canvas.toBlob((blob) => {
      console.log("Submitting drawing:", blob)
      onComplete()
    })
  }

  // Add global mouse event listeners
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, selectedElement, elements, dragOffset])

  return (
    <div className="drawing-container">
      <DrawingSidebar
        tool={tool}
        setTool={setTool}
        brushSize={brushSize}
        setBrushSize={setBrushSize}
        onAddSticker={addSticker}
        onAddText={addText}
      />

      <div className="canvas-container">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onClick={handleCanvasClick}
        />

        {elements.map((element) => (
          <div
            key={element.id}
            className={`canvas-element ${element.type} ${selectedElement?.id === element.id ? "selected" : ""}`}
            style={{
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: `rotate(${element.rotation}deg)`,
              position: "fixed", // Use fixed positioning for viewport coordinates
              zIndex: 1000,
            }}
            onMouseDown={(e) => handleElementMouseDown(element, e)}
          >
            {element.content}

            {selectedElement?.id === element.id && (
              <>
                <div
                  className="resize-handle resize-se"
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    // Add resize functionality here
                  }}
                />
                <div
                  className="rotate-handle"
                  onMouseDown={(e) => {
                    e.stopPropagation()
                    // Add rotation functionality here
                  }}
                />
              </>
            )}
          </div>
        ))}

        <div className="trash-zone">🗑️</div>
      </div>

      <button className="done-btn" onClick={rasterizeAndSubmit}>
        Done!
      </button>
    </div>
  )
}
