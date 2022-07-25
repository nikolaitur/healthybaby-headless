import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";

import CollectionCard from '../../Cards/CollectionCard'

const ShopByCategory = ({ content }) => {
    const {header, headerFontStyle, subheader, collectionCards } = content.fields

    return (
        <section className="shop-by-category">
            <div className="shop-by-category__container container">
                <div className="shop-by-category__content">
                    <div className="collection-cards__subheader">{ subheader }</div>
                    <div className="collection-cards__header">{ header }</div>
                </div>
                <div className="shop-by-category__slider">
                    <Swiper
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
                            <SwiperSlide>
                                <CollectionCard content={card} key={index} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </section>
    )
}

export default ShopByCategory
