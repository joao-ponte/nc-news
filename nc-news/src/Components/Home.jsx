import { useState, useEffect } from 'react'
import { fetchArticles } from '../Utils/api'
import { useParams, Link, useSearchParams } from 'react-router-dom'
import LoadingErrorHandler from './LoadingErrorHandler'

const Home = () => {
  const { topic } = useParams()
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()

  const sortBy = searchParams.get('sort_by') || 'created_at'
  const order = searchParams.get('order') || 'desc'

  useEffect(() => {
    setLoading(true)
    fetchArticles(topic, sortBy, order)
      .then((response) => {
        setArticles(response.data)
        setLoading(false)
      })
      .catch((err) => {
        console.log(err.response.status)
        setError(err.response.status)
        setLoading(false)
      })
  }, [topic, sortBy, order])

  const handleSortChange = (event) => {
    setSearchParams({ sort_by: event.target.value, order })
  }

  const handleOrderChange = () => {
    setSearchParams({
      sort_by: sortBy,
      order: order === 'asc' ? 'desc' : 'asc',
    })
  }

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      <main>
        <h2>{topic ? `Articles on ${topic}` : 'All Articles'}</h2>
        <div>
          <label>
            Sort by:
            <select value={sortBy} onChange={handleSortChange}>
              <option value="created_at">Date</option>
              <option value="votes">Votes</option>
            </select>
          </label>
          <button onClick={handleOrderChange}>
            Order: {order === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
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
    </LoadingErrorHandler>
  )
}

export default Home
