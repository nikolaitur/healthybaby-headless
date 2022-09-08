import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectFade } from "swiper";

import "swiper/css";
import "swiper/css/effect-fade";

const NutritionChart = ({ content }) => {
   const { header, subheader } = content.fields
   console.log(content)

   const swiper = useSwiper();
   console.log(swiper)

   const [activeSlide, setActiveSlide] = useState(0);

    return (
        <section className="nutrition-chart">
            <div className="nutrition-chart__container container">
                <div classname="nutrition-chart__content">
                    <h6 className="nutrition-chart__subheader">{ subheader }</h6>
                    <h2 className="nutrition-chart__header">{ header }</h2>
                </div>
                <div className="nutrition-chart__tabs">
                    <div className="nutrition-chart__tab active" onClick={() => swiper.slideTo(0)}>VITAMIN D3</div>
                    <div className="nutrition-chart__tab" onClick={() => swiper.slideTo(1)}>CHOLINE</div>
                    <div className="nutrition-chart__tab" onClick={() => swiper.slideTo(2)}>CALCIUM</div>
                    <div className="nutrition-chart__tab" onClick={() => swiper.slideTo(3)}>FOLATE</div>
                    <div className="nutrition-chart__tab" onClick={() => swiper.slideTo(4)}>IRON</div>
                    <div className="nutrition-chart__tab" onClick={() => swiper.slideTo(5)}>MAGNESIUM</div>
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
                    onSwiper={(swiper) => setActiveSlide(swiper.activeIndex)}
                >
                    <SwiperSlide>
                        <div className="nutrition-chart__slide">
                            <p className="nutrition-chart__description large">
                                Vitamin D supports bone growth and healthy immune function. Supplementing with vitamin D during pregnancy promotes healthy development. It’s also been shown to enhance mental and psychomotor performance in infants*
                            </p>
                            <div className="nutrition-chart__image">
                                <img src="https://images.ctfassets.net/urdrzzac4igp/5BwxGKlCP4lmnFVoI947VM/2295e42d1c3430f72c05f4d5a1405dc0/Group_56.png"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="nutrition-chart__slide">
                            <p className="nutrition-chart__description large">
                                Vitamin D supports bone growth and healthy immune function. Supplementing with vitamin D during pregnancy promotes healthy development. It’s also been shown to enhance mental and psychomotor performance in infants*
                            </p>
                            <div className="nutrition-chart__image">
                                <img src="https://images.ctfassets.net/urdrzzac4igp/5BwxGKlCP4lmnFVoI947VM/2295e42d1c3430f72c05f4d5a1405dc0/Group_56.png"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="nutrition-chart__slide">
                            <p className="nutrition-chart__description large">
                                Vitamin D supports bone growth and healthy immune function. Supplementing with vitamin D during pregnancy promotes healthy development. It’s also been shown to enhance mental and psychomotor performance in infants*
                            </p>
                            <div className="nutrition-chart__image">
                                <img src="https://images.ctfassets.net/urdrzzac4igp/5BwxGKlCP4lmnFVoI947VM/2295e42d1c3430f72c05f4d5a1405dc0/Group_56.png"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="nutrition-chart__slide">
                            <p className="nutrition-chart__description large">
                                Vitamin D supports bone growth and healthy immune function. Supplementing with vitamin D during pregnancy promotes healthy development. It’s also been shown to enhance mental and psychomotor performance in infants*
                            </p>
                            <div className="nutrition-chart__image">
                                <img src="https://images.ctfassets.net/urdrzzac4igp/5BwxGKlCP4lmnFVoI947VM/2295e42d1c3430f72c05f4d5a1405dc0/Group_56.png"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="nutrition-chart__slide">
                            <p className="nutrition-chart__description large">
                                Vitamin D supports bone growth and healthy immune function. Supplementing with vitamin D during pregnancy promotes healthy development. It’s also been shown to enhance mental and psychomotor performance in infants*
                            </p>
                            <div className="nutrition-chart__image">
                                <img src="https://images.ctfassets.net/urdrzzac4igp/5BwxGKlCP4lmnFVoI947VM/2295e42d1c3430f72c05f4d5a1405dc0/Group_56.png"/>
                            </div>
                        </div>
                    </SwiperSlide>
                    <SwiperSlide>
                        <div className="nutrition-chart__slide">
                            <p className="nutrition-chart__description large">
                                Vitamin D supports bone growth and healthy immune function. Supplementing with vitamin D during pregnancy promotes healthy development. It’s also been shown to enhance mental and psychomotor performance in infants*
                            </p>
                            <div className="nutrition-chart__image">
                                <img src="https://images.ctfassets.net/urdrzzac4igp/5BwxGKlCP4lmnFVoI947VM/2295e42d1c3430f72c05f4d5a1405dc0/Group_56.png"/>
                            </div>
                        </div>
                    </SwiperSlide>
                </Swiper>
            </div>   
        </section>
    )
}

export default NutritionChart
