import React from 'react'

const ArticlePullQuote = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  return (
    <div className="article-quote">
      <div className="article-quote__content">{content.fields.quote}</div>
      <div className="article-quote__author">— {content.fields.author}</div>
    </div>
  )
}

export default ArticlePullQuote
