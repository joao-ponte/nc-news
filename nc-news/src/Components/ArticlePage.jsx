import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { fetchArticleById, voteOnArticle } from '../Utils/api'
import { formatDate } from '../Utils/formatDate'
import CommentSection from './CommentSection'
import LoadingErrorHandler from './LoadingErrorHandler'

const ArticlePage = () => {
  const { article_id } = useParams()
  const [article, setArticle] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [voteError, setVoteError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchArticleById(article_id)
      .then((response) => {
        setArticle(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.response?.status)
        setLoading(false)
      })
  }, [article_id])

  const handleVote = (inc_votes) => {
    setVoteError(null)
    setArticle((prevArticle) => ({
      ...prevArticle,
      votes: prevArticle.votes + inc_votes,
    }))

    voteOnArticle(article_id, inc_votes).catch((err) => {
      setArticle((prevArticle) => ({
        ...prevArticle,
        votes: prevArticle.votes - inc_votes,
      }))
      setVoteError('Failed to update vote. Please try again.')
    })
  }

  return (
    <LoadingErrorHandler loading={loading} error={error}>
      {article && (
        <article>
          <h2>{article.title}</h2>
          <img src={article.article_img_url} alt={article.title} />
          <div>
            <p>By: {article.author}</p>
            <p>{formatDate(article.created_at)}</p>
          </div>
          <p>{article.body}</p>
          <p>Votes: {article.votes}</p>
          <div className="vote-buttons">
            <button onClick={() => handleVote(1)}>Upvote</button>
            <button onClick={() => handleVote(-1)}>Downvote</button>
          </div>
          {voteError && <p className="vote-error">{voteError}</p>}
          <CommentSection article_id={article_id} />
        </article>
      )}
    </LoadingErrorHandler>
  )
}

export default ArticlePage
