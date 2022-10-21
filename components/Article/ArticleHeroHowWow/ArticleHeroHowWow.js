import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ArrowLeftHowWowHero from 'svgs/arrow-left-howwowhero.svg'
import ArrowRightHowWowHero from 'svgs/arrow-right-howwowhero.svg'

const ArticleHeroHowWow = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = image.fields.file.url

  const { articleHero } = {
    ...content.fields,
  }

  return (
    <div className="wowhow-hero">
      <div className="wowhow-hero__background">
        <div
          className="wowhow-hero__background--mobile"
          style={{
            backgroundImage: `url(https:${articleHero?.fields?.featuredMediaMobile?.fields?.file.url})`,
          }}
        ></div>
        <div
          className="wowhow-hero__background--desktop"
          style={{
            backgroundImage: `url(https:${articleHero?.fields?.featuredMedia?.fields?.file.url})`,
          }}
        ></div>
      </div>
      <div className="wowhow-hero__gradient"></div>
      <div className="wowhow-hero__content">
        <div className="wowhow-hero__icon">
          {articleHero?.fields?.icon?.fields ? (
            <Image
              className=""
              src={`https:${articleHero?.fields?.icon.fields.file.url}`}
              alt={`image`}
              layout="responsive"
              objectFit="cover"
              height={48}
              width={48}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="wowhow-hero__type">
          {articleHero?.fields?.eyebrowText}
        </div>
        <h3 className="wowhow-hero__title">{articleHero?.fields?.title}</h3>
        <h3 className="wowhow-hero__subtitle">
          {articleHero?.fields?.subtitle}
        </h3>
        <div className="wowhow-hero__content"></div>
      </div>
      <div className="wowhow-hero__links">
        <div className="wowhow-hero__links--left">
          <Link href={articleHero?.fields?.prevArrowLink || ''}>
            <ArrowLeftHowWowHero />
          </Link>
        </div>
        <div className="wowhow-hero__links--right">
          <Link href={articleHero?.fields?.nextArrowLink || ''}>
            <ArrowRightHowWowHero />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ArticleHeroHowWow
