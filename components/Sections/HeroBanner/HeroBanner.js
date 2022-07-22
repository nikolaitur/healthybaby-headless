import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const HeroBanner = ({ content }) => {
    // const { header, subheader, desktopImage, ctaText, ctaUrl } = content.fields

    // console.log('ContentBanner', content)
    return (
        <section className="hero">
            <div className="hero__image">
                {/* <Image
                    src={`https:${desktopImage.fields.file.url}`}
                    alt={header}
                    layout="fill"
                /> */}
            </div>
            <div className="hero__container container">
                <div className="hero__content">
                    <div className="hero__subheader">BUILD An ESSENTIALS BOX</div>
                    <div className="hero__header">A New Standard Of Safety & Transparency</div>
                    <div className="hero__cta">
                        <Link href="/">
                            <div className="hero__button">
                                <span>Build a Box</span>
                                <span><LongArrowRight /></span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner
