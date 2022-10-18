import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Player } from 'video-react';
import LongArrowRight from '../../../svgs/long-arrow-right.svg'
import parse from 'html-react-parser'

const HeroBanner = ({ content }) => {
    const { title, italicizeTitle, subtitle, subtitlePosition, featuredMedia, mobileBackgroundImage, ctaText, ctaUrl, alignment, verticalAlignment, hideCta } = {...content.fields}

    const isVideo = featuredMedia?.fields?.file?.contentType.includes('video')

    let subtitleTruePosition = 'above title'

    if (subtitlePosition) {
        subtitleTruePosition = subtitlePosition
    }

    console.log("featuredMedia:", featuredMedia)

    // console.log('HeroBanner', content)
    return (
        <section className={`hero ${isVideo ? 'hero--video' : ''}`}>
            <div className="hero__image">

                {featuredMedia?.fields?.file && isVideo && <Player playsInline loop={true} autoPlay={true} muted={true}>
                    <source src={`https:${featuredMedia.fields.file.url}`} />
                </Player>}

                {featuredMedia?.fields?.file && !isVideo && <Image
                    className="hero__image--desktop"
                    src={`https:${featuredMedia.fields.file.url}`}
                    alt={title}
                    layout="fill"
                />}
                {mobileBackgroundImage?.fields?.url && mobileBackgroundImage.fields.file.contentType.includes('image') && <Image
                    className="hero__image--mobile"
                    src={`https:${mobileBackgroundImage.fields.file.url}`}
                    alt={title}
                    layout="fill"
                />}
            </div>
            <div className={`hero__container hero__container--vertical-${verticalAlignment} hero__container--horizontal-${alignment} container`}>
                <div className="hero__content">
                    <div className="hero__content-header">
                        {subtitleTruePosition === 'above title' && <h4 className="hero__subheader">{ subtitle }</h4>}
                        <h1 className={`hero__header ${italicizeTitle ? 'hero__header--italicized' : ''}`}>{ parse(title) }</h1>
                        {subtitleTruePosition === 'below title' && <h4 className="hero__subheader">{ subtitle }</h4>}
                    </div>
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
