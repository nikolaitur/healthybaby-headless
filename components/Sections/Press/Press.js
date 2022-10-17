import parse from 'html-react-parser'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Lazy, Pagination } from 'swiper'
import PressLogos from './PressLogos'

import 'swiper/css'
import 'swiper/css/pagination'

const Press = ({ content }) => {
  const { eyebrowText, pressItems } = { ...content.fields }
  return (
    <div className="press-section">
      <div className="press-section__eyebrow">{eyebrowText}</div>
      <div className="press-section__items">
        <Swiper
          className="press-section__items-slider"
          modules={[Lazy, Pagination]}
          slidesPerView={1}
          lazy={true}
          pagination={false}
        >
          {pressItems?.map((pressItem, index) => {
            return (
              <SwiperSlide key={index}>
                <div className="press-section__items-title">
                  {pressItem.fields.quote}
                </div>
              </SwiperSlide>
            )
          })}
          <PressLogos content={pressItems} />
        </Swiper>
      </div>
    </div>
  )
}

export default Press
