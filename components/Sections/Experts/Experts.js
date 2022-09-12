import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const Experts = ({ content }) => {
   const { header, subheader, sections } = content.fields
   console.log(content, sections, "EXPERTS")

    return (
        <section className="experts">
            <div className="experts__container container">
                <div className="experts__content">
                    {content.fields?.subheader ? (
                        <h6 className="experts__subheader">{ content.fields.subheader }</h6>
                    ) : ""}
                    {content.fields?.header ? (
                        <h2 className="experts__header">{ content.fields.header }</h2>
                    ) : ""}
                </div>
                {content.fields?.sections ? (
                    <div className="experts__wrapper"> 
                        {content.fields.sections.map((item, index) => (
                            <div className="experts__expert" key={index}>
                                <div className="experts__image">
                                    <img src="https://swiperjs.com/demos/images/nature-1.jpg" />
                                </div>
                                <div className="experts__name">{ item.fields.name }</div>
                                <p className="experts__description">{ item.fields.description }</p>
                                <div className="experts__cta">
                                    <Link href={item.fields.ctaUrl}>
                                        <button className="link">{ item.fields.ctaText }</button>
                                    </Link>
                                </div>      
                            </div>
                        ))}                    
                    </div>
                ) : ""}
            </div>   
        </section>
    )
}

export default Experts
