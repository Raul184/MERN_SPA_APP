import React from 'react'
import './error.styles.scss'

export const Error = () => {
  console.log('Rendering Error Page');
  return (
    <main className="main">
      <div className="error">
        <div className="error__title">
          <h2 className="heading-secondary heading-secondary--error">
            Uh oh! Something went wrong!
          </h2>
          <h2 className="error__emoji">😢 🤯</h2>
          <div className="error__msg">Page not found!</div>
        </div>
      </div>
    </main>
  )
}