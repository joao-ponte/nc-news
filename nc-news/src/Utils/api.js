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
