import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const About = ({ content }) => {
    const { header, subheader, copy, links, imageTitle, imageSubtitle } = content.fields
    const image = content.fields.image.fields.file.url  

    return (
        <section className="about">
            <div className="about__container container">
                <div className="about__content">
                    <h6 className="about__subheader">{ subheader }</h6>
                    <h3 className="about__header">
                        { header }
                    </h3>
                    <div className="about__image about__image--mobile">
                        <Image
                            src={`https:${image}`}
                            alt={subheader}
                            width="785"
                            height="750"
                        />
                    </div>
                    <h5 className="about__copy">
                        { copy }
                    </h5>
                    <div className="about__links">
                        {links.map((link, index) => {
                            return (
                                <div className="about__link" key={index}>
                                    <Link href={link.fields.url}>
                                        <div className="about__button">
                                            <span>{ link.fields.title }</span>
                                            <span><LongArrowRight /></span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="about__image about__image--desktop">
                    <Image
                        src={`https:${image}`}
                        alt={subheader}
                        width="785"
                        height="750"
                    />
                    <div className="about__title">
                        {imageTitle}
                    </div>
                    <div className="about__subtitle">
                        {imageSubtitle}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About
