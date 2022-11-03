import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import Image from 'next/image'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Lazy, Pagination } from 'swiper'

import PlayIcon from '../../../svgs/play-icon.svg'
import IconClose from '../../../svgs/close-icon.svg'

const ActivityPreview = ({ content }) => {
  const [hasWindow, setHasWindow] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [videoUrl, setVideoUrl] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHasWindow(true)
    }
  }, [])

  const playVideo = (videoUrl) => {
    setVideoUrl(videoUrl)
    setIsPlaying(true)
  }

  const stopVideo = () => {
    setIsPlaying(false)
  }

  return (
    <div className="activity-preview">
      <div className="activity-preview__content container">
        <div className="activity-preview__pretitle">
          {content.fields?.subtitle}
        </div>
        <div className="activity-preview__title">{content.fields?.title}</div>
        <Swiper
          modules={[Lazy, Pagination]}
          slidesPerView={1}
          threshold={15}
          spaceBetween={0}
          lazy={true}
          pagination={false}
          loop={false}
          breakpoints={{
            768: {
              slidesPerView: 3,
            },
          }}
          className="activity-preview__items"
        >
          {content.fields?.activityPreviewBlocks.map(
            (activityPreviewBlock, index) => {
              return (
                <SwiperSlide className="activity-preview__item" key={index}>
                  <div
                    className="activity-preview__item-image"
                    onClick={() =>
                      playVideo(activityPreviewBlock.fields.videoUrl)
                    }
                  >
                    {activityPreviewBlock.fields?.thumbnailImage.fields?.file
                      ?.url ? (
                      <Image
                        className=""
                        src={`https:${activityPreviewBlock.fields.thumbnailImage.fields.file.url}`}
                        alt={`video`}
                        layout="responsive"
                        objectFit="cover"
                        width={100}
                        height={100}
                      />
                    ) : (
                      <></>
                    )}
                    <div className={`article-video__icon`}>
                      <PlayIcon />
                    </div>
                  </div>
                  <div className="activity-preview__item-label">
                    {activityPreviewBlock.fields?.labelText}
                  </div>
                  <div className="activity-preview__item-title">
                    {activityPreviewBlock.fields?.title}
                  </div>
                  <div className="activity-preview__item-description">
                    {activityPreviewBlock.fields?.description}
                  </div>
                </SwiperSlide>
              )
            }
          )}
        </Swiper>
        <div className={`activity-preview__video ${isPlaying ? 'active' : ''}`}>
          <div className="activity-preview__video-overlay"></div>
          <div className="activity-preview__video-wrap">
            {hasWindow && (
              <ReactPlayer
                url={videoUrl}
                playing={isPlaying}
                controls={true}
                className="activity-preview__video-player"
                width="100%"
                height="100%"
              />
            )}
          </div>
          <div
            className="activity-preview__video-close"
            onClick={() => stopVideo()}
          >
            <IconClose />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActivityPreview
