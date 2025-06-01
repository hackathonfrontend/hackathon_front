"use client"

import { useState } from "react"
import "./chat-interface.css"

export default function ChatInterface({ room, user, onStoryGenerated }) {
  const [messages, setMessages] = useState([])
  const [inputText, setInputText] = useState("")
  const [story, setStory] = useState("")

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage = {
        id: Date.now(),
        text: inputText,
        sender: user.username,
        timestamp: new Date().toLocaleTimeString(),
      }
      setMessages((prev) => [...prev, newMessage])

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: `Here's a story suggestion based on your input: "${inputText}". A young hero discovers a mysterious artifact that grants them incredible powers, but they must learn to control it before an ancient evil awakens.`,
          sender: "AI Assistant",
          timestamp: new Date().toLocaleTimeString(),
          isAI: true,
        }
        setMessages((prev) => [...prev, aiResponse])
      }, 1000)

      setInputText("")
    }
  }

  const handleAddToStory = (messageText) => {
    setStory((prev) => prev + " " + messageText)
    // Visual feedback that it was added
  }

  const handleGeneratePrompts = () => {
    if (story.trim()) {
      // Simulate generating prompts
      setTimeout(() => {
        onStoryGenerated()
      }, 2000)
    }
  }

  return (
    <div className="chat-interface">
      <div className="chat-header">
        <h2>Story Creation - {room.title}</h2>
        <p>Collaborate with AI to create your manga story</p>
      </div>

      <div className="chat-container">
        <div className="messages-area">
          {messages.length === 0 ? (
            <div className="welcome-message">
              <h3>Welcome to Story Creation!</h3>
              <p>Start by describing your manga concept. The AI will help you develop the story.</p>
            </div>
          ) : (
            messages.map((message) => (
              <div key={message.id} className={`message ${message.isAI ? "ai-message" : "user-message"}`}>
                <div className="message-header">
                  <span className="sender">{message.sender}</span>
                  <span className="timestamp">{message.timestamp}</span>
                </div>
                <div className="message-content">
                  <p>{message.text}</p>
                  {message.isAI && (
                    <button className="add-to-story-btn" onClick={() => handleAddToStory(message.text)}>
                      Add to Story
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {story && (
          <div className="story-preview">
            <h3>Current Story:</h3>
            <p>{story}</p>
            <button className="generate-prompts-btn" onClick={handleGeneratePrompts}>
              Generate Drawing Prompts
            </button>
          </div>
        )}

        <div className="chat-input-area">
          <div className="input-container">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your manga story idea..."
              className="chat-input"
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button onClick={handleSendMessage} className="send-btn">
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
