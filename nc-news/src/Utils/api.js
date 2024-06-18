import axios from 'axios'

const api = axios.create({
  baseURL: 'https://be-nc-news-ttz6.onrender.com/api',
})

export const fetchArticles = (sortBy = 'created_at', order = 'desc') => {
  return api.get('/articles')
}

export const fetchTopics = () => {
  return api.get('/topics')
}

export const fetchArticleById = (article_id) => {
  return api.get(`/articles/${article_id}`)
}

export const fetchUsers = () => {
  return api.get('/users')
}

export const fetchCommentsByArticleId = (article_id) => {
  return api.get(`/articles/${article_id}/comments`)
}

export const postComment = (article_id, body, username) => {
  return api.post(`/articles/${article_id}/comments`, {
    username,
    body,
  })
}

export const deleteComment = (comment_id) => {
  return api.delete(`/comments/${comment_id}`)
}
