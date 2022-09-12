import React from 'react'
import { useState, useRef, useEffect  } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import NutritionChartDropdown from './NutritionChartDropdown';

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const NutritionChart = ({ content }) => {

    const [swiperIntstance, setSwiperInstance] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0);

    const goToSlide = (index) => {
        swiperIntstance.slideTo(index)
        setActiveSlide(index)
    }

    return (
        <section className="nutrition-chart">
            <div className="nutrition-chart__container container">
                <div className="nutrition-chart__content">
                    {content.fields?.subheader ? (
                        <h6 className="nutrition-chart__subheader">{ content.fields.subheader }</h6>
                    ) : ""}
                    {content.fields?.header ? (
                        <h2 className="nutrition-chart__header">{ content.fields.header }</h2>
                    ) : ""}
                </div>
                {content.fields?.sections ? (
                    <>
                        <div className="nutrition-chart__tabs">
                            {content.fields.sections.map((item, index) => {
                                return <div key={index} className={`nutrition-chart__tab ${index == activeSlide ? "active" : ""}`} onClick={() => goToSlide(index)}>{item.fields.title}</div>
                            })}
                        </div>

                        <NutritionChartDropdown swiperIntstance={swiperIntstance} items={content.fields.sections}/>

                        <Swiper
                            className="nutrition-chart__slider"
                            modules={[EffectFade]}
                            spaceBetween={20}
                            slidesPerView={1}
                            effect={"fade"}
                            style={{
                                "--swiper-pagination-color": "#00B188"
                            }}
                            onSlideChange={(swiper) => setActiveSlide(swiper.activeIndex)}
                            onSwiper={(swiper) => setSwiperInstance(swiper)}
                        >
                            {content.fields.sections.map((item, index) => (
                                <SwiperSlide key={index}>
                                    <div className="nutrition-chart__slide">
                                        {item.fields?.description ? (
                                            <p className="nutrition-chart__description large">
                                                {item.fields.description}
                                            </p>
                                        ) : ""}

                                        {item.fields?.desktopImage ? (
                                            <div className="nutrition-chart__image nutrition-chart__image--desktop">
                                                <Image
                                                    className=""
                                                    src={`https:${item.fields.desktopImage.fields.file.url}`}
                                                    alt={item.fields.desktopImage.fields.title}
                                                    layout="responsive"
                                                    objectFit="cover"
                                                    height="512"
                                                    width="512"
                                                />
                                            </div>
                                        ) : ""}
                                        
                                        {item.fields?.mobileImage ? (
                                            <div className="nutrition-chart__image nutrition-chart__image--mobile">
                                                <Image
                                                    className="mobile"
                                                    src={`https:${item.fields.mobileImage.fields.file.url}`}
                                                    alt={item.fields.mobileImage.fields.title}
                                                    layout="responsive"
                                                    objectFit="cover"
                                                    height="300"
                                                    width="300"
                                                />
                                            </div>
                                        ) : ""}

                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </>
                ) : ""}
            </div>   
        </section>
    )
}

export default NutritionChart
