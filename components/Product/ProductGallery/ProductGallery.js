import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Pagination } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";

const ProductGallery = ( props ) => {

    const { product, page, quickView } = {...props}

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
                ) : page.fields?.productImagesDesktop?.length ? (
                    page.fields.productImagesDesktop.map((productImage, index) => {
                        let height = 615;
                        if (index == 2 || index == 5) {
                            height = 729
                        }

                        if(productImage.fields?.file?.url) {
                            return (
                                <div className="product-gallery__image" key={index}>
                                    <Image
                                        className=""
                                        src={`https:${productImage.fields.file.url}`}
                                        alt={`image`}
                                        layout="responsive"
                                        objectFit="cover"
                                        height={height}
                                        width="490"
                                    />
                                </div>
                            )
                        }
                    }
                )) : (
                    product.content.media.slice(0, 5).map((image, index) => {
                        let height = 615;
                        if (index == 2 || index == 5) {
                            height = 729
                        }
                        return (
                            <div className="product-gallery__image" key={index}>
                                <Image
                                    className=""
                                    src={image.src}
                                    alt={`image`}
                                    layout="responsive"
                                    objectFit="cover"
                                    height={height}
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
                {page.fields?.productImagesMobile?.length ? (
                    page.fields.productImagesMobile.map((productImage, index) => {
                        if(productImage.fields?.file?.url) {
                            return (
                                <SwiperSlide key={index}>
                                    <Image
                                        className=""
                                        src={`https:${productImage.fields.file.url}`}
                                        alt={`image`}
                                        layout="responsive"
                                        objectFit="cover"
                                        height="600"
                                        width="490"
                                    />
                                </SwiperSlide>
                            )
                        }
                    }
                )) : (
                    product.content.media.slice(0, 5).map((image, index) => {
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
                    })
                )}
            </Swiper>
        </>
    )
}

export default ProductGallery
