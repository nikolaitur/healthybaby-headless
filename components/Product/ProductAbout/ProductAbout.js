import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import ProductAboutAccordion from './ProductAboutAccordion';

const ProductAbout = ({ content }) => {

    return (
        <div className="product-about">
            <div className="product-about__container container">
                <div className="product-about__content">
                    {content.fields?.subheader ? (
                        <h6 className="product-about__subheader">{ content.fields.subheader }</h6>
                    ) : ""}
                    {content.fields?.header ? (
                        <h3 className="product-about__header">{ content.fields.header }</h3>
                    ) : ""}
                    <div className="product-about__image about__image--mobile">
                        <Image
                            src={`https://images.ctfassets.net/urdrzzac4igp/71vy1gTzW8vYaWYDCqeRXz/041cd5e9a5efbf80c7d1356686491beb/Mask_group__24_.png`}
                            alt=""
                            width="785"
                            height="750"
                        />
                    </div>
                    {content.fields?.sections ? (
                        <div className="product-about__wrapper">
                            {content.fields.sections.map((item, index) => {
                                return <ProductAboutAccordion item={item} key={index} />
                            })}
                        </div>
                    ) : ""}
                    {/* <div className="product-about__wrapper">
                        <ProductAboutAccordion />
                        <ProductAboutAccordion />
                        <ProductAboutAccordion />
                        <ProductAboutAccordion />
                    </div> */}
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
        </div>
    )
}

export default ProductAbout
