import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { TopicsProvider } from './context/TopicsContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TopicsProvider>
        <App />
      </TopicsProvider>
    </BrowserRouter>
  </React.StrictMode>
)
