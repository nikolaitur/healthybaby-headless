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
    boldTitle,
    italicTitle,
  } = {...content.fields}
  const image = content.fields.image.fields.file.url

  return (
    <div className="stories-slide">
      <div className="stories-slide__container">
        <div className="stories-slide__content">
          <h6 className="stories-slide__subtitle">{subtitle}</h6>
          <h3
            className={`stories-slide__title ${boldTitle ? 'bold' : ''} ${
              italicTitle ? 'italic' : ''
            }`}
          >
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
        <div className="stories-slide__image">
          <Image src={`https:${image}`} alt={``} width="785" height="970" />
        </div>
      </div>
    </div>
  )
}

export default StoriesSlide
