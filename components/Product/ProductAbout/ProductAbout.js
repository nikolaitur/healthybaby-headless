import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import ProductAboutAccordion from './ProductAboutAccordion';

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const ProductAbout = ({ content }) => {
    // const { header, subheader, copy, links, imageTitle, imageSubtitle } = content.fields
    // const image = content.fields.image.fields.file.url  

    return (
        <section className="product-about">
            <div className="product-about__container container">
                <div className="product-about__content">
                    <h6 className="about__subheader">SUPERIOR STANDARDS</h6>
                    <h3 className="product-about__header">
                        Safe for developing brains & bodies
                    </h3>
                    <div className="product-about__image about__image--mobile">
                        <Image
                            src={`https://images.ctfassets.net/urdrzzac4igp/71vy1gTzW8vYaWYDCqeRXz/041cd5e9a5efbf80c7d1356686491beb/Mask_group__24_.png`}
                            alt=""
                            width="785"
                            height="750"
                        />
                    </div>
                    <div className="product-about__wrapper">
                        <ProductAboutAccordion />
                        <ProductAboutAccordion />
                        <ProductAboutAccordion />
                        <ProductAboutAccordion />
                    </div>
                </div>
                <div className="product-about__image about__image--desktop">
                    <Image
                        src={`https://images.ctfassets.net/urdrzzac4igp/71vy1gTzW8vYaWYDCqeRXz/041cd5e9a5efbf80c7d1356686491beb/Mask_group__24_.png`}
                        alt=""
                        width="785"
                        height="750"
                    />
                </div>
            </div>
        </section>
    )
}

export default ProductAbout
