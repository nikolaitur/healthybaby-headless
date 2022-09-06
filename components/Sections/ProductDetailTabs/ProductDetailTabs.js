import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import ProductDetailSlide from './ProductDetailSlide';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const ProductDetailTabs = ({ content }) => {
   const { header, subheader, sections } = content.fields
   console.log(content)

   const swiper = useSwiper();
   console.log(swiper)

   const [activeSlide, setActiveSlide] = useState(0);

    return (
        <section className="product-detail-tabs">
            <div className="product-detail-tabs__container container">
                <div classname="product-detail-tabs__content">
                    <h6 className="product-detail-tabs__subheader">{ subheader }</h6>
                    <h2 className="product-detail-tabs__header">{ header }</h2>
                    <div className="product-detail-tabs__tabs">
                        <div className="product-detail-tabs__tab active" onClick={() => swiper.slideTo(0)}>Preconception + Trimester 1</div>
                        <div className="product-detail-tabs__tab" onClick={() => swiper.slideTo(1)}>Trimester 2</div>
                        <div className="product-detail-tabs__tab" onClick={() => swiper.slideTo(2)}>Trimester 3</div>
                        <div className="product-detail-tabs__tab" onClick={() => swiper.slideTo(3)}>Postnatal + Trimester 4</div>
                    </div>
                </div>
                <div className="product-detail-tabs__slider"></div>
                    <Swiper
                        className="product-detail-tabs__slider"
                        modules={[EffectFade]}
                        spaceBetween={20}
                        slidesPerView={1}
                        effect={"fade"}
                        style={{
                            "--swiper-pagination-color": "#00B188"
                        }}
                        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                        onSwiper={(swiper) => setActiveSlide(swiper.activeIndex)}
                    >
                        <SwiperSlide>
                            <ProductDetailSlide activeSlide={activeSlide} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductDetailSlide activeSlide={activeSlide} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductDetailSlide activeSlide={activeSlide} />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductDetailSlide activeSlide={activeSlide} />
                        </SwiperSlide>
                    </Swiper>
            </div>   
        </section>
    )
}

export default ProductDetailTabs
