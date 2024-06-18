import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchArticleById } from '../Utils/api'
import { formatDate } from '../Utils/formatDate'
import CommentList from './CommentList'

const ArticlePage = () => {
  const { article_id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchArticleById(article_id)
      .then((response) => {
        console.log(response)
        setArticle(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [article_id])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!article) return <p>No article found</p>

  return (
    <article>
      <h2>{article.title}</h2>

      <img src={article.article_img_url} alt={article.title} />
      <div>
        <p>By: {article.author}</p>
        <p>{formatDate(article.created_at)}</p>
      </div>
      <p>{article.body}</p>
      <p>Votes: {article.votes}</p>
      <CommentList article_id={article_id} />
    </article>
  )
}

export default ArticlePage
