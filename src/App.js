"use client"

import { useState, useEffect } from "react"
import HomePage from "./components/home-page"
import LoginPage from "./components/login-page"
import Dashboard from './components/Dashboard.jsx'
import DrawingInterface from "./components/drawing-interface"
import FinalManga from "./components/final-manga"
import ChatInterface from "./components/chat-interface" // Add this import

export default function App() {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState("home") // home, login, dashboard, drawing, final
  const [currentRoom, setCurrentRoom] = useState(null)
  const [drawingPrompt, setDrawingPrompt] = useState("")
  // Mock user data
  useEffect(() => {
    // Simulate checking for logged in user
    const mockUser = localStorage.getItem("manga-user")
    if (mockUser) {
      setUser(JSON.parse(mockUser))
      setCurrentView("dashboard")
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem("manga-user", JSON.stringify(userData))
    setCurrentView("dashboard")
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("manga-user")
    setCurrentView("home")
    setCurrentRoom(null)
  }

  if (currentView === "home") {
    return <HomePage onShowLogin={() => setCurrentView("login")} />
  }
const handleGoToChat = (room) => {
  setCurrentRoom(room)
  setCurrentView("chat")
}
  if (currentView === "login") {
    return <LoginPage onLogin={handleLogin} onBackToHome={() => setCurrentView("home")} />
  }

  return (
    <div className="app">
      {currentView === "dashboard" && (
      <Dashboard
        user={user}
        onLogout={handleLogout}
        onStartDrawing={(room) => {
          setCurrentRoom(room)
          setCurrentView("drawing")
        }}
        onGoToChat={handleGoToChat} // Pass this prop
      />
    )}

      

      {currentView === "final" && (
        <FinalManga
          room={currentRoom}
          onBackToDashboard={() => {
            setCurrentView("dashboard")
            setCurrentRoom(null)
          }}
        />
      )}
      {currentView === "chat" && (
  <ChatInterface
    user={user}
    room={currentRoom}
    onStoryGenerated={(part1Text) => {
      setDrawingPrompt(part1Text)
      setCurrentView("drawing")
    }}
    onLogout={handleLogout}
    onBackToDashboard={() => setCurrentView("dashboard")}
  />
)}
{currentView === "drawing" && (
  <DrawingInterface
    user={user}
    room={currentRoom}
    prompt={drawingPrompt}
    onLogout={handleLogout}
    onFinishManga={() => setCurrentView("final")}
  />
)}
    </div>
  )
}
