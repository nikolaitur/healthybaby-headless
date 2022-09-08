import React from 'react'
import { useState, useRef, useEffect  } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const NutritionChart = ({ content }) => {
    const { header, subheader } = content.fields
    
    const [swiperIntstance, setSwiperInstance] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0);

    const goToSlide = (index) => {
        swiperIntstance.slideTo(index)
        setActiveSlide(index)
    }

    return (
        <section className="nutrition-chart">
            <div className="nutrition-chart__container container">
                <div classname="nutrition-chart__content">
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
                                        <p className="nutrition-chart__description large">
                                            {item.fields.title} supports bone growth and healthy immune function. Supplementing with vitamin D during pregnancy promotes healthy development. It’s also been shown to enhance mental and psychomotor performance in infants*
                                        </p>
                                        <div className="nutrition-chart__image">
                                            <img src="https://images.ctfassets.net/urdrzzac4igp/5BwxGKlCP4lmnFVoI947VM/2295e42d1c3430f72c05f4d5a1405dc0/Group_56.png"/>
                                        </div>
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
