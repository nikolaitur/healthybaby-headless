import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Pagination } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";

const ProductGallery = ( props ) => {

    const { product, quickView } = {...props}

    return (
        <>
            <div className="product-gallery">
            {quickView ? (
                <div className="product-gallery__image">
                    <Image
                        className=""
                        src={product.content.media[0].src}
                        alt={`image`}
                        layout="responsive"
                        objectFit="cover"
                        height="615"
                        width="490"
                    />
                </div>
            ) : (
                product.content.media.map((image, index) => {
                    return (
                        <div className="product-gallery__image" key={index}>
                            <Image
                                className=""
                                src={image.src}
                                alt={`image`}
                                layout="responsive"
                                objectFit="cover"
                                height="615"
                                width="490"
                            />
                        </div>
                    )
                })
            )}
                
            </div>
            <Swiper
                className="product-gallery__slider"
                modules={[Lazy, Pagination]}
                spaceBetween={20}
                slidesPerView={1}
                lazy={true}
                pagination={true}
                style={{
                    "--swiper-navigation-color": "#fff",
                    "--swiper-pagination-color": "#00B188",
                    "--swiper-pagination-bullet-inactive-color": "#fff",
                    "--swiper-pagination-bullet-inactive-opacity": "1"
                }}
            >
                {product.content.media.map((image, index) => {
                    return (
                        <SwiperSlide key={index}>
                            <Image
                                className=""
                                src={image.src}
                                alt={`image`}
                                layout="responsive"
                                objectFit="cover"
                                height="600"
                                width="490"
                            />
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </>
    )
}

export default ProductGallery
