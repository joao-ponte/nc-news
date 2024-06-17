import { useState, useEffect, useContext } from 'react'

const Home = () => {
  const [articles, setArticles] = useState([])
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setLoading(true)
  })

  return <h1>Hello</h1>
}

export default Home
