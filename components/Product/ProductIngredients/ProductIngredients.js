import React from 'react'
import Image from 'next/image';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const ProductIngredients = ({ content }) => {
    // console.log(content, "product ingredients")

    return (
        <div className="product-ingredients">
            <div className="product-ingredients__container container">
                <div className="product-ingredients__content">
                    {content.fields?.subheader ? 
                        <h6 className="product-ingredients__subheader">{ content.fields.subheader }</h6>
                    : ""}
                    {content.fields?.title ? 
                        <div className="product-ingredients__header" dangerouslySetInnerHTML={{__html:  documentToHtmlString(content.fields.title) }}></div>
                    : ""}
                </div>
                {content.fields?.sections ? (
                    <div className="product-ingredients__items">
                        {content.fields.sections.map((section, index) => {
                            return (
                                <div key={index} className={`product-ingredients__item`}>
                                    <div className="product-ingredients__item--content">
                                        {section.fields?.image ? (
                                            <>
                                                 <div className="product-ingredients__item--image">
                                                    <Image
                                                        className="featured"
                                                        src={`https:${section.fields.image.fields.file.url}`}
                                                        alt={section.fields.image.fields.title}
                                                        layout="responsive"
                                                        objectFit="cover"
                                                        height="100"
                                                        width="100"
                                                    />
                                                 </div>
                                            </>
                                        ) : ""}
                                        <div className="product-ingredients__item--wrapper">
                                            {section.fields?.header ? (
                                                <h5 className="product-ingredients__item--header">{ section.fields.header }</h5>
                                            ) : ""}
                                            {section.fields?.subheader ? (
                                                <h6 className="product-ingredients__item--subheader">{ section.fields.subheader }</h6>
                                            ) : ""}
                                        </div>
                                    </div>
                                    {section.fields?.copy ? (
                                        <p className="product-ingredients__item--copy large">{ section.fields.copy }</p>
                                    ) : ""}
                                </div>
                            )
                        })}
                    </div>
                ) : ""}        
            </div>
        </div>
    )
}

export default ProductIngredients