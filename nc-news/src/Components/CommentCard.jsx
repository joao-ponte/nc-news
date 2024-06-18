import React from 'react'

const CommentCard = ({ comment, onDelete }) => {
  const { author, body, votes } = comment

  return (
    <div>
      <p>
        <strong>{author}</strong>
      </p>
      <p>{body}</p>
      <div>
        <button>({votes})</button>
        <button>Delete</button>
      </div>
    </div>
  )
}

export default CommentCard
