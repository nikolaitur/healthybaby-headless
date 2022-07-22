import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ContentBanner = ({ content }) => {
    const { header, subheader, desktopImage, ctaText, ctaUrl } = content.fields

    console.log('ContentBanner', content)
    return (
        <section className="content-banner">
            <div className="content-banner__container container">
                <div className="content-banner__image">
                    {/* <Image
                        src={`https:${desktopImage.fields.file.url}`}
                        alt={header}
                        layout="fill"
                    /> */}
                </div>
                <div className="content-banner__content">
                    <div className="content-banner__header">A mother of invention</div>
                    <div className="content-banner__subheader">Creating a new standard for every product in your baby’s environment</div>
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
