import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import ShieldPlus from '../../../svgs/ShieldPlus.svg'
import DoubleWave from '../../../svgs/DoubleWave.js'
import DoubleWaveMobile from 'svgs/DoubleWaveMobile'
import PlayIcon from '../../../svgs/play-icon.svg'

const ArticleHeroEverGreen = ({ content }) => {
  // const { ctaText, ctaUrl } = content.fields
  // const backgroundImage = content.fields.image.fields.file.url

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
        <h3 className="article-hero__title">{content.fields.title}</h3>
        <div className="article-hero__pub">
          <span>
            {getDateFormat(content.fields.publishDate)} •{' '}
            {content.fields.readLength} read
          </span>
        </div>
        <div className="article-hero__content">
          <div className="article-hero__written">
            <div className="article-hero__written--author">
              <div className="article-hero__author-image">
                {content.fields.author.fields.photo ? (
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
                ) : (
                  <></>
                )}
              </div>
              <div className="article-hero__author-name">
                Written by{' '}
                <span className="name">
                  {content.fields.author.fields.name
                    ? content.fields.author.fields.name
                    : ''}
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
                  {content.fields.doctor.fields.name
                    ? content.fields.doctor.fields.name
                    : ''}
                </span>
              </div>
            </div>
          </div>
          {content.fields.articleHero.fields.videoLink ? (
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
              >
                {content.fields.articleHero.fields.featuredMedia ? (
                  <Image
                    className=""
                    src={`https:${content.fields.articleHero.fields.featuredMedia.fields.file.url}`}
                    alt={`video`}
                    layout="responsive"
                    objectFit="cover"
                    height={
                      content.fields.articleHero.fields.featuredMedia.fields
                        .file.details.image.height
                    }
                    width={
                      content.fields.articleHero.fields.featuredMedia.fields
                        .file.details.image.width
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="article-video__video">
                {hasWindow && (
                  <ReactPlayer
                    url={content.fields.articleHero.fields.videoLink}
                    playing={isPlaying}
                    controls={true}
                    className="article-video__video-player"
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
              <div className="article-hero__image--credit">
                {content.fields.articleHero.fields.photoCredit}
              </div>
            </div>
          ) : (
            <div className="article-hero__image">
              <div className="article-hero__image--desktop">
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
              <div className="article-hero__image--mobile">
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
              <div className="article-hero__image--credit">
                {content.fields.articleHero.fields.photoCredit}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ArticleHeroEverGreen