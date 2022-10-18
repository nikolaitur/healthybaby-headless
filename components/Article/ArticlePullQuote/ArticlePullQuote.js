import React from 'react'

const ArticlePullQuote = ({ content }) => {
  const { quote, author } = { ...content.fields }
  return (
    <div className="article-quote">
      <div className="article-quote__content">{quote}</div>
      <div className="article-quote__author">— {author}</div>
    </div>
  )
}

export default ArticlePullQuote
