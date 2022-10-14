import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
const articleHeroPodcast = ({ content }) => {
  const { podcastHero, title, articleType } = { ...content.fields }
  return (
    <div
      className="podcast-hero"
      style={{
        background: `linear-gradient(180deg, ${
          podcastHero.fields?.backgroundColor
            ? podcastHero.fields.backgroundColor
            : '#D6E9E5 '
        } 0%, rgba(240, 227, 229, 0) 100%)`,
      }}
    >
      <div className="container podcast-hero__content">
        <div className="podcast-hero__image">
          <div className="podcast-hero__image--desktop">
            {podcastHero.fields?.featuredMedia ? (
              <Image
                className=""
                src={`https:${podcastHero.fields.featuredMedia.fields.file.url}`}
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
          <div className="podcast-hero__type">{articleType}</div>
          <h3 className="podcast-hero__title">{title}</h3>
          <div className="podcast-hero__written">
            {podcastHero.fields?.podcastAuthors ? (
              <>
                With{' '}
                {podcastHero.fields.podcastAuthors.map((author, index, row) => {
                  return (
                    <span key={index}>
                      <span className="name">
                        {author.fields.name}{' '}
                        {index + 1 === row.length ? '' : '+'}
                      </span>
                      {index + 1 === row.length ? '' : <>&nbsp;&nbsp;</>}
                    </span>
                  )
                })}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="podcast-hero__image">
            <div className="podcast-hero__image--mobile">
              {podcastHero.fields?.featuredMediaMobile ? (
                <Image
                  className=""
                  src={`https:${podcastHero.fields.featuredMediaMobile.fields.file.url}`}
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
          {podcastHero.fields?.podcastEmbed ? (
            <div
              className="podcast-hero__iheart"
              dangerouslySetInnerHTML={{
                __html: podcastHero.fields.podcastEmbed,
              }}
            ></div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default articleHeroPodcast
