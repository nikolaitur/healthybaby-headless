import React from 'react'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import Image from 'next/image'

import PlayIcon from '../../../svgs/play-icon.svg'

const ArticleVideo = ({ content }) => {
  const { videoLink, coverImage, coverImageMobile, verticalVideo } = {
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

  return (
    <>
      {videoLink ? (
        <div className={`article-video ${verticalVideo ? 'vertical' : ''}`}>
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
            {coverImage ? (
              <Image
                className=""
                src={`https:${coverImage.fields.file.url}`}
                alt={`video`}
                layout="responsive"
                objectFit="cover"
                height={coverImage.fields?.file?.details.image.height}
                width={coverImage.fields?.file?.details.image.width}
              />
            ) : (
              <></>
            )}
          </div>
          <div className="article-video__video">
            {hasWindow && (
              <ReactPlayer
                url={videoLink}
                playing={isPlaying}
                controls={true}
                className="article-video__video-player"
                width="100%"
                height="100%"
              />
            )}
          </div>
        </div>
      ) : (
        <div className="article-hero__image">
          <div
            className="article-hero__image--desktop"
            style={{
              backgroundImage: `url(https:${coverImage?.fields?.file.url})`,
            }}
          ></div>
          <div
            className="article-hero__image--mobile"
            style={{
              backgroundImage: `url(https:${coverImageMobile?.fields?.file.url})`,
            }}
          ></div>
        </div>
      )}
    </>
  )
}

export default ArticleVideo
