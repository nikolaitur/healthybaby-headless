import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, EffectFade } from "swiper";
import StoriesSlide from './StoriesSlide'

import 'swiper/css';
import "swiper/css/lazy";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const StoriesSlider = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url
    const [activeSlide, setActiveSlide] = useState(0);
    // const swiper = useSwiper();
    const slides = [1, 2, 3]
    
    return (
        <section className="stories-slider">
            <div className="stories-slider__container container">
                <div className="stories-slider__slider">
                    <Swiper
                        modules={[Lazy, EffectFade]}
                        spaceBetween={20}
                        slidesPerView={1}
                        lazy={true}
                        effect={"fade"}
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                        onSwiper={(swiper) => setActiveSlide(swiper.activeIndex)}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                               <StoriesSlide index={index} slides={slides} activeSlide={activeSlide} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default StoriesSlider
