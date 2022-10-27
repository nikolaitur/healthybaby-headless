import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser'

const ProductContentBanner = ({ content }) => {
    const { header, subheader, image, ctaText, ctaUrl } = {...content.fields}

    let styles = {}
    if(content.fields.backgroundColor) {
        styles = {
            backgroundColor: content.fields.backgroundColor
        }
    }

    return (
        <div className="content-banner">
            <div className="content-banner__container container" style={styles}>
                <div className="content-banner__image">
                    {image?.fields?.file?.url ? (
                        <div className="content-banner__image--desktop">
                            <Image
                                className=""
                                src={`https:${image.fields.file.url}`}
                                alt={image.fields.title}
                                layout="responsive"
                                objectFit="cover"
                                height="512"
                                width="512"
                            />
                        </div>
                    ) : ""}
                </div>
                <div className="content-banner__content">
                    {header ? (
                        <div className="content-banner__header">{ parse(header) }</div>
                    ) : ""}
                    {subheader ? (
                        <div className="content-banner__subheader">{ subheader }</div>
                    ) : ""}
                </div>
                {ctaText && ctaUrl ?
                    <div className="content-banner__cta">
                        <Link href={ctaUrl || ''}>
                            <button className="btn">{ ctaText }</button>
                        </Link>
                    </div>
                : ""}
            </div>
        </div>
    )
}

export default ProductContentBanner
