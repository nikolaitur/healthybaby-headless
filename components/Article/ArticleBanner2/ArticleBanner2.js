import React from 'react'
import parse from 'html-react-parser'

const ArticleBanner2 = ({ content }) => {
  const {
    backgroundColor,
    backgroundImage,
    eyebrowText,
    title,
    subtitle,
    linkUrl,
    linkText,
  } = { ...content.fields }
  return (
    <div
      className="article-banner2"
      style={{
        backgroundColor: backgroundColor,
        backgroundImage: `url(${backgroundImage.fields.file.url})`,
      }}
    >
      <div className="article-banner2__eyebrow">{eyebrowText}</div>
      <div className="article-banner2__title">{parse(title)}</div>
      <div className="article-banner2__subtitle">{subtitle}</div>
      <a href={linkUrl} className="article-banner2__link">
        {linkText}
      </a>
    </div>
  )
}

export default ArticleBanner2
