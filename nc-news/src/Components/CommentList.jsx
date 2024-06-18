import { useState, useEffect } from 'react'
import { fetchCommentsByArticleId, deleteComment } from '../Utils/api'
import CommentCard from './CommentCard'

const CommentList = ({ article_id }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
    fetchCommentsByArticleId(article_id)
      .then((response) => {
        setComments(response.data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [article_id])

  if (loading) return <p>Loading comments...</p>
  if (error) return <p>Error loading comments: {error}</p>
  if (comments.length === 0) return <p>No comments yet</p>

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard key={comment.comment_id} comment={comment} />
      ))}
    </div>
  )
}
export default CommentList
