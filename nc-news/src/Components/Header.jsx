import {useContext} from 'react'
import { Link } from 'react-router-dom'
import { TopicsContext } from '../context/TopicsContext'

const Header = () => {
  const { topics, loading, error } = useContext(TopicsContext)

  if (loading) return <p>Loading topics...</p>
  if (error) return <p>Error loading topics: {error}</p>

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
    </header>
  )
}

export default Header
