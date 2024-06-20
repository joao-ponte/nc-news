import { useState } from 'react'
import { deleteComment } from '../Utils/api'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'

const CommentCard = ({ comment, onDelete }) => {
  const { author, body, votes, comment_id } = comment
  const { user } = useContext(UserContext)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = () => {
    setDeleting(true)
    deleteComment(comment_id)
      .then(() => {
        console.log(`Successfully deleted comment with ID: ${comment_id}`)
        onDelete(comment_id)
      })
      .catch((err) => {
        console.error(
          `Error deleting comment with ID: ${comment_id}`,
          err.message
        )
        setDeleting(false)
      })
  }

  return (
    <div className="comment-card">
      <p>
        <strong>{author}</strong>
      </p>
      <p>{body}</p>
      <div>
        <button>({votes})</button>
        {user && user.username === author && (
          <button onClick={handleDelete} disabled={deleting}>
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        )}
      </div>
    </div>
  )
}

export default CommentCard
