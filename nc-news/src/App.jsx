import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Components/Home'
import ArticlePage from './Components/ArticlePage'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:topic" element={<Home />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />{' '}
      </Routes>
    </>
  )
}

export default App
