import React from 'react'
import Image from 'next/image'

const ArticleAuthorSpotlight = ({ content }) => {
  const { photo, name, description, linkText, linkUrl } = { ...content.fields }
  return (
    <div className="article-author">
      <div className="article-author__photo">
        {photo?.fields?.file?.url ? (
          <Image
            className=""
            src={`https:${photo.fields.file.url}`}
            alt={`image`}
            layout="responsive"
            objectFit="cover"
            height="317"
            width="317"
          />
        ) : (
          <></>
        )}
      </div>
      <div className="article-author__content">
        <div className="article-author__name">{name}</div>
        <div className="article-author__description">{description}</div>
        {linkText && linkUrl ? (
          <a href={linkUrl} className="article-author__link">
            {linkText}
          </a>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}

export default ArticleAuthorSpotlight
