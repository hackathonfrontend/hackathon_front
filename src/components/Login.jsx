"use client"

import { useState } from "react"
import "../App.css"

export default function Login({ onLogin }) {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (username && password) {
      onLogin({
        id: Date.now(),
        username,
        notifications: [],
      })
    }
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>{isRegister ? "Register" : "Login"}</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">{isRegister ? "Register" : "Login"}</button>
        </form>
        <p>
          {isRegister ? "Already have an account?" : "Don't have an account?"}
          <button type="button" onClick={() => setIsRegister(!isRegister)} className="link-button">
            {isRegister ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  )
}
