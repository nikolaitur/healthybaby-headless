import React from 'react'

const ArticlePullQuote = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  return (
    <div className="article-quote">
      <div className="article-quote__content">
        “This is a pull quote duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat.”
      </div>
      <div className="article-quote__author">
        — John Doe, Optional Credit Here
      </div>
    </div>
  )
}

export default ArticlePullQuote
