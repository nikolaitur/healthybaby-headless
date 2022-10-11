import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ArticleShop = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  return (
    <div className="article-shop">
      <div className="article-shop__image">
        {content.fields.image ? (
          <Image
            className=""
            src={`https:${content.fields.image.fields.file.url}`}
            alt={`image`}
            layout="responsive"
            objectFit="cover"
            height={content.fields.image.fields.file.details.image.height}
            width={content.fields.image.fields.file.details.image.width}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="article-shop__info">
        <div className="article-shop__info-eyebrow">
          {content.fields.eyebrowText}
        </div>
        <div className="article-shop__info-title">{content.fields.title}</div>
        <div className="article-shop__info-subtitle">
          {content.fields.subtitle}
        </div>
        <div className="article-shop__info-cta">
          <Link href={content.fields.buttonText}>
            <div className="btn secondary">{content.fields.buttonText}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleShop
