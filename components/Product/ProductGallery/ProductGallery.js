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
                <div className="product-gallery__images">
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
                    ) : page.fields?.productImagesDesktop ? (
                        page.fields.productImagesDesktop.map((productImage, index) => {
                            let sizes = '(min-width: 1080px) 35vw, 800px';
                            let classes = "product-gallery__image"

                            console.log(page.fields.productImagesDesktop.length, index)

                            if(index == 0 && page.fields.productImagesDesktop.length == 1) {
                                sizes = '(min-width: 1080px) 70vw, 800px';
                                classes = "product-gallery__image product-gallery__image--full-width"
                            }

                            if (index == 2 || index == 5) {
                                sizes = '(min-width: 1080px) 70vw, 800px';
                            }

                            if(productImage.fields?.file?.url) {
                                return (
                                    <div className={classes} key={index}>
                                        <Image
                                            className=""
                                            src={`https:${productImage.fields.file.url}`}
                                            alt={`image`}
                                            layout="fill"
                                            objectFit="cover"
                                            sizes={sizes}
                                        />
                                    </div>
                                )
                            }
                        }
                    )) : (
                        product.content.media.slice(0, 5).map((image, index) => {
                            let sizes = '(min-width: 1080px) 35vw, 800px';
                            let classes = "product-gallery__image"

                            if(index == 0 && product.content.media.length == 1) {
                                sizes = '(min-width: 1080px) 70vw, 800px';
                                classes = "product-gallery__image product-gallery__image--full-width"
                            }

                            if (index == 2 || index == 5) {
                                sizes = '(min-width: 1080px) 70vw, 800px';
                            }
                            return (
                                <div className={classes} key={index}>
                                    <Image
                                        className=""
                                        src={image.src}
                                        alt={`image`}
                                        layout="fill"
                                        objectFit="cover"
                                        sizes={sizes}
                                    />
                                </div>
                            )
                        })
                    )}
                </div>
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
                {page?.fields?.productImagesMobile ? (
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
