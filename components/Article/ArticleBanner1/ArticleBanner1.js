import React from 'react'

const ArticleBanner1 = ({ content }) => {
  return (
    <div
      className="article-banner1"
      style={{ backgroundColor: content.fields.backgroundColor }}
    >
      <div className="article-banner1__content">
        <div className="article-banner1__title">
          {content.fields.articleTitle}
        </div>
        <div className="article-banner1__subtitle">
          {content.fields.articleSubtitle}
        </div>
      </div>
      <div className="article-banner1__cta">
        <a href={content.fields.buttonLink} className="btn primary">
          {content.fields.buttonText}
        </a>
      </div>
    </div>
  )
}

export default ArticleBanner1
