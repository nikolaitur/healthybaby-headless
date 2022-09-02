import React from 'react'
import { useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { nacelleClient } from 'services'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, Pagination } from "swiper";

import 'swiper/css';
import "swiper/css/pagination";

const CollectionProductCard = ({ content }) => {
    const [isloading, setIsLoading] = useState(false)
    const [productPrice, setProductPrice] = useState(false)
    const { title, cardWidth } = content.fields

    if(content.fields?.handle) {
        const getProduct = async () => {
            await nacelleClient.products({
                handles: ["healthynest-diaper-training-pants"]
                // handles: ["cleaning-concentrate"]
            }).then(response => {
                // console.log(response[0])
                getProdouctPrice(response[0])
            });
        }
    
        getProduct()
    }

    const getProdouctPrice = (product) => {
        if(product.variants.length > 1) {
            let lowestPrice = product.variants.reduce(function(prev, curr) {
                return prev.price < curr.price ? prev : curr;
            });
            setProductPrice(lowestPrice.price)
        }
    }

    const getCtaText = (product) => {
        // if(content.fields?)
    }

    return (
        <div className={`collection-product-card ${cardWidth == "Full Width" ? "full-width" : ""}`}>
            <div className={`collection-product-card__image ${content.fields?.image && content.fields?.imageHover ? "hide-mobile" : ""}`}>
                {content.fields?.image ? (
                    <>
                        <Image
                            className="featured"
                            src={`https:${content.fields.image.fields.file.url}`}
                            alt={content.fields.image.fields.title}
                            layout="responsive"
                            objectFit="cover"
                            height={cardWidth == "Full Width" ? 695 : 710}
                            width={cardWidth == "Full Width" ? 870 : 570}
                        />
                        {content.fields?.imageHover ? (
                            <Image
                                className="hover"
                                src={`https:${content.fields.imageHover.fields.file.url}`}
                                alt={content.fields.imageHover.fields.title}
                                layout="responsive"
                                objectFit="cover"
                                height={cardWidth == "Full Width" ? 695 : 710}
                                width={cardWidth == "Full Width" ? 870 : 570}
                            />
                        ) : ""}
                    </>
                    ) : (
                    <div className="placeholder"></div>
                )}
            </div>
            {content.fields?.image && content.fields?.imageHover ? (
                <Swiper
                    className="collection-product-card__slider"
                    modules={[Lazy, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    lazy={true}
                    pagination={true}
                    style={{
                        "--swiper-pagination-color": "#00B188"
                    }}
                >
                    <SwiperSlide>
                        <Image
                            className="featured"
                            src={`https:${content.fields.image.fields.file.url}`}
                            alt={content.fields.image.fields.title}
                            layout="responsive"
                            objectFit="cover"
                            height={cardWidth == "Full Width" ? 695 : 710}
                            width={cardWidth == "Full Width" ? 870 : 570}
                        />
                    </SwiperSlide>
                    <SwiperSlide>
                        <Image
                            className="hover"
                            src={`https:${content.fields.imageHover.fields.file.url}`}
                            alt={content.fields.imageHover.fields.title}
                            layout="responsive"
                            objectFit="cover"
                            height={cardWidth == "Full Width" ? 695 : 710}
                            width={cardWidth == "Full Width" ? 870 : 570}
                        />
                    </SwiperSlide>
                </Swiper>
            ) : ""}
            <div className="collection-product-card__content">
                <div className="collection-product-card__title">{ title }</div>
                <p className="collection-product-card__subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <div className="collection-product-card__reviews"></div>
                <div className="collection-product-card__cta">
                    <Link href="/">
                        <button className="btn secondary"><span>Add To Cart </span>{productPrice ? <>{`\u00A0`}- ${productPrice}</> : ""}</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default CollectionProductCard
