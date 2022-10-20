import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import PlayIcon from '../../../svgs/play-icon.svg'
import ReactPlayer from 'react-player/lazy'

import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

const ProductFiftyFifty = ({ content }) => {
  // console.log(content)

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

  const mobileImage = content.fields?.imageMobile
    ? content.fields?.imageMobile
    : content.fields?.image

  return (
    <div className="product-fifty-fifty">
      <div
        className={`product-fifty-fifty__container container ${
          content.fields?.flipped
            ? content.fields.flipped == 'True'
              ? 'flipped'
              : ''
            : ''
        }`}
      >
        <div className="product-fifty-fifty__content">
          {content.fields?.videoUrl ? (
            <div className="article-video article-video--mobile">
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
                {mobileImage ? (
                  <Image
                    className=""
                    src={`https:${mobileImage.fields.file.url}`}
                    alt={`video`}
                    layout="responsive"
                    objectFit="cover"
                    height={mobileImage.fields.file?.details.image.height}
                    width={mobileImage.fields.file?.details.image.width}
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="article-video__video">
                {hasWindow && (
                  <ReactPlayer
                    url={content.fields?.videoUrl}
                    playing={isPlaying}
                    controls={true}
                    className="article-video__video-player"
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
            </div>
          ) : mobileImage ? (
            <div className="product-fifty-fifty__image product-fifty-fifty__image--mobile">
              <Image
                src={`https:${mobileImage.fields.file.url}`}
                alt={mobileImage.fields.title}
                width="785"
                height="750"
              />
            </div>
          ) : (
            ''
          )}

          {content.fields?.subheader ? (
            <h6 className="product-fifty-fifty__subheader">
              {content.fields.subheader}
            </h6>
          ) : (
            ''
          )}
          {content.fields?.header ? (
            <h3 className="product-fifty-fifty__header">
              {content.fields.header}
            </h3>
          ) : (
            ''
          )}
          {content.fields?.copy ? (
            <div
              className="product-fifty-fifty__copy large"
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(content.fields.copy),
              }}
            ></div>
          ) : (
            ''
          )}
          {content.fields?.ctaText && content.fields?.ctaUrl ? (
            <Link href={content.fields.ctaUrl}>
              <div className="product-fifty-fifty__link">
                <span>{content.fields.ctaText}</span>
              </div>
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className="product-fifty-fifty__image  product-fifty-fifty__image--desktop">
          {content.fields?.videoUrl ? (
            <div className="article-video article-video--desktop">
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
                {content.fields?.image ? (
                  <Image
                    className=""
                    src={`https:${content.fields.image.fields.file.url}`}
                    alt={`video`}
                    layout="responsive"
                    objectFit="cover"
                    height={
                      content.fields.image.fields.file?.details.image.height
                    }
                    width={
                      content.fields.image.fields.file?.details.image.width
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
              <div className="article-video__video">
                {hasWindow && (
                  <ReactPlayer
                    url={content.fields?.videoUrl}
                    playing={isPlaying}
                    controls={true}
                    className="article-video__video-player"
                    width="100%"
                    height="100%"
                  />
                )}
              </div>
            </div>
          ) : mobileImage ? (
            <Image
              src={`https:${content.fields.image.fields.file.url}`}
              alt={content.fields.image.fields.title}
              width="785"
              height="750"
            />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductFiftyFifty
