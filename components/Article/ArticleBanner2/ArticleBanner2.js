import React from 'react'

const ArticleBanner2 = ({ content }) => {
  return (
    <div
      className="article-banner2"
      style={{
        backgroundColor: content.fields.backgroundColor,
        backgroundImage: `url(${content.fields.backgroundImage.fields.file.url})`,
      }}
    >
      <div className="article-banner2__eyebrow">
        {content.fields.eyebrowText}
      </div>
      <div className="article-banner2__title">{content.fields.title}</div>
      <div className="article-banner2__subtitle">{content.fields.subtitle}</div>
      <a href={content.fields.linkUrl} className="article-banner2__link">
        {content.fields.linkText}
      </a>
    </div>
  )
}

export default ArticleBanner2
