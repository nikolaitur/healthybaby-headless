import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import ShieldPlus from '../../../svgs/ShieldPlus.svg'
import DoubleWave from '../../../svgs/DoubleWave.js'
import DoubleWaveMobile from 'svgs/DoubleWaveMobile'
import PlayIcon from '../../../svgs/play-icon.svg'
import parse from 'html-react-parser'

const ArticleHeroEverGreen = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = image.fields.file.url

  const {
    articleHero,
    title,
    publishDate,
    readLength,
    author,
    doctor,
    articleType,
  } = {
    ...content.fields,
  }

  const [hasWindow, setHasWindow] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)
    }
  }, [])

  const playVideo = () => {
    setIsPlaying(true)
  }

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
        background: `linear-gradient(180deg, ${
          articleHero.fields?.backgroundColor
            ? articleHero.fields.backgroundColor
            : '#C7E0E5 '
        } 0%, rgba(199, 224, 229, 0) 100%)`,
      }}
    >
      {articleHero.fields?.showWave ? (
        <div className="article-hero__wave">
          <span className="svg-wrap article-hero__wave--desktop">
            <DoubleWave fillColor={articleHero.fields.waveColor} />
          </span>
          <span className="svg-wrap article-hero__wave--mobile">
            <DoubleWaveMobile fillColor={articleHero.fields.waveColor} />
          </span>
        </div>
      ) : (
        <></>
      )}

      <div className="article__container">
        <div className="article-hero__type">{articleType}</div>
        <h3 className="article-hero__title">{parse(title)}</h3>
        <div className="article-hero__pub">
          <span>
            {getDateFormat(publishDate)} • {readLength} read
          </span>
        </div>
        <div className="article-hero__content">
          <div className="article-hero__written">
            {author ? (
              <div className="article-hero__written--author">
                <div className="article-hero__author-image">
                  {author.fields?.photo ? (
                    <Image
                      className=""
                      src={'https:' + author.fields.photo.fields.file.url}
                      alt={`image`}
                      layout="responsive"
                      objectFit="cover"
                      height="50"
                      width="50"
                    />
                  ) : (
                    <></>
                  )}
                </div>
                <div className="article-hero__author-name">
                  Written by{' '}
                  <span className="name">
                    {author.fields.name ? author.fields.name : ''}
                  </span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {doctor ? (
              <div className="article-hero__written--reviewer">
                <div className="article-hero__reviewer-icon">
                  <ShieldPlus />
                </div>
                <div className="article-hero__author-name">
                  Medically Reviewed by <span className="name">{doctor}</span>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {articleHero.fields?.videoLink ? (
            <div className="article-video">
              <div
                className={`article-video__icon ${isPlaying ? 'hide' : ''}`}
                onClick={() => playVideo()}
              >
                <PlayIcon />
              </div>
              <div
                className={`article-video__image ${isPlaying ? 'hide' : ''}`}
                onClick={() => playVideo()}
                style={{
                  backgroundImage: `url(https:${articleHero.fields?.featuredMedia.fields?.file.url})`,
                }}
              >
                {/* {articleHero.fields?.featuredMedia.fields.file ? (
                  <Image
                    className=""
                    src={`https:${articleHero.fields?.featuredMedia.fields.file.url}`}
                    alt={`video`}
                    layout="responsive"
                    objectFit="cover"
                    height={250}
                    width={
                      articleHero.fields.featuredMedia.fields.file.details.image
                        .width
                    }
                  />
                ) : (
                  <></>
                )} */}
              </div>
              <div className="article-video__video">
                {hasWindow && (
                  <ReactPlayer
                    url={articleHero.fields.videoLink}
                    playing={isPlaying}
                    controls={true}
                    className="article-video__video-player"
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
              <div className="article-hero__image--credit">
                {articleHero.fields?.photoCredit}
              </div>
            </div>
          ) : (
            <div className="article-hero__image">
              <div
                className="article-hero__image--desktop"
                style={{
                  backgroundImage: `url(https:${articleHero?.fields?.featuredMedia?.fields?.file.url})`,
                }}
              ></div>
              <div
                className="article-hero__image--mobile"
                style={{
                  backgroundImage: `url(https:${articleHero?.fields?.featuredMediaMobile?.fields?.file.url})`,
                }}
              ></div>
              <div className="article-hero__image--credit">
                {articleHero.fields.photoCredit}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleHeroEverGreen
