import React from 'react'
import { useState, useEffect} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import parse from 'html-react-parser'

import Plus from '../../../svgs/plus.svg'

const ContentTimeline = ({ content }) => {

    useEffect(function mount() {
        window.addEventListener("scroll", timeLineScroll);
        window.addEventListener("scroll", fadeIn);

        return function unMount() {
            window.removeEventListener("scroll", timeLineScroll);
            window.addEventListener("scroll", fadeIn);
        };
    });

    const timeLineScroll = () => {
        const scrollProgress = document.getElementById('content-timeline__line');
        const height = document.getElementById('content-timeline__items').offsetHeight - document.getElementById('content-timeline__items').offsetTop
        const items = document.getElementById('content-timeline__items')
        const itemsBottom = items.offsetTop + items.offsetHeight
        let padding = 200
        let scrollOnce = false

        window.addEventListener('scroll', () => {
            const scrollTop = document.documentElement.scrollTop - document.getElementById('content-timeline__items').offsetTop + padding

            if(!scrollOnce) {
                if((document.body.scrollTop || document.documentElement.scrollTop) > (itemsBottom - padding)) {
                    scrollOnce = true
                    scrollProgress.style.height = "100%";
                } else {
                    scrollProgress.style.height = `${((scrollTop / document.getElementById('content-timeline__items').offsetHeight)) * 100}%`;
                }
            }
        });
    }

    const isElementInViewport = (el) => {
        let rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    const fadeIn = () => {
        const items =  document.querySelectorAll(".content-timeline__item")
        for (let i = 0; i < items.length; i++) {
          if (isElementInViewport(items[i])) {
            items[i].classList.add("fade-in");
          } else {
            // items[i].classList.remove("fade-in");
          }
        }
    }

    const contentTimelineBlock = (item, index) => {
        const { header, description, ctaText, ctaUrl } = {...item.fields}
        return (
            <div className="content-timeline__item" key={index}>
                <div className="content-timeline__title">{ header }</div>
                <p className="content-timeline__copy large">{ description }</p>
                {ctaText && ctaUrl ? (
                    <Link href={ctaUrl}>
                        <div className="content-timeline__link">
                            <span><Plus /></span>
                            <span>{ctaText}</span>
                        </div>
                    </Link>
                ) : ""}
            </div>
        )
    }

    return (
        <section className="content-timeline">
            <div className="content-timeline__container container">
                <div className="content-timeline__sticky">
                    {content.fields?.desktopImage?.fields?.file?.url ? (
                        <div className="content-timeline__image content-timeline__image--desktop">
                            <Image
                                className=""
                                src={`https:${content.fields.desktopImage.fields.file.url}`}
                                alt={content.fields.desktopImage.fields.title}
                                layout="responsive"
                                objectFit="cover"
                                height="512"
                                width="512"
                            />
                        </div>
                    ) : ""}

                    {content.fields?.mobileImage?.fields?.file?.url ? (
                        <div className="content-timeline__image content-timeline__image--mobile">
                            <Image
                                className="mobile"
                                src={`https:${content.fields.mobileImage.fields.file.url}`}
                                alt={content.fields.mobileImage.fields.title}
                                layout="responsive"
                                objectFit="cover"
                                height="300"
                                width="300"
                            />
                        </div>
                    ) : ""}
                </div>
                <div className="content-timeline__content">
                    {content.fields?.subheader ? (
                        <h6 className="content-timeline__subheader">{ content.fields.subheader }</h6>
                    ) : ""}
                    {content.fields?.header ? (
                        <h3 className="content-timeline__header">{ content.fields.header }</h3>
                    ) : ""}
                    {content.fields?.description ? (
                        <h4 className="content-timeline__description">{ content.fields.description }</h4>
                    ) : ""}
                    {content.fields?.sections ? (
                        <div id="content-timeline__items" className="content-timeline__items">
                            <div id="content-timeline__line" className="content-timeline__line"></div>
                            {content.fields.sections.map((item, index) => {
                                return contentTimelineBlock(item, index)
                            })}
                        </div>
                    ) : ""}
                </div>
            </div>
        </section>
    )
}

export default ContentTimeline
