import React from 'react'
import Image from 'next/image'

const ArticleAuthorSpotlight = ({ content }) => {
  return (
    <div className="article-author">
      <div className="article-author__photo">
        <Image
          className=""
          src={`https:${content.fields.photo.fields.file.url}`}
          alt={`image`}
          layout="responsive"
          objectFit="cover"
          height="317"
          width="317"
        />
      </div>
      <div className="article-author__content">
        <div className="article-author__name">{content.fields.name}</div>
        <div className="article-author__description">
          {content.fields.description}
        </div>
        <a href={content.fields.linkUrl} className="article-author__link">
          {content.fields.linkText}
        </a>
      </div>
    </div>
  )
}

export default ArticleAuthorSpotlight
