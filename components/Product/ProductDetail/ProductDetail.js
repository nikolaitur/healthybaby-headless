import React from 'react'
import { useState, useEffect } from 'react'
import ProductDetailSlide from '../../Sections/ProductDetailTabs/ProductDetailSlide';
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
        <div className="product-detail-tabs">
            <div className="product-detail-tabs__container container">
                <div className="product-detail-tabs__content">
                    {content.fields?.subheader ? (
                        <h6 className="product-detail-tabs__subheader">{ content.fields.subheader }</h6>
                    ) : ""}
                    {content.fields?.header ? (
                        <h2 className="product-detail-tabs__header">{ content.fields.header }</h2>
                    ) : ""}
                </div>
                {content.fields?.section ? (
                    <ProductDetailSlide content={content.fields.section} />
                ) : ""}
            </div>   
        </div>
    )
}

export default ProductDetailTabs
