import React from 'react'
import { useState, useEffect } from 'react'
import ProductDetailSlide from './ProductDetailSlide';
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const ProductDetailTabs = ({ content }) => {
    const { header, subheader, sections } = content.fields

    const [swiperIntstance, setSwiperInstance] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0);

    const goToSlide = (index) => {
       swiperIntstance.slideTo(index)
       setActiveSlide(index)
    }

    return (
        <section className="product-detail-tabs">
            <div className="product-detail-tabs__container container">
                <div classname="product-detail-tabs__content">
                    {content.fields?.subheader ? (
                        <h6 className="product-detail-tabs__subheader">{ content.fields.subheader }</h6>
                    ) : ""}
                    {content.fields?.header ? (
                        <h2 className="product-detail-tabs__header">{ content.fields.header }</h2>
                    ) : ""}
                    {content.fields?.sections ? (
                        <div className="product-detail-tabs__tabs">
                            {content.fields.sections.map((section, index) => {
                                return <div key={index} className={`product-detail-tabs__tab ${index == activeSlide ? "active" : ""}`} onClick={() => goToSlide(index)}>{ section.fields.title }</div>
                            })}
                        </div>
                    ) : ""}
                </div>
                {content.fields?.sections ? (
                    <Swiper
                        className="product-detail-tabs__slider"
                        modules={[EffectFade]}
                        spaceBetween={20}
                        slidesPerView={1}
                        effect={"fade"}
                        style={{
                            "--swiper-pagination-color": "#00B188"
                        }}
                        onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                        onSwiper={(swiper) => setSwiperInstance(swiper)}>
                        {content.fields.sections.map((section, index) => {
                            return (
                                <SwiperSlide key={index}> 
                                    <ProductDetailSlide activeSlide={activeSlide} content={section} />
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                ) : ""}
            </div>   
        </section>
    )
}

export default ProductDetailTabs
