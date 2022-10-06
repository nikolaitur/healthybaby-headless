import React from 'react'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import Image from 'next/image'

import PlayIcon from '../../../svgs/play-icon.svg'

const ArticleVideo = ({ content }) => {
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

  return (
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
        <Image
          className=""
          src={`https:${content.fields.coverImage.fields.file.url}`}
          alt={`video`}
          layout="responsive"
          objectFit="cover"
          height={content.fields.coverImage.fields.file.details.image.height}
          width={content.fields.coverImage.fields.file.details.image.width}
        />
      </div>
      <div className="article-video__video">
        {hasWindow && (
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ysz5S6PUM-U"
            playing={isPlaying}
            controls={true}
            className="article-video__video-player"
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  )
}

export default ArticleVideo
