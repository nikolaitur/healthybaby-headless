import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image';

import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

const ProductDetailSlide = ({ content }) => {
    const [textBlock1, setTextBlock1] = useState(false)
    const [textBlock2, setTextBlock2] = useState(false)

    useEffect(() => {
        const getRichTextToHtml = () => {
            if(content.fields?.textBlock1) {
                setTextBlock1(documentToHtmlString(content.fields.textBlock1))
            }
            if(content.fields?.textBlock2) {
                setTextBlock2(documentToHtmlString(content.fields.textBlock2))
            }
        }
        getRichTextToHtml()
    })

    return (
        <div className="product-detail-slide">
            <div className="product-detail-slide__column">
                {textBlock1 ? (
                    <div className="product-detail-slide__content" dangerouslySetInnerHTML={{__html: textBlock1}}></div>
                ) : ""}
            </div>
            <div className="product-detail-slide__column">
                {content.fields?.image?.fields?.file?.url ? (
                    <div className="product-detail-slide__image">
                        <Image
                            className=""
                            src={`https:${content.fields.image.fields.file.url}`}
                            alt={content.fields.image.fields.title}
                            layout="responsive"
                            objectFit="cover"
                            height="512"
                            width="512"
                        />
                    </div>
                ) : ""}
                {/* <img src="https://swiperjs.com/demos/images/nature-1.jpg" /> */}
            </div>
            <div className="product-detail-slide__column">
                {textBlock2 ? (
                    <div className="product-detail-slide__content" dangerouslySetInnerHTML={{__html: textBlock2}}></div>
                ) : ""}
            </div>
        </div>
    )
}

export default ProductDetailSlide
