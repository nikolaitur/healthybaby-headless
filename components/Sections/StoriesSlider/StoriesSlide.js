import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser'

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'

const StoriesSlide = ({ content, slides, activeSlide }) => {
  const swiper = useSwiper()

  const {
    title,
    subtitle,
    copy,
    author,
    age,
    activity,
    image
  } = {...content.fields}

  return (
    <div className="stories-slide">
      <div className="stories-slide__container">
        <div className="stories-slide__content">
          <h6 className="stories-slide__subtitle">{subtitle}</h6>
          <h3 className={`stories-slide__title`}>
            {parse(title)}
          </h3>
          <h5 className="stories-slide__copy">{copy}</h5>
          <div className="stories-slide__author">{author}</div>
          <div className="stories-slide__age">{age}</div>
          <div className="stories-slide__activity">
            Favorite activity: <span>{activity}</span>
          </div>
          <div className="stories-slide__pagination">
            {slides.map((slide, index) => (
              <div
                className={`stories-slide__indicator ${
                  index == activeSlide ? 'active' : ''
                }`}
                key={index}
                onClick={() => swiper.slideTo(index)}
              ></div>
            ))}
          </div>
        </div>
        <div className="stories-slide__image-container">
          <div className="stories-slide__image">
            {image?.fields?.file?.url && <Image
              src={`https:${image.fields.file.url}`}
              alt={title}
              sizes="(min-width: 1400px) 1400px"
              layout="fill"
            />}
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoriesSlide
