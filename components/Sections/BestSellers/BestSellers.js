import React from 'react'
import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import Script from 'next/script';
import Link from 'next/link'
import Image from 'next/image'
import parse from 'html-react-parser'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Navigation } from "swiper";

import 'swiper/css';
import "swiper/css/navigation";

import CollectionProductCard from '../../Cards/CollectionProductCard'
import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const BestSellers = ({ content }) => {
    const { header, sections, ctaText, ctaUrl, ctaColor } = { ...content.fields}
    // const { products } = content.fields
    const [products, setProducts] = useState(false)

    useEffect(() => {
        const getProducts = async () => {
            if(sections) {
                const productHandles = content.fields.sections.filter(section => {
                    if (section.fields.handle) return section
                }).map(section => section.fields.handle.replace('::en-US', ''))

                const productsData = await nacelleClient.products({
                    handles: productHandles
                })

                setProducts(productsData)
            }
        }
        getProducts()
    }, [])

    return (
        <section className="best-sellers">
            <Script
                src="https://scripts.juniphq.com/v1/junip_shopify.js"
                strategy="lazyOnload"
            />
            <div className="best-sellers__container container">
                <div className="best-sellers__content">
                    <h2 className="best-sellers__header">{parse(header)}</h2>
                    <div className="best-sellers__link">
                        {(ctaUrl && ctaText) && <Link href={ctaUrl}>
                            <div className="best-sellers__button" style={{'color': ctaColor}}>
                                <span>{ctaText}</span>
                                <span><LongArrowRight /></span>
                            </div>
                        </Link>}
                    </div>
                </div>
                {/* {sections && products ? (
                    <>
                        <div className="product-cross-sells__items">
                            {content.fields.sections.map((item, index) => {
                                return <CollectionProductCard content={item} key={index} products={products} crossSell={true}/>
                            })}
                        </div>
                        <Swiper
                            className="product-cross-sells__slider"
                            modules={[Lazy]}
                            spaceBetween={20}
                            slidesPerView={1}
                            lazy={true}
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                        >
                            {content.fields.sections.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <CollectionProductCard content={item} key={index} products={products} crossSell={true}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>

                ) : ""} */}
                {sections && products ? (
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
                           {sections.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <CollectionProductCard content={item} key={index} products={products}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <Swiper
                            className="best-sellers__slider--mobile"
                            modules={[Lazy, Navigation]}
                            spaceBetween={20}
                            slidesPerView={1.1}
                            lazy={true}
                            navigation={true}
                            breakpoints={{
                                768: {
                                    slidesPerView: 2.1
                                }
                            }}
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                        >
                            {sections.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <CollectionProductCard content={item} key={index} products={products}/>
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
