import React from 'react'
import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import Link from 'next/link'
import Image from 'next/image'


import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";

import ProductCard from '../../Cards/ProductCard'
import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const BestSellers = ({ content }) => {
    const { header } = content.fields
    const { products } = content.fields

    const [bestSellers, setBestSellers] = useState([])

    useEffect(() => {
        const getBestSellers = async () => {
            const productList = products.split(',')
            await nacelleClient.products({
                handles: productList
            }).then(response => {
                setBestSellers(response)
            })
        }

        getBestSellers()
    }, [products]);

    return (
        <section className="best-sellers">
            <div className="best-sellers__container container">
                <div className="best-sellers__content">
                    <h2 className="best-sellers__header">{ header }</h2>
                    <div className="best-sellers__link">
                        <Link href="/">
                            <div className="best-sellers__button">
                                <span>Shop All</span>
                                <span><LongArrowRight /></span>
                            </div>
                        </Link>
                    </div>
                </div>
                {bestSellers.length > 1 ? (
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
                            {bestSellers.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard content={product} />
                                </SwiperSlide>
                            ))}
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
                            {bestSellers.map((product, index) => (
                                <SwiperSlide key={index}>
                                    <ProductCard content={product} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                ): ""}
            </div>
        </section>
    )
}

export default BestSellers
