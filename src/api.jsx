import axios from "axios"

const API_BASE = "https://hackathon-api-f6zo.onrender.com"

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE}/users/register`, userData)
  return response.data
}

export const loginUser = async (userData) => {
  const response = await axios.post(`${API_BASE}/users/login`, userData)
  // returnează tot răspunsul, inclusiv tokenul
  return response.data
}

// CREATE ROOM
export const createMangaRoom = async (roomData) => {
  const token = localStorage.getItem("access_token")
  const response = await axios.post(
    `${API_BASE}/manga-rooms`,
    roomData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}