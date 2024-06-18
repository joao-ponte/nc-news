import React from 'react'
import CommentCard from './CommentCard'

const CommentList = ({ comments }) => {
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
