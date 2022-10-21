import { useState, useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { Player } from 'video-react';
import LongArrowRight from '../../../svgs/long-arrow-right.svg'
import parse from 'html-react-parser'
import ReactPlayer from 'react-player/lazy'
import PlayIcon from '@/svgs/play-icon.svg'


const HeroBanner = ({ content }) => {

    console.log("content:", content)

    const { title, subtitle, subtitlePosition, featuredMedia, mobileBackgroundImage, ctaText, ctaUrl, alignment, verticalAlignment, hideCta, videoLink } = {...content.fields}

    const [hasWindow, setHasWindow] = useState(false)
    const [isPlaying, setIsPlaying] = useState(false)

    const isVideo = featuredMedia?.fields?.file?.contentType.includes('video')

    let subtitleTruePosition = 'above title'

    if (subtitlePosition) {
        subtitleTruePosition = subtitlePosition
    }

    const playVideo = () => {
        setIsPlaying(true)
      }

    useEffect(() => {
        if (typeof window !== 'undefined') {
          setHasWindow(true)
        }
      }, [])

    return (
        <section className={`hero ${isVideo || videoLink ? 'hero--video' : ''}`}>
            <div className="hero__image">

                {hasWindow && videoLink ? (
                    <ReactPlayer
                        url={videoLink}
                        playing={isPlaying}
                        controls={true}
                        className="hero-video__video-player"
                        width="100%"
                        height="100%"
                    />
                ): (isVideo) && (
                    featuredMedia?.fields?.file && isVideo && <Player playsInline loop={true} autoPlay={true} muted={true}>
                        <source src={`https:${featuredMedia.fields.file.url}`} />
                    </Player>
                )}


                {!isPlaying &&
                    <>
                        {featuredMedia?.fields?.file && !isVideo && <Image
                            className="hero__image--desktop"
                            src={`https:${featuredMedia.fields.file.url}`}
                            alt={title}
                            layout="fill"
                        />}
                        {mobileBackgroundImage?.fields?.file && mobileBackgroundImage.fields.file.contentType.includes('image') && <Image
                            className="hero__image--mobile"
                            src={`https:${mobileBackgroundImage.fields.file.url}`}
                            alt={title}
                            layout="fill"
                        />}
                    </>
                }
            </div>
            {!isPlaying && <div className={`hero__container hero__container--vertical-${verticalAlignment} hero__container--horizontal-${alignment} container`}>
                <div className="hero__content">
                    <div className="hero__content-header">
                        {subtitleTruePosition === 'above title' && <h4 className="hero__subheader">{ subtitle }</h4>}
                        <h1 className="hero__header">{ parse(title) }</h1>
                        {subtitleTruePosition === 'below title' && <h4 className="hero__subheader">{ subtitle }</h4>}
                    </div>

                    {videoLink ? (
                        <button
                            className={`hero-video__icon ${isPlaying ? 'hide' : ''}`}
                            onClick={() => playVideo()}
                        >
                            <PlayIcon />
                        </button>
                    ):(
                        <>
                            {hideCta === 'False' && <div className="hero__cta">
                                <Link href={ctaUrl || ''}>
                                    <button className="hero__button btn">
                                        <span>{ctaText}</span>
                                        <span><LongArrowRight /></span>
                                    </button>
                                </Link>
                            </div>}
                        </>
                    )}

                </div>
            </div>}
        </section>
    )
}

export default HeroBanner
