import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import ContentCard from '../../Cards/ContentCard'
import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const ContentPreview = ({ content }) => {
    // const { header, subheader, desktopImage, mobileImage, ctaText, ctaUrl } = content.fields

    return (
        <section className="content-preview">
            <div className="content-preview__container container">
                <div className="content-preview__content">
                    <div className="content-preview__subheader">ENRICHMENT SUBTITLE HERE</div>
                    <div className="content-preview__header">
                        <span>Guides</span> <span>Activities</span> <span>Advisors</span> <span>Podcast</span>
                    </div>
                    <div className="content-preview__link">
                        <Link href="/">
                            <div className="content-preview__button">
                                <span>Shop All</span>
                                <span><LongArrowRight /></span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="content-preview__wrapper">
                    <ContentCard />
                    <ContentCard />
                    <ContentCard />
                </div>
            </div>
        </section>
    )
}

export default ContentPreview
