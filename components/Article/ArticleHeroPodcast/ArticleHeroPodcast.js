import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const ArticleHeroPodcast = ({ content }) => {
  return (
    <div
      className="podcast-hero"
      style={{
        background:
          'linear-gradient(180deg, #D6E9E5 0%, rgba(240, 227, 229, 0) 100%)',
      }}
    >
      <div className="container podcast-hero__content">
        <div className="podcast-hero__image">
          <div className="podcast-hero__image--desktop">
            {content.fields.articleHero.fields.featuredMedia ? (
              <Image
                className=""
                src={`https:${content.fields.articleHero.fields.featuredMedia.fields.file.url}`}
                alt={`image`}
                layout="responsive"
                objectFit="cover"
                height="700"
                width="650"
              />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="podcast-hero__info">
          <div className="podcast-hero__breadcrumbs">
            <Link href="/">
              <div className="podcast-hero__breadcrumb">
                <span>Home /{`\u00A0`}</span>
              </div>
            </Link>
            <Link href="/">
              <div className="podcast-hero__breadcrumb">
                <span> Breadcrumb</span>
              </div>
            </Link>
          </div>
          <h3 className="podcast-hero__title">{content.fields.title}</h3>
          <div className="podcast-hero__written">
            With{' '}
            <span className="name">
              {content.fields.author.fields.name
                ? content.fields.author.fields.name
                : ''}{' '}
              +
            </span>
            &nbsp;&nbsp;
            <span className="name">
              {content.fields.doctor.fields.name
                ? content.fields.doctor.fields.name
                : ''}
            </span>
          </div>
          <div className="podcast-hero__image">
            <div className="podcast-hero__image--mobile">
              {content.fields.articleHero.fields.featuredMediaMobile ? (
                <Image
                  className=""
                  src={`https:${content.fields.articleHero.fields.featuredMediaMobile.fields.file.url}`}
                  alt={`image`}
                  layout="responsive"
                  objectFit="cover"
                  height="700"
                  width="650"
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div
            className="podcast-hero__iheart"
            dangerouslySetInnerHTML={{
              __html:
                content.fields.articleHero.fields.podcastEmbed.content[0]
                  .content[0].value,
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}

export default ArticleHeroPodcast
