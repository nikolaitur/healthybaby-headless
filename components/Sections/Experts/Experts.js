import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const Experts = ({ content }) => {
   const { header, subheader, sections } = content.fields
   // console.log(content)

    return (
        <section className="experts">
            <div className="experts__container container">
                <div className="experts__content">
                    <h6 className="experts__subheader">{ subheader }</h6>
                    <h2 className="experts__header">{ header }</h2>
                </div>
                <div className="experts__wrapper">
                    <div className="experts__expert">
                        <div className="experts__image">
                            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                        </div>
                        <div className="experts__name">Dr. James Adams, PHD</div>
                        <p className="experts__description">Dr. Adams serves as the co-founder & chair of the Scientific Advisory Board of the Neurological Health Foundation & has dedicated his entire career to helping women have healthy pregnancies.  His research focuses on medical & nutritional causes of autism.</p>
                        <div className="experts__cta">
                            <Link href={"/"}>
                                <button className="link">More About Dr. Adams</button>
                            </Link>
                        </div>      
                    </div>
                    <div className="experts__expert">
                        <div className="experts__image">
                            <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                        </div>
                        <div className="experts__name">Dr. James Adams, PHD</div>
                        <p className="experts__description">Dr. Adams serves as the co-founder & chair of the Scientific Advisory Board of the Neurological Health Foundation & has dedicated his entire career to helping women have healthy pregnancies.  His research focuses on medical & nutritional causes of autism.</p>
                        <div className="experts__cta">
                            <Link href={"/"}>
                                <button className="link">More About Dr. Adams</button>
                            </Link>
                        </div>      
                    </div>
                </div>
            </div>   
        </section>
    )
}

export default Experts
