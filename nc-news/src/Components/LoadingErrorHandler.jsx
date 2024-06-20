import React from 'react'
import NotFound from './NotFound'

const LoadingErrorHandler = ({ loading, error, children }) => {
  if (loading) return <p>Loading...</p>
  if (error === 404) return <NotFound />
  if (error) return <p>Error: {error}</p>

  return children
}

export default LoadingErrorHandler
