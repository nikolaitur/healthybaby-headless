import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

const ProductDetailSlide = ({ content }) => {
   // const { header, subheader, sections } = content.fields
   // console.log(content)

    return (
        <div className="product-detail-slide">
            <div className="product-detail-slide__column">
                <h3 className="product-detail-slide__header">AM Serving</h3>
                <h5 className="product-detail-slide__subheader">(3 Capsules)</h5>
                <div className="product-detail-slide__content">
                    <h5>Core Prenatal Vitamin</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    <h5>Core Prenatal Vitamin</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    <h5>Core Prenatal Vitamin</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </div>
            </div>
            <div className="product-detail-slide__column">
                <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
            </div>
            <div className="product-detail-slide__column">
                <h3 className="product-detail-slide__header">AM Serving</h3>
                <h5 className="product-detail-slide__subheader">(3 Capsules)</h5>
                <div className="product-detail-slide__content">
                    <h5>Core Prenatal Vitamin</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    <h5>Core Prenatal Vitamin</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                    <h5>Core Prenatal Vitamin</h5>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailSlide
