import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { TopicsContext } from '../context/TopicsContext'
import { UserContext } from '../context/UserContext'

const Header = () => {
  const {
    topics,
    loading: topicsLoading,
    error: topicsError,
  } = useContext(TopicsContext)
  const {
    user,
    setUser,
    users,
    loading: usersLoading,
    error: usersError,
  } = useContext(UserContext)

  const handleUserChange = (event) => {
    const selectedUser = users.find(
      (user) => user.username === event.target.value
    )
    setUser(selectedUser)
  }

  if (topicsLoading || usersLoading) return <p>Loading...</p>
  if (topicsLoading) return <p>Loading topics...</p>
  if (topicsError) return <p>Error loading topics: {topicsError}</p>
  if (usersError) return <p>Error loading Users: {usersError}</p>

  return (
    <header>
      <h1>
        <Link to="/">NC-News</Link>
      </h1>
      <nav>
        {topics.map((topic) => (
          <Link key={topic.slug} to={`/${topic.slug}`}>
            {topic.slug}
          </Link>
        ))}
      </nav>
      <div>
        <select onChange={handleUserChange} value={user?.username || ''}>
          <option value="" disabled>
            Select user
          </option>
          {users.map((user) => (
            <option key={user.username} value={user.username}>
              {user.username}
            </option>
          ))}
        </select>
      </div>
    </header>
  )
}

export default Header
