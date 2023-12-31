import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import ThreeStarsIcon from '@/svgs/three-stars.svg'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, EffectFade, Autoplay } from "swiper";
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
    // const slides = [1, 2, 3]
    const slides = content.fields.storiesSlides

    const displayStars = content.fields.displayStars
    const contentAlignment = content.fields.contentAlignment
    return (
        <section className="stories-slider" data-background-color={content.fields?.backgroundColor ? content.fields.backgroundColor.toLowerCase() : ""}>
            <div className="stories-slider__container container">
                <div className={`stories-slider__slider stories-slider__slider-content-alignment--${contentAlignment ? contentAlignment.toLowerCase() : 'left'}`}>
                    {displayStars && <div className="stories-slider__image-top-stars">
                        <div className="stories-slider__image-three-stars">
                            <ThreeStarsIcon />
                        </div>
                    </div>}
                    <Swiper
                        modules={[Lazy, EffectFade, Autoplay]}
                        spaceBetween={20}
                        threshold={15}
                        slidesPerView={1}
                        lazy={true}
                        effect={"fade"}
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        autoplay={{
                            delay: 6000
                        }}
                        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                        onSwiper={(swiper) => setActiveSlide(swiper.activeIndex)}
                    >
                        {slides.map((slide, index) => (
                            <SwiperSlide key={index}>
                               <StoriesSlide index={index} content={slide} slides={slides} activeSlide={activeSlide} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    {displayStars && <div className="stories-slider__image-bottom-stars">
                        <div className="stories-slider__image-three-stars">
                            <ThreeStarsIcon />
                        </div>
                    </div>}
                </div>
            </div>
        </section>
    )
}

export default StoriesSlider
