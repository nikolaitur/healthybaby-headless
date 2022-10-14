import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Player } from 'video-react';
import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const HeroBanner = ({ content }) => {
    const { title, italicizeTitle, subtitle, subtitlePosition, featuredMedia, mobileBackgroundImage, ctaText, ctaUrl, alignment, verticalAlignment, hideCta } = {...content.fields}

    const isVideo = featuredMedia?.fields?.file?.contentType.includes('video')

    let subtitleTruePosition = 'above title'

    if (subtitlePosition) {
        subtitleTruePosition = subtitlePosition
    }

    // console.log('HeroBanner', content)
    return (
        <section className={`hero ${isVideo ? 'hero--video' : ''}`}>
            <div className="hero__image">

                {featuredMedia && isVideo && <Player playsInline loop={true} autoPlay={true} muted={true}>
                    <source src={`https:${featuredMedia.fields.file.url}`} />
                </Player>}

                {featuredMedia && !isVideo && <Image
                    className="hero__image--desktop"
                    src={`https:${featuredMedia.fields.file.url}`}
                    alt={title}
                    layout="fill"
                />}
                {mobileBackgroundImage && mobileBackgroundImage.fields.file.contentType.includes('image') && <Image
                    className="hero__image--mobile"
                    src={`https:${mobileBackgroundImage.fields.file.url}`}
                    alt={title}
                    layout="fill"
                />}
            </div>
            <div className={`hero__container hero__container--vertical-${verticalAlignment} hero__container--horizontal-${alignment} container`}>
                <div className="hero__content">
                    {subtitleTruePosition === 'above title' && <h6 className="hero__subheader">{ subtitle }</h6>}
                    <h1 className={`hero__header ${italicizeTitle ? 'hero__header--italicized' : ''}`}>{ title }</h1>
                    {subtitleTruePosition === 'below title' && <h6 className="hero__subheader">{ subtitle }</h6>}
                    {hideCta === 'False' && <div className="hero__cta">
                        <Link href={ctaUrl || ''}>
                            <button className="hero__button btn">
                                <span>{ctaText}</span>
                                <span><LongArrowRight /></span>
                            </button>
                        </Link>
                    </div>}
                </div>
            </div>
        </section>
    )
}

export default HeroBanner
