import React from 'react'

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Lazy, EffectFade } from "swiper";

import 'swiper/css';
import "swiper/css/lazy";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import CollectionProductCard from '../../Cards/CollectionProductCard'

const ProductCrossSells = ({ content }) => {

    return (
        <div className="product-cross-sells">
            <div className="product-cross-sells__container container">
                {content.fields?.subheader ? 
                        <h6 className="product-cross-sells__subheader">{ content.fields.subheader }</h6>
                : ""}
                {content.fields?.subheader ? 
                    <div className="product-cross-sells__header" dangerouslySetInnerHTML={{__html:  documentToHtmlString(content.fields.header) }}></div>
                : ""}
                {content.fields?.sections ? (
                    <>
                        <div className="product-cross-sells__items">
                            {content.fields.sections.map((item, index) => {
                                return <CollectionProductCard content={item} key={index}/>
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
                                <SwiperSlide>
                                    <CollectionProductCard content={item} key={index}/>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>

                ) : ""}
            </div>
        </div>
    )
}

export default ProductCrossSells