import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header/Header'
import Home from './Components/Home/Home'
import ArticlePage from './Components/ArticlePage'
import NotFound from './Components/NotFound'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:topic" element={<Home />} />
        <Route path="/articles/:article_id" element={<ArticlePage />} />{' '}
        <Route path="*" element={<NotFound />} />{' '}
      </Routes>
    </>
  )
}

export default App
