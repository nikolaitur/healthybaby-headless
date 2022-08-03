import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";

import CollectionCard from '../../Cards/CollectionCard'
import LongArrowRight from '../../../svgs/long-arrow-right.svg'
import HealthyBrain from '../../../svgs/healthy-brain.svg'

const ShopByCategory = ({ content }) => {
    const {header, headerFontStyle, subheader, collectionCards } = content.fields

    return (
        <section className="shop-by-category">
            <div className="shop-by-category__container container">
                <div className="shop-by-category__content">
                    <div className="shop-by-category__subheader">{ subheader }</div>
                    <div className="shop-by-category__header">{ header }</div>
                    <div className="shop-by-category__link">
                        <Link href="/">
                            <div className="shop-by-category__button">
                                <span>Shop All</span>
                                <span><LongArrowRight /></span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="shop-by-category__slider">
                    <Swiper
                        className="shop-by-category__slider--desktop desktop"
                        modules={[Lazy, Navigation]}
                        spaceBetween={20}
                        slidesPerView={3}
                        lazy={true}
                        navigation={true}
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                    >
                        {collectionCards.map((card, index) => (
                            <SwiperSlide key={index}>
                                <CollectionCard content={card}  />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Swiper
                        className="shop-by-category__slider--mobile mobile"
                        modules={[Lazy, Navigation]}
                        spaceBetween={20}
                        slidesPerView={1}
                        lazy={true}
                        navigation={true}
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                    >
                        {collectionCards.map((card, index) => (
                            <SwiperSlide key={index}>
                                <CollectionCard content={card}/>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
                <div className="shop-by-category__info">
                    <span><HealthyBrain /></span>
                    <span className="divider"></span>
                    <span>Pair our products with daily enrichment activities you can integrate with your baby’s routine</span>
                </div>
            </div>
        </section>
    )
}

export default ShopByCategory
