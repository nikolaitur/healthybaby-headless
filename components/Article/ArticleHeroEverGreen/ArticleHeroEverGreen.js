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
        background:
          'linear-gradient(180deg, #C7E0E5 0%, rgba(199, 224, 229, 0) 100%)',
      }}
    >
      <div className="article-hero__wave">
        <span className="svg-wrap article-hero__wave--desktop">
          <DoubleWave fillColor="#C7E0E5" />
        </span>
        <span className="svg-wrap article-hero__wave--mobile">
          <DoubleWaveMobile fillColor="#C7E0E5" />
        </span>
      </div>
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
            <Image
              className=""
              src={`https://images.ctfassets.net/urdrzzac4igp/53rLh7AGXQVR2AW0DF4iTq/9f996b64bb25d31dbac5d6f994981117/Mask_group__20_.png`}
              alt={`image`}
              layout="responsive"
              objectFit="cover"
              height="700"
              width="650"
            />
            <div className="article-hero__image--credit">
              Photo Credit Goes Here
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArticleHeroEverGreen
