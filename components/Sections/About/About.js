import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser'
import ThreeStarsIcon from '@/svgs/three-stars.svg'
import OneStarIcon from '@/svgs/one-star.svg'

import LongArrowRight from '@/svgs/long-arrow-right.svg'
import ArrowRightMobile from '@/svgs/arrow-right-mobile.svg'

const About = ({ content }) => {
    const { header, subheader, copy, links, imageTitle, imageSubtitle, displayStars } = {...content.fields}
    const image = content.fields.image.fields.file.url
    return (
        <section className="about">
            <div className="about__container container">
                <div className="about__content">
                    <h6 className="about__subheader">{ subheader }</h6>
                    <h3 className="about__header">
                        { parse(header) }
                    </h3>
                    <div className="about__image-container about__image-container--mobile">
                        <div className="about__image">
                            {displayStars && <div className="about__image-top-stars">
                                <div className="about__image-three-stars">
                                    <ThreeStarsIcon />
                                </div>
                            </div>}
                            <Image
                                src={`https:${image}`}
                                alt={subheader}
                                sizes="(min-width: 1080px) 75vw, (min-width: 1400px) 1200px"
                                layout="fill"
                            />
                            {displayStars && <div className="about__image-bottom-stars">
                                <div className="about__image-one-star">
                                    <OneStarIcon />
                                </div>
                                <div className="about__image-three-stars">
                                    <ThreeStarsIcon />
                                </div>
                            </div>}
                        </div>
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
                                            <span className="about__button-icon about__button-icon--desktop"><LongArrowRight /></span>
                                            <span className="about__button-icon about__button-icon--mobile"><ArrowRightMobile /></span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="about__image-container about__image-container--desktop">
                    <div className="about__image">
                        {displayStars && <div className="about__image-top-stars">
                            <div className="about__image-three-stars">
                                <ThreeStarsIcon />
                            </div>
                        </div>}
                        <Image
                            src={`https:${image}`}
                            alt={subheader}
                            sizes="(min-width: 1080px) 75vw, (min-width: 1400px) 1200px"
                            layout="fill"
                        />
                        {displayStars && <div className="about__image-bottom-stars">
                            <div className="about__image-one-star">
                                <OneStarIcon />
                            </div>
                            <div className="about__image-three-stars">
                                <ThreeStarsIcon />
                            </div>
                        </div>}
                    </div>
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
