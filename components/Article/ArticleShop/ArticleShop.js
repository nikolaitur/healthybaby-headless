import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ArticleShop = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url
  return (
    <div className="article-shop">
      <div className="article-shop__image">
        <Image
          className=""
          src={`https:${content.fields.articleShop.fields.image.fields.file.url}`}
          alt={`image`}
          layout="responsive"
          objectFit="cover"
          height={
            content.fields.articleShop.fields.image.fields.file.details.image
              .height
          }
          width={
            content.fields.articleShop.fields.image.fields.file.details.image
              .width
          }
        />
      </div>
      <div className="article-shop__info">
        <div className="article-shop__info-eyebrow">
          {content.fields.articleShop.fields.eyebrowText}
        </div>
        <div className="article-shop__info-title">
          {content.fields.articleShop.fields.title}
        </div>
        <div className="article-shop__info-subtitle">
          {content.fields.articleShop.fields.subtitle}
        </div>
        <div className="article-shop__info-cta">
          <Link href={content.fields.articleShop.fields.buttonText}>
            <div className="btn secondary">
              {content.fields.articleShop.fields.buttonText}
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleShop
