import { useState, useEffect } from 'react'
import { fetchArticles } from '../Utils/api'
import { useParams, Link } from 'react-router-dom'

const Home = () => {
  const { topic } = useParams()
  const [articles, setArticles] = useState([])
  const [sortBy, setSortBy] = useState('created_at')
  const [order, setOrder] = useState('desc')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchArticles(topic, sortBy, order)
      .then((response) => {
        setArticles(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [topic, sortBy, order])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <main>
      <h2>{topic ? `Articles on ${topic}` : 'All Articles'}</h2>
      <ul>
        {articles.map((article) => (
          <li className="articleCard" key={article.article_id}>
            <Link to={`/articles/${article.article_id}`}>
              <img src={article.article_img_url} alt={article.title} />
              <h2>{article.title}</h2>
              <p>{article.topic}</p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home
