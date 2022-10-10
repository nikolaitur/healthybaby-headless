import React from 'react'
import Image from 'next/image'

const ArticleActivityHeader = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  return (
    <div className="article-activityheader">
      <div className="article-activityheader__eyebrow">
        {content.fields.eyebrowText}
      </div>
      <div className="article-activityheader__title">
        {content.fields.title}
      </div>
      <div className="article-activityheader__image">
        <Image
          className=""
          src={'https:' + content.fields.logo.fields.file.url}
          alt={`image`}
          layout="responsive"
          objectFit="cover"
          height={content.fields.logo.fields.file.details.image.height}
          width={content.fields.logo.fields.file.details.image.width}
        />
      </div>
      <div className="article-activityheader__subtitle">
        {content.fields.subtitle}
      </div>
    </div>
  )
}

export default ArticleActivityHeader
