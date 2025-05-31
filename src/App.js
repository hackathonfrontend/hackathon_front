import { useState, useEffect } from "react"
import Login from "./components/Login"
import Dashboard from "./components/Dashboard"
import Homepage from "./components/Homepage"
import MangaRoom from "./components/MangaRoom"

export default function App() {
  const [user, setUser] = useState(null)
  const [currentView, setCurrentView] = useState("homepage") // 'homepage', 'dashboard', 'room'
  const [currentRoom, setCurrentRoom] = useState(null)

  // Mock user data
  useEffect(() => {
    const savedUser = localStorage.getItem("mangaUser")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem("mangaUser", JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem("mangaUser")
    setCurrentView("homepage")
    setCurrentRoom(null)
  }

  const handleJoinRoom = (room) => {
    setCurrentRoom(room)
    setCurrentView("room")
  }

  const handleLeaveRoom = () => {
    setCurrentRoom(null)
    setCurrentView("dashboard")
  }

  const handleNavigation = (view) => {
    setCurrentView(view)
    setCurrentRoom(null)
  }

  if (!user) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="app">
      {currentView === "homepage" && <Homepage user={user} onLogout={handleLogout} onNavigate={handleNavigation} />}
      {currentView === "dashboard" && (
        <Dashboard user={user} onLogout={handleLogout} onJoinRoom={handleJoinRoom} onNavigate={handleNavigation} />
      )}
      {currentView === "room" && (
        <MangaRoom user={user} room={currentRoom} onLeaveRoom={handleLeaveRoom} onLogout={handleLogout} />
      )}
    </div>
  )
}
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
