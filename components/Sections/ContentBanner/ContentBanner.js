import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ContentBanner = ({ content }) => {
    const { header, subheader, desktopImage, mobileImage, ctaText, ctaUrl } = content.fields

    return (
        <section className="content-banner">
            <div className="content-banner__container container">
                <div className="content-banner__image">
                    <Image
                        className="content-banner__image--desktop"
                        src={`https:${desktopImage.fields.file.url}`}
                        alt={header}
                        height="144px"
                        width="185px"
                    />
                    <Image
                        className="content-banner__image--mobile"
                        src={`https:${mobileImage.fields.file.url}`}
                        alt={header}
                        height="322px"
                        width="280px"
                    />
                </div>
                <div className="content-banner__content">
                    <div className="content-banner__header">{ header }</div>
                    <div className="content-banner__subheader">{ subheader }</div>
                </div>
                <div className="content-banner__cta">
                    <Link href="/">
                        {ctaText}
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default ContentBanner
