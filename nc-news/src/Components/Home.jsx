import { useState, useEffect, useContext } from 'react'
import { fetchArticles, fetchTopics, fetchUsers } from '../Utils/api'
import { Link } from 'react-router-dom'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [topics, setTopics] = useState([])
  const [sortBy, setSortBy] = useState('created_at')
  const [order, setOrder] = useState('desc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchArticles()
      .then((response) => {
        setArticles(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })

    fetchTopics()
      .then((response) => {
        console.log(response.data)
        setTopics(response.data)
      })
      .catch((err) => {
        setError(err.message)
      })
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div>
      <nav>
        {topics.map((topic) => (
          <Link key={topic.slug} to={`/${topic.slug}`}>
            {topic.slug}
          </Link>
        ))}
      </nav>
      <main>
        {articles.map((article) => (
          <div key={article.article_id}>
            <img src={article.article_img_url} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.topic}</p>
          </div>
        ))}
      </main>
    </div>
  )
}

export default Home
