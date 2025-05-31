"use client"

import { useState } from "react"
import "../App.css"
export default function StoryChat({ user, room, onStoryComplete }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [story, setStory] = useState("")

  const sendToAI = async () => {
    if (!input) return

    const userMessage = { id: Date.now(), sender: user.username, text: input, type: "user" }
    setMessages((prev) => [...prev, userMessage])

    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "AI",
        text: `Here's a story suggestion based on "${input}": In a mystical land where magic flows through ancient crystals, a young hero discovers they have the power to communicate with dragons. The adventure begins when the last dragon egg is stolen by dark forces.`,
        type: "ai",
      }
      setMessages((prev) => [...prev, aiResponse])
    }, 1000)

    setInput("")
  }

  const addToStory = (message) => {
    const newStory = story + " " + message.text
    setStory(newStory)
    setMessages((prev) => prev.map((msg) => (msg.id === message.id ? { ...msg, addedToStory: true } : msg)))
  }

  const generatePrompts = () => {
    if (story) {
      onStoryComplete(story)
    }
  }

  return (
    <div className="story-chat">
      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.type}`}>
              <div className="message-header">
                <strong>{message.sender}</strong>
              </div>
              <div className="message-text">{message.text}</div>
              {message.type === "ai" && !message.addedToStory && (
                <button className="add-to-story-btn" onClick={() => addToStory(message)}>
                  Add to Story
                </button>
              )}
            </div>
          ))}
        </div>

        <div className="story-section">
          <h3>Current Story:</h3>
          <div className="story-text">{story || "No story content yet..."}</div>
          {story && (
            <button className="generate-prompts-btn" onClick={generatePrompts}>
              Generate Drawing Prompts
            </button>
          )}
        </div>

        <div className="input-section">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what should happen in the story..."
            onKeyPress={(e) => e.key === "Enter" && sendToAI()}
          />
          <button onClick={sendToAI}>Send to AI</button>
        </div>
      </div>
    </div>
  )
}
