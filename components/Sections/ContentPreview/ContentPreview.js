import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

import ContentCard from '../../Cards/ContentCard'
import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const ContentPreview = ({ content }) => {
    const { subheader } = content.fields

    const guides = content.fields.contentCards.filter(card => {
        return card.fields.contentType == "Guides"
    })

    const activities = content.fields.contentCards.filter(card => {
        return card.fields.contentType == "Activities"
    })

    const advisors = content.fields.contentCards.filter(card => {
        return card.fields.contentType == "Advisors"
    })

    const podcasts = content.fields.contentCards.filter(card => {
        return card.fields.contentType == "Podcast"
    })

    const activeContentData = {
        name: "Guides",
        ctaText: "Explore All Guides",
        ctaUrl: "/",
        fields: guides
    }

    const [activeContent, setActiveContent] = useState(activeContentData);

    const updateActiveContent = (contentName) => {
        switch (contentName) {
            case 'Guides':
                return setActiveContent({ name: "Guides", ctaText: "Explore All Guides", ctaUrl: "/", fields: guides})
            case 'Activities':
                return setActiveContent({ name: "Activities", ctaText: "Explore All Activities", ctaUrl: "/", fields: activities})
            case 'Advisors':
                return setActiveContent({ name: "Advisors", ctaText: "Meet Our Experts", ctaUrl: "/", fields: advisors})
            case 'Podcast':
                return setActiveContent({ name: "Podcast", ctaText: "Listen To More Episodes", ctaUrl: "/", fields: podcasts})
            default:
            return null
        }
    }

    return (
        <section className="content-preview" data-background-color="green">
            <div className="content-preview__container container">
                <div className="content-preview__content">
                    <div className="content-preview__subheader">{ subheader }</div>
                    <div className="content-preview__header">
                        <span className={activeContent.name == "Guides" ? "active" : ""} onClick={() => updateActiveContent("Guides")}>Guides</span>
                        <span className={activeContent.name == "Activities" ? "active" : ""} onClick={() => updateActiveContent("Activities")}>Activities</span>
                        <span className={activeContent.name == "Advisors" ? "active" : ""} onClick={() => updateActiveContent("Advisors")}>Advisors</span>
                        <span className={activeContent.name == "Podcast" ? "active" : ""} onClick={() => updateActiveContent("Podcast")}>Podcast</span>
                    </div>
                    <div className="content-preview__link">
                        <Link href={activeContent.ctaUrl}>
                            <div className="content-preview__button">
                                <span>{activeContent.ctaText}</span>
                                <span><LongArrowRight /></span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="content-preview__main">
                    <div className="content-preview__wrapper">
                        {activeContent.fields.map((content, index) => (
                            <ContentCard content={content} key={index} height={405} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContentPreview
