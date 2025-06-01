"use client"

import { useState } from "react"
import "./login-page.css"
import { registerUser, loginUser } from "../api"

export default function LoginPage({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })

const handleSubmit = async (e) => {
  e.preventDefault()
  if (isLogin) {
    try {
      const data = await loginUser({
        username: formData.username,
        password: formData.password,
      })
      // Salvează tokenul și user_id în localStorage
      localStorage.setItem("access_token", data.access_token)
      localStorage.setItem("user_id", data.user_id)
      
      // Trimite și user_id la onLogin dacă vrei să-l folosești în app
      onLogin({ username: formData.username, user_id: data.user_id })
    } catch (err) {
      alert("Login failed: " + (err.response?.data?.detail || err.message))
    }
  } else {
    try {
      await registerUser({
        username: formData.username,
        password: formData.password,
      })
      alert("Registration successful! Please log in.")
      setIsLogin(true)
      setFormData({ username: "", password: "" })
    } catch (err) {
      alert("Registration failed: " + (err.response?.data?.detail || err.message))
    }
  }
}

  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">MANGA 雲</h1>
          <p className="login-subtitle">Collaborative Manga Creation</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>

          {/* {!isLogin && (
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="form-input"
              />
            </div>
          )} */}

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="form-input"
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <div className="login-footer">
          <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  )
}
