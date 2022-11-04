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
                    if (section.fields.productHandle) return section
                }).map(section => section.fields.productHandle.replace('::en-US', ''))

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
                {sections && products ? (
                    <div className="best-sellers__slider">
                        <Swiper
                            className="best-sellers__slider--desktop"
                            modules={[Lazy, Navigation]}
                            spaceBetween={20}
                            threshold={15}
                            slidesPerView={3}
                            lazy={true}
                            navigation={false}
                            style={{
                                "--swiper-navigation-color": "#fff",
                                "--swiper-pagination-color": "#fff",
                            }}
                        >
                           {sections.map((item, index) => {
                                if (item.fields?.image?.fields?.file?.url) {
                                    return <SwiperSlide key={index}>
                                        <CollectionProductCard content={item} key={index} index={index} products={products} cardWidthOverride={'Normal'} />
                                    </SwiperSlide>
                                }
                                return ''
                            })}
                        </Swiper>
                        <Swiper
                            className="best-sellers__slider--mobile"
                            modules={[Lazy, Navigation]}
                            spaceBetween={20}
                            slidesPerView={1.1}
                            threshold={15}
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
                            {sections.map((item, index) => {
                                if (item.fields?.image?.fields?.file?.url) {
                                    return <SwiperSlide key={index}>
                                        <CollectionProductCard content={item} key={index} index={index} products={products} imageLayout={'fill'} cardWidthOverride={'Normal'} />
                                    </SwiperSlide>
                                }
                                return ''
                            })}
                        </Swiper>
                    </div>
                ): ""}
            </div>
        </section>
    )
}

export default BestSellers
