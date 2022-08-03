import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";

import ProductCard from '../../Cards/ProductCard'
import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const BestSellers = ({ content }) => {
    // const {header, headerFontStyle, subheader, collectionCards } = content.fields

    return (
        <section className="best-sellers">
            <div className="best-sellers__container container">
                <div className="best-sellers__content">
                    <div className="best-sellers__header">Our <i>Best</i> Sellers</div>
                    <div className="best-sellers__link">
                        <Link href="/">
                            <div className="best-sellers__button">
                                <span>Shop All</span>
                                <span><LongArrowRight /></span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="best-sellers__slider">
                    <Swiper
                        className="best-sellers__slider--desktop"
                        modules={[Lazy, Navigation]}
                        spaceBetween={20}
                        slidesPerView={3}
                        lazy={true}
                        navigation={false}
                        style={{
                            "--swiper-navigation-color": "#fff",
                            "--swiper-pagination-color": "#fff",
                        }}
                    >
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                    </Swiper>
                    <Swiper
                        className="best-sellers__slider--mobile"
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
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <ProductCard />
                        </SwiperSlide>
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default BestSellers
