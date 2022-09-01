import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const HeroBanner = ({ content }) => {
    const { title, subtitle, featuredMedia, mobileBackgroundImage, ctaText, ctaUrl } = content.fields

    // console.log('HeroBanner', content)
    return (
        <section className="hero">
            <div className="hero__image">
                <Image
                    className="hero__image--desktop"
                    src={`https:${featuredMedia.fields.file.url}`}
                    alt={title}
                    layout="fill"
                />
                <Image
                    className="hero__image--mobile"
                    src={`https:${mobileBackgroundImage.fields.file.url}`}
                    alt={title}
                    layout="fill"
                />
            </div>
            <div className="hero__container hero__container--bottom hero__container--left container">
                <div className="hero__content">
                    <h6 className="hero__subheader">{ subtitle }</h6>
                    <h1 className="hero__header">{ title }</h1>
                    <div className="hero__cta">
                        <Link href={ctaUrl}>
                            <button className="hero__button btn">
                                <span>{ctaText}</span>
                                <span><LongArrowRight /></span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroBanner
