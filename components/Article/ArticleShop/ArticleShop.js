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
          src={`https://images.ctfassets.net/urdrzzac4igp/53rLh7AGXQVR2AW0DF4iTq/9f996b64bb25d31dbac5d6f994981117/Mask_group__20_.png`}
          alt={`image`}
          layout="responsive"
          objectFit="cover"
          height="700"
          width="650"
        />
      </div>
      <div className="article-shop__info">
        <div className="article-shop__info-eyebrow">
          Our Monthly Diaper Bundle
        </div>
        <div className="article-shop__info-title">
          Shop the safest diaper for baby’s developing brain &#38; body
        </div>
        <div className="article-shop__info-subtitle">
          Optional sub-copy goes here sint occaecat cupidatat non proident, sunt
          in culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <div className="article-shop__info-cta">
          <Link href="/">
            <div className="btn secondary">Shop Now</div>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleShop
