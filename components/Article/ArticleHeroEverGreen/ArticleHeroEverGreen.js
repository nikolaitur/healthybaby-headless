import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import ShieldPlus from '../../../svgs/ShieldPlus.svg'
import DoubleWave from '../../../svgs/DoubleWave.js'
import DoubleWaveMobile from 'svgs/DoubleWaveMobile'

const ArticleHeroEverGreen = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url

  const getDateFormat = (date) => {
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]

    const d = new Date(date)
    return `${monthNames[d.getMonth()]} ${d.getDate()},  ${d.getFullYear()}`
  }

  return (
    <div
      className="article-hero"
      style={{
        background: `linear-gradient(180deg, ${content.fields.articleHero.fields.backgroundColor} 0%, rgba(199, 224, 229, 0) 100%)`,
      }}
    >
      {content.fields.articleHero.fields.showWave ? (
        <div className="article-hero__wave">
          <span className="svg-wrap article-hero__wave--desktop">
            <DoubleWave
              fillColor={content.fields.articleHero.fields.waveColor}
            />
          </span>
          <span className="svg-wrap article-hero__wave--mobile">
            <DoubleWaveMobile
              fillColor={content.fields.articleHero.fields.waveColor}
            />
          </span>
        </div>
      ) : (
        <></>
      )}

      <div className="article__container">
        <div className="article-hero__breadcrumbs">
          <Link href="/">
            <div className="article-hero__breadcrumb">
              <span>Home /{`\u00A0`}</span>
            </div>
          </Link>
          <Link href="/">
            <div className="article-hero__breadcrumb">
              <span> Breadcrumb</span>
            </div>
          </Link>
        </div>
        <h3 className="article-hero__title">{content.fields.title}</h3>
        <div className="article-hero__pub">
          <span>{getDateFormat(content.fields.publishDate)} • 4 min read</span>
        </div>
        <div className="article-hero__content">
          <div className="article-hero__written">
            <div className="article-hero__written--author">
              <div className="article-hero__author-image">
                <Image
                  className=""
                  src={
                    'https:' +
                    content.fields.author.fields.photo.fields.file.url
                  }
                  alt={`image`}
                  layout="responsive"
                  objectFit="cover"
                  height="50"
                  width="50"
                />
              </div>
              <div className="article-hero__author-name">
                Written by{' '}
                <span className="name">
                  {content.fields.author.fields.name}
                </span>
              </div>
            </div>
            <div className="article-hero__written--reviewer">
              <div className="article-hero__reviewer-icon">
                <ShieldPlus />
              </div>
              <div className="article-hero__author-name">
                Medically Reviewed by{' '}
                <span className="name">
                  {content.fields.doctor.fields.name}
                </span>
              </div>
            </div>
          </div>
          <div className="article-hero__image">
            <div className="article-hero__image--desktop">
              <Image
                className=""
                src={`https://${content.fields.articleHero.fields.featuredMedia.fields.file.url}`}
                alt={`image`}
                layout="responsive"
                objectFit="cover"
                height="700"
                width="650"
              />
            </div>
            <div className="article-hero__image--mobile">
              <Image
                className=""
                src={`https://${content.fields.articleHero.fields.featuredMediaMobile.fields.file.url}`}
                alt={`image`}
                layout="responsive"
                objectFit="cover"
                height="700"
                width="650"
              />
            </div>
            <div className="article-hero__image--credit">
              {content.fields.articleHero.fields.photoCredit}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleHeroEverGreen
