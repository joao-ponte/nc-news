import React from 'react'
import CommentCard from './CommentCard'

const CommentList = ({ comments, onDelete }) => {
  if (comments.length === 0) return <p>No comments yet</p>

  return (
    <div className="comment-list">
      {comments.map((comment) => (
        <CommentCard
          key={comment.comment_id}
          comment={comment}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default CommentList
