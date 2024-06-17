import { useState, createContext, useEffect } from 'react'
import { fetchTopics } from '../Utils/api'

export const TopicsContext = createContext()

export const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchTopics()
      .then((response) => {
        setTopics(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <TopicsContext.Provider value={{ topics, loading, error }}>
      {children}
    </TopicsContext.Provider>
  )
}
