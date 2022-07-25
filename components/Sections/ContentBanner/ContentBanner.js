import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ContentBanner = ({ content }) => {
    const { header, subheader, desktopImage, ctaText, ctaUrl } = content.fields

    return (
        <section className="content-banner">
            <div className="content-banner__container container">
                <div className="content-banner__image">
                    <Image
                        src={`https:${desktopImage.fields.file.url}`}
                        alt={header}
                        height="144px"
                        width="185px"
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
