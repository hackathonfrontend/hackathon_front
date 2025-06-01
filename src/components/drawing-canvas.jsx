"use client"

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import "./drawing-canvas.css"

export default function DrawingCanvas({ selectedTool, brushSize, elements, onElementsChange }) {
  const canvasRef = useRef(null)
// const DrawingCanvas = forwardRef(function DrawingCanvas(
//   { selectedTool, brushSize, elements, onElementsChange },
//   ref
// ) {
//   const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [draggedElement, setDraggedElement] = useState(null)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [selectedElement, setSelectedElement] = useState(null)
  const [isDragging, setIsDragging] = useState(false)


  
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")

    // Set canvas size
    canvas.width = 800
    canvas.height = 600

    // Clear canvas
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Redraw all elements
    elements.forEach((element) => {
      if (element.type === "stroke") {
        drawStroke(ctx, element)
      } else if (element.type === "sticker") {
        drawSticker(ctx, element)
      } else if (element.type === "text") {
        drawText(ctx, element)
      }
      // Interactive elements are rendered as overlays, not on canvas
    })
  }, [elements])

  const drawStroke = (ctx, stroke) => {
    if (stroke.points.length < 2) return

    ctx.strokeStyle = stroke.color
    ctx.lineWidth = stroke.size
    ctx.lineCap = "round"
    ctx.lineJoin = "round"

    ctx.beginPath()
    ctx.moveTo(stroke.points[0].x, stroke.points[0].y)

    for (let i = 1; i < stroke.points.length; i++) {
      ctx.lineTo(stroke.points[i].x, stroke.points[i].y)
    }

    ctx.stroke()
  }

  const drawSticker = (ctx, sticker) => {
    ctx.save()
    ctx.translate(sticker.x + sticker.width / 2, sticker.y + sticker.height / 2)
    ctx.rotate((sticker.rotation * Math.PI) / 180)
    ctx.font = `${sticker.size}px Arial`
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(sticker.emoji, 0, 0)
    ctx.restore()
  }

  const drawText = (ctx, text) => {
    ctx.save()
    ctx.translate(text.x + text.width / 2, text.y + text.height / 2)
    ctx.rotate((text.rotation * Math.PI) / 180)
    ctx.font = `${text.fontSize}px Arial`
    ctx.fillStyle = text.color || "black"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(text.content, 0, 0)
    ctx.restore()
  }

  const getMousePos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    }
  }

  // DRAG LOGIC: use global listeners for smooth drag
  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      if (isDragging && draggedElement) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left - dragOffset.x
        const y = e.clientY - rect.top - dragOffset.y

        // Trash zone logic
        const trashZone = {
          x: canvas.width - 100,
          y: canvas.height - 100,
          width: 100,
          height: 100,
        }

        if (x + draggedElement.width > trashZone.x && y + draggedElement.height > trashZone.y) {
          document.querySelector(".trash-zone")?.classList.add("active")
        } else {
          document.querySelector(".trash-zone")?.classList.remove("active")
        }

        onElementsChange((prev) =>
          prev.map((element) =>
            element.id === draggedElement.id ? { ...element, x, y } : element
          )
        )

        // Update selected element if it's the one being dragged
        if (selectedElement && selectedElement.id === draggedElement.id) {
          setSelectedElement({ ...selectedElement, x, y })
        }

        setDraggedElement({ ...draggedElement, x, y })
      }
    }

    const handleGlobalMouseUp = (e) => {
      if (isDrawing) setIsDrawing(false)

      if (draggedElement) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()
        const pos = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        }
        const trashZone = {
          x: canvas.width - 100,
          y: canvas.height - 100,
          width: 100,
          height: 100,
        }

        // Remove if dropped in trash
        if (pos.x > trashZone.x && pos.y > trashZone.y) {
          onElementsChange((prev) => prev.filter((element) => element.id !== draggedElement.id))
        }

        setDraggedElement(null)
        setIsDragging(false)
        setDragOffset({ x: 0, y: 0 })
        document.querySelector(".trash-zone")?.classList.remove("active")
      }
    }

    if (isDragging) {
      document.addEventListener("mousemove", handleGlobalMouseMove)
      document.addEventListener("mouseup", handleGlobalMouseUp)
    }
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove)
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
    // eslint-disable-next-line
  }, [isDragging, draggedElement, dragOffset, selectedElement, onElementsChange])

  const handleMouseDown = (e) => {
    const pos = getMousePos(e)

    // If we're currently editing an interactive element, check if we clicked on it
    if (selectedElement) {
      const isClickedOnSelected =
        pos.x >= selectedElement.x &&
        pos.x <= selectedElement.x + selectedElement.width &&
        pos.y >= selectedElement.y &&
        pos.y <= selectedElement.y + selectedElement.height

      if (isClickedOnSelected) {
        setDraggedElement(selectedElement)
        setDragOffset({
          x: pos.x - selectedElement.x,
          y: pos.y - selectedElement.y,
        })
        setIsDragging(true)
        return
      } else {
        // If clicked outside, confirm the current element
        confirmElement()
      }
    }

    if (selectedTool === "brush" || selectedTool === "eraser") {
      setIsDrawing(true)
      const newStroke = {
        type: "stroke",
        points: [pos],
        color: selectedTool === "brush" ? "black" : "white",
        size: brushSize,
        id: Date.now(),
      }
      onElementsChange((prev) => [...prev, newStroke])
    } else {
      // Check if clicking on an interactive or regular element
      const clickedElement = elements.find((element) => {
        if (
          element.type === "sticker" ||
          element.type === "text" ||
          element.type === "interactive-sticker" ||
          element.type === "interactive-text"
        ) {
          return (
            pos.x >= element.x &&
            pos.x <= element.x + element.width &&
            pos.y >= element.y &&
            pos.y <= element.y + element.height
          )
        }
        return false
      })

      if (clickedElement) {
        if (clickedElement.type.startsWith("interactive-")) {
          setSelectedElement(clickedElement)
          setDraggedElement(clickedElement)
          setDragOffset({
            x: pos.x - clickedElement.x,
            y: pos.y - clickedElement.y,
          })
          setIsDragging(true)
        } else {
          setDraggedElement(clickedElement)
          setDragOffset({
            x: pos.x - clickedElement.x,
            y: pos.y - clickedElement.y,
          })
          setIsDragging(true)
        }
      }
    }
  }

  const handleMouseMove = (e) => {
    if (isDrawing && (selectedTool === "brush" || selectedTool === "eraser")) {
      const pos = getMousePos(e)
      onElementsChange((prev) => {
        const newElements = [...prev]
        const currentStroke = newElements[newElements.length - 1]
        currentStroke.points.push(pos)
        return newElements
      })
    }
    // Dragging is handled globally now
  }

  const handleMouseUp = (e) => {
    if (isDrawing) {
      setIsDrawing(false)
    }
    // Dragging is handled globally now
  }

  const confirmElement = () => {
    if (selectedElement) {
      const confirmedElement = {
        ...selectedElement,
        type: selectedElement.type.replace("interactive-", ""),
      }

      onElementsChange((prev) =>
        prev.map((element) => (element.id === selectedElement.id ? confirmedElement : element)),
      )

      // Immediately render the confirmed element on the canvas
      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")

      if (confirmedElement.type === "sticker") {
        drawSticker(ctx, confirmedElement)
      } else if (confirmedElement.type === "text") {
        drawText(ctx, confirmedElement)
      }

      setSelectedElement(null)
    }
  }

  const cancelElement = () => {
    if (selectedElement) {
      onElementsChange((prev) => prev.filter((element) => element.id !== selectedElement.id))
      setSelectedElement(null)
    }
  }

  return (
    <div className="canvas-wrapper">
      <canvas
        ref={canvasRef}
        className="drawing-canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />

      {/* Interactive element overlays */}
      {elements
        .filter((element) => element.type.startsWith("interactive-"))
        .map((element) => (
          <div
            key={element.id}
            className={`interactive-element ${selectedElement?.id === element.id ? "selected" : ""}`}
            style={{
              position: "absolute",
              left: element.x,
              top: element.y,
              width: element.width,
              height: element.height,
              transform: `rotate(${element.rotation}deg)`,
              cursor: "move",
              border: selectedElement?.id === element.id ? "2px solid #00d4ff" : "2px dashed rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: element.type === "interactive-sticker" ? `${element.size}px` : `${element.fontSize}px`,
              color: element.color || "black",
              backgroundColor: "rgba(255,255,255,0.1)",
              backdropFilter: "blur(5px)",
              zIndex: 10,
              userSelect: "none",
            }}
            onMouseDown={(e) => {
              e.stopPropagation()
              setSelectedElement(element)
              setDraggedElement(element)
              const pos = getMousePos(e)
              setDragOffset({
                x: pos.x - element.x,
                y: pos.y - element.y,
              })
              setIsDragging(true)
            }}
          >
            {element.type === "interactive-sticker" ? element.emoji : element.content}

            {selectedElement?.id === element.id && (
              <div className="element-controls">
                <button className="confirm-btn" onClick={confirmElement}>
                  ✓
                </button>
                <button className="cancel-btn" onClick={cancelElement}>
                  ✕
                </button>
              </div>
            )}
          </div>
        ))}

      {/* <div className="trash-zone">🗑️</div> */}
    </div>
  )
}