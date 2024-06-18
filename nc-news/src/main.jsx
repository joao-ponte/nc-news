import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { TopicsProvider } from './context/TopicsContext.jsx'
import { UserProvider } from './context/UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <TopicsProvider>
          <App />
        </TopicsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
)
