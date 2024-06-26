import { useState, useEffect, useContext } from 'react'
import { fetchCommentsByArticleId, postComment } from '../Utils/api'
import { UserContext } from '../context/UserContext'
import CommentCard from './CommentCard'
import './Style/CommentSection.css'

const CommentSection = ({ article_id }) => {
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newComment, setNewComment] = useState('')
  const [postingError, setPostingError] = useState(null)
  const [posting, setPosting] = useState(false)

  const { user } = useContext(UserContext)

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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (newComment.trim() === '') {
      setPostingError('Comment cannot be empty')
      return
    }
    if (!user) {
      setPostingError('You must be logged in to post a comment')
      return
    }

    setPosting(true)
    postComment(article_id, newComment, user.username)
      .then((response) => {
        setComments((prevComments) => [response.data, ...prevComments])
        setNewComment('')
        setPosting(false)
      })
      .catch((err) => {
        setPostingError(err.message)
        setPosting(false)
      })
  }

  if (loading) return <p>Loading comments...</p>
  if (error) return <p>Error loading comments: {error}</p>

  return (
    <div className="comment-section">
      <form className="comment-form" onSubmit={handleSubmit}>
        <textarea
          className="comment-textarea"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          disabled={posting}
          placeholder="Add your comment here..."
        ></textarea>
        <button className="comment-button" type="submit" disabled={posting}>
          Post Comment
        </button>
        {postingError && <p className="error">{postingError}</p>}
      </form>
      <div className="comment-list">
        {comments.length === 0 ? (
          <p>No comments yet</p>
        ) : (
          comments.map((comment) => (
            <CommentCard
              key={comment.comment_id}
              comment={comment}
              setComments={setComments}
            />
          ))
        )}
      </div>
    </div>
  )
}

export default CommentSection