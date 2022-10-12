import React from 'react'
import Image from 'next/image'

const ArticleActivityHeader = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  const { logo, eyebrowText, title, subtitle } = { ...content.fields }
  return (
    <div className="article-activityheader">
      <div className="article-activityheader__eyebrow">{eyebrowText}</div>
      <div className="article-activityheader__title">{title}</div>
      <div className="article-activityheader__image">
        {logo ? (
          <Image
            className=""
            src={'https:' + logo.fields.file.url}
            alt={`image`}
            layout="responsive"
            objectFit="cover"
            height={logo.fields.file.details.image.height}
            width={logo.fields.file.details.image.width}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="article-activityheader__subtitle">{subtitle}</div>
    </div>
  )
}

export default ArticleActivityHeader
