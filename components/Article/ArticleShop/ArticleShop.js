import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const ArticleShop = ({ content }) => {
  const { image, eyebrowText, title, subtitle, buttonText, buttonLink } = {
    ...content.fields,
  }
  return (
    <div className="article-shop">
      <div className="article-shop__image">
        {image ? (
          <Image
            className=""
            src={`https:${image.fields.file.url}`}
            alt={`image`}
            layout="responsive"
            objectFit="cover"
            height={image.fields.file.details.image.height}
            width={image.fields.file.details.image.width}
          />
        ) : (
          <></>
        )}
      </div>
      <div className="article-shop__info">
        <div className="article-shop__info-eyebrow">{eyebrowText}</div>
        <div className="article-shop__info-title">{title}</div>
        <div className="article-shop__info-subtitle">{subtitle}</div>
        <div className="article-shop__info-cta">
          <Link href={buttonLink || ''}>
            <div className="btn secondary">{buttonText}</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleShop
