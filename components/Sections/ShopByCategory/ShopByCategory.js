import React from 'react'
import Link from 'next/link';
import parse from 'html-react-parser'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";

import CollectionCard from '../../Cards/CollectionCard'
import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const ShopByCategory = ({ content }) => {
    const {header, subheader, collectionCards, ctaText, ctaUrl, enableInfoBanner, infoBannerImage, infoBannerText  } = {...content.fields}

    return (
        <section className="shop-by-category">
            <div className="shop-by-category__container container">
                <div className="shop-by-category__content">
                    <h6 className="shop-by-category__subheader">{ subheader }</h6>
                    {header && <h2 className="shop-by-category__header">{ parse(header) }</h2>}
                    <div className="shop-by-category__link">
                        {ctaText && ctaUrl && <Link href={ctaUrl || ''}>
                            <div className="shop-by-category__button">
                                <span>{ctaText}</span>
                                <span><LongArrowRight /></span>
                            </div>
                        </Link>}
                    </div>
                </div>
                <div className="shop-by-category__slider">
                    <Swiper
                        className="shop-by-category__slider--desktop desktop"
                        modules={[Lazy, Navigation]}
                        spaceBetween={32}
                        slidesPerView={3.4}
                        lazy={true}
                        navigation={true}
                        threshold={15}
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
                        slidesPerView={1.125}
                        lazy={true}
                        navigation={true}
                        threshold={15}
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
                {enableInfoBanner && <div className="shop-by-category__info">
                    {infoBannerImage?.fields?.file.url && <span>
                        <Image
                            src={`https:${infoBannerImage?.fields?.file.url}`}
                            alt={header}
                            width="48"
                            height="48"
                        />
                    </span>}
                    <span className="divider"></span>
                    <span>{infoBannerText}</span>
                </div>}
            </div>
        </section>
    )
}

export default ShopByCategory
