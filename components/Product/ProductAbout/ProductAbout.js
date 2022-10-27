import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import ProductAboutAccordion from './ProductAboutAccordion';

const ProductAbout = ({ content }) => {
    return (
        <div className="product-about">
            <div className="product-about__container container">
                <div className="product-about__content">

                    {content.fields?.image?.fields?.file?.url ? (
                        <div className="product-about__image product-about__image--mobile">
                            <Image
                                src={`https:${content.fields.image.fields.file.url}`}
                                alt=""
                                width="785"
                                height="750"
                            />
                        </div>
                    ) : ""}

                    {content.fields?.subheader ? (
                        <h6 className="product-about__subheader">{ content.fields.subheader }</h6>
                    ) : ""}

                    {content.fields?.header ? (
                        <h3 className="product-about__header">{ content.fields.header }</h3>
                    ) : ""}

                    {content.fields?.sections ? (
                        <div className="product-about__wrapper">
                            {content.fields.sections.map((item, index) => {
                                return <ProductAboutAccordion item={item} key={index} />
                            })}
                        </div>
                    ) : ""}

                </div>
                {content.fields?.image?.fields?.file?.url ? (
                    <div className="product-about__image about__image--desktop">
                        <Image
                            src={`https:${content.fields.image.fields.file.url}`}
                            alt=""
                            width="785"
                            height="750"
                        />
                    </div>
                ) : ""}
            </div>
        </div>
    )
}

export default ProductAbout
