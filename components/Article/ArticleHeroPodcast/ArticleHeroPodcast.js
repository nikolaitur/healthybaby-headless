import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useState, useEffect } from 'react'
import TranscriptDrawer from './TranscriptDrawer'
import parse from 'html-react-parser'

const articleHeroPodcast = ({ content }) => {
  const { articleHero, title, articleType } = { ...content.fields }

  return (
    <div
      className="podcast-hero"
      style={{
        background: `linear-gradient(180deg, ${
          articleHero?.fields?.backgroundColor
            ? articleHero.fields.backgroundColor
            : '#D6E9E5 '
        } 0%, rgba(240, 227, 229, 0) 100%)`,
      }}
    >
      <div className="container podcast-hero__content">
        <div className="podcast-hero__image">
          <div className="podcast-hero__image--desktop">
            {articleHero?.fields?.featuredMedia?.fields?.file?.url ? (
              <Image
                className=""
                src={`https:${articleHero.fields.featuredMedia.fields.file.url}`}
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
          <h3 className="podcast-hero__title">{parse(title)}</h3>
          <div className="podcast-hero__written">
            {articleHero?.fields?.podcastAuthors ? (
              <>
                With{' '}
                {articleHero.fields.podcastAuthors.map((author, index, row) => {

                  return (
                    <span key={index}>
                      <span className="name">
                        {author.fields?.name}{' '}
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
              {articleHero?.fields?.featuredMediaMobile?.fields?.file?.url ? (
                <Image
                  className=""
                  src={`https:${articleHero.fields.featuredMediaMobile.fields.file.url}`}
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
          {articleHero?.fields?.podcastEmbed ? (
            <>
              <div
                className="podcast-hero__iheart"
                dangerouslySetInnerHTML={{
                  __html: articleHero.fields.podcastEmbed,
                }}
              ></div>

              {articleHero?.fields?.podcastTranscript ? (
                <TranscriptDrawer
                  title={title}
                  content={articleHero.fields.podcastTranscript}
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}

export default articleHeroPodcast
