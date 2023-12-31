import React from 'react'
import Image from 'next/image'
import parse from 'html-react-parser'

const ArticleActivityHeader = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  const { logo, eyebrowText, title, subtitle } = { ...content.fields }
  return (
    <div className="article-activityheader">
      <div className="article-activityheader__eyebrow">{eyebrowText}</div>
      <div className="article-activityheader__title">{parse(title)}</div>
      <div className="article-activityheader__image">
        {logo.fields?.file?.url ? (
          <img src={'https:' + logo.fields.file.url} alt={logo.fields.title} />
        ) : (
          <></>
        )}
      </div>
      <div className="article-activityheader__subtitle">{subtitle}</div>
    </div>
  )
}

export default ArticleActivityHeader
