import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ProductContentBanner = ({ content }) => {
    const { header, subheader, desktopImage, mobileImage, ctaText, ctaUrl } = content.fields

    // console.log("contentbanner", content)

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
                    {content.fields?.image ? (
                        <div className="content-banner__image--desktop">
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
                </div>
                <div className="content-banner__content">
                    {content.fields?.header ? (
                        <div className="content-banner__header">{ content.fields.header }</div>
                    ) : ""}
                    {content.fields?.subheader ? (
                        <div className="content-banner__subheader">{ content.fields.subheader }</div>
                    ) : ""}
                </div>
                {content.fields?.ctaText && content.fields?.ctaUrl ? 
                    <div className="content-banner__cta">
                        <Link href={content.fields.ctaUrl}>
                            <button className="btn">{ content.fields.ctaText }</button>
                        </Link>
                    </div>
                : ""}
            </div>
        </div>
    )
}

export default ProductContentBanner
