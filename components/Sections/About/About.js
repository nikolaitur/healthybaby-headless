import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

import LongArrowRight from '../../../svgs/long-arrow-right.svg'

const About = ({ content }) => {
    console.log(content, 'about')
    const { header, subheader, copy, links } = content.fields
    const image = content.fields.image.fields.file.url  
    
    console.log(links)
    return (
        <section className="about">
            <div className="about__container container">
                <div className="about__content">
                    <div className="about__subheader">{ subheader }</div>
                    <div className="about__header">
                        { header }
                    </div>
                    <div className="about__image about__image--mobile">
                        <Image
                            src={`https:${image}`}
                            alt={subheader}
                            width="785"
                            height="750"
                        />
                    </div>
                    <div className="about__copy">
                        { copy }
                    </div>
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
                </div>
            </div>
        </section>
    )
}

export default About
