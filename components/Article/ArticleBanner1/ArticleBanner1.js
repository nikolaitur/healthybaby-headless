import React from 'react'

const ArticleBanner1 = ({ content }) => {
  const {
    backgroundColor,
    articleTitle,
    articleSubtitle,
    buttonLink,
    buttonText,
  } = { ...content.fields }
  return (
    <div
      className="article-banner1"
      style={{ backgroundColor: backgroundColor }}
    >
      <div className="article-banner1__content">
        <div className="article-banner1__title">{articleTitle}</div>
        <div className="article-banner1__subtitle">{articleSubtitle}</div>
      </div>
      <div className="article-banner1__cta">
        <a href={buttonLink} className="btn primary">
          {buttonText}
        </a>
      </div>
    </div>
  )
}

export default ArticleBanner1
