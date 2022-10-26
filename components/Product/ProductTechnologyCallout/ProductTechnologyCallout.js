import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const ProductTechnologyCallout = ({ content }) => {

    useEffect(() => {

    }, [])

    return (
        <div className="product-technology-callout">
            <div className="product-technology-callout__container container">
                <div className="product-technology-callout__content">
                    {content.fields?.subheader ?
                        <h6 className="product-technology-callout__subheader">{ content.fields.subheader }</h6>
                    : ""}
                    {content.fields?.header ?
                        <div className="product-technology-callout__header" dangerouslySetInnerHTML={{__html:  documentToHtmlString(content.fields.header) }}></div>
                    : ""}
                    {content.fields?.copy ?
                        <h4 className="product-technology-callout__description large">{ content.fields.copy }</h4>
                    : ""}
                </div>
                {content.fields?.sections ? (
                    <div className="product-technology-callout__items">
                        {content.fields.sections.map((item, index) => {
                            return (
                                <div className={`product-technology-callout__item ${item.fields.flipped == "True" ? "flipped" : ""}`} key={index}>
                                    {item?.fields?.image?.fields?.file?.url ? (
                                        <div className="product-technology-callout__image">
                                            <Image
                                                className="featured"
                                                src={`https:${item.fields.image.fields.file.url}`}
                                                alt={item.fields.image.fields.title}
                                                layout="responsive"
                                                objectFit="cover"
                                                height="715"
                                                width="535"
                                            />
                                        </div>
                                    ) : ""}
                                    <div className="product-technology-callout__wrapper">
                                        {item.fields?.header ? (
                                            <h3>{ item.fields.header }</h3>
                                        ): ""}
                                        {item.fields?.subheader ? (
                                            <h4>{ item.fields.subheader }</h4>
                                        ): ""}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : ""}
            </div>
        </div>
    )
}

export default ProductTechnologyCallout
