import Image from 'next/image'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Lazy, Pagination } from 'swiper'
import { useState, useEffect } from 'react'

import 'swiper/css'
import 'swiper/css/pagination'

const PressLogos = ({ content }) => {
  const swiper = useSwiper()
  const [activeIndex, setActiveIndex] = useState(0)
  const onLogoClick = (index) => {
    swiper.slideTo(index)
    setActiveIndex(index)
  }
  return (
    <div className="press-logos">
      <Swiper
        className="press-section__items-slider"
        modules={[Lazy, Pagination]}
        slidesPerView={3}
        threshold={15}
        spaceBetween={0}
        lazy={true}
        pagination={false}
        loop={false}
        breakpoints={{
          768: {
            slidesPerView: 7,
          },
        }}
      >
        {content?.map((pressItem, index) => {
          return (
            <SwiperSlide key={index}>
              <div
                className={`press-logos__item ${
                  index === activeIndex ? 'active' : ''
                }`}
                onClick={() => {
                  onLogoClick(index)
                }}
              >
                {pressItem?.fields?.pressLogo?.fields?.file?.url && <img
                  className=""
                  src={`https:${pressItem.fields.pressLogo.fields.file.url}`}
                  alt={`image`}
                />}
              </div>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </div>
  )
}

export default PressLogos
