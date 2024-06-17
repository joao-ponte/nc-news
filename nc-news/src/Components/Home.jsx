import { useState, useEffect, useContext } from 'react'
import { fetchArticles } from '../Utils/api'

const Home = () => {
  const [articles, setArticles] = useState([])
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
  }, [sortBy, order])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <main>
      <ul>
        {articles.map((article) => (
          <li className='articleCard' key={article.article_id}>
            <img src={article.article_img_url} alt={article.title} />
            <h2>{article.title}</h2>
            <p>{article.topic}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home
