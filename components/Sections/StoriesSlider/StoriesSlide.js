import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';

const StoriesSlide = ({ index, slides, activeSlide }) => {
    const swiper = useSwiper();

    return (
        <div className="stories-slide">
            <div className="stories-slide__container">
                <div className="stories-slide__content">
                    <div className="stories-slide__subtitle">
                        HEALTHYBABY COMMUNITY STORIES
                    </div>
                    <div className="stories-slide__title">
                        “Lorem ipsum dolor sit amet consectetur adipiscong”
                    </div>
                    <div className="stories-slide__copy">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </div>
                    <div className="stories-slide__author">
                        — Palmer S.  (Owen’s dad)
                    </div>
                    <div className="stories-slide__age">Owen is 4 months old</div>
                    <div className="stories-slide__activity">Favorite activity:  <span>Core Confidence</span></div>
                    <div className="stories-slide__pagination">
                    {slides.map((slide, index) => (
                        <div className={`stories-slide__indicator ${index == activeSlide ? "active" : ""}`} key={index} onClick={() => swiper.slideTo(index)}></div>
                    ))}
                </div>
                </div>
                <div className="stories-slide__image">
                    <Image
                        src={`https://images.ctfassets.net/urdrzzac4igp/7vwk1qlvTIAgdbpqcyBQy5/ca7c318804045d99da3f640195d32140/Mask_group__1_.png`}
                        alt={``}
                        width="785"
                        height="970"
                    />
                </div>
            </div>
        </div>
    )
}

export default StoriesSlide
