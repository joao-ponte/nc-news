import { createContext, useState, useEffect } from 'react'
import { fetchUsers } from '../Utils/api'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchUsers()
      .then((response) => {
        setUsers(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, users, loading, error }}>
      {children}
    </UserContext.Provider>
  )
}
