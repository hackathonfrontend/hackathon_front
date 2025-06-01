"use client"

import { useState, useEffect } from "react"
import HomePage from "./components/home-page"
import LoginPage from "./components/login-page"
import Dashboard from "./components/dashboard"
import DrawingInterface from "./components/drawing-interface"
import FinalManga from "./components/final-manga"

export default function App() {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState("home") // home, login, dashboard, drawing, final
  const [currentRoom, setCurrentRoom] = useState(null)

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
        />
      )}

      {currentView === "drawing" && (
        <DrawingInterface
          user={user}
          room={currentRoom}
          onLogout={handleLogout}
          onFinishManga={() => setCurrentView("final")}
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
    </div>
  )
}
