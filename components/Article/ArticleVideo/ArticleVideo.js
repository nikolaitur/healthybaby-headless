import React from 'react'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/lazy'
import Image from 'next/image';

import PlayIcon from '../../../svgs/play-icon.svg'

const ArticleVideo = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url
    
    const [isPlaying, setIsPlaying] = useState(false)

    const playVideo = () => {
        setIsPlaying(true)
    }

    return (
        <div className="article-video">
            <div className={`article-video__icon ${isPlaying ? "hide" : ""}`} onClick={() => playVideo()}>
                <PlayIcon />
            </div>
            <div className={`article-video__image ${isPlaying ? "hide" : ""}`} onClick={() => playVideo()}>
                <Image
                    className=""
                    src={`https://images.ctfassets.net/urdrzzac4igp/4WMD3LDJEyzqwXl7gJ3LnQ/5dab6b027ab4c5897e8d970e6a4a844b/Group_551.png`}
                    alt={`video`}
                    layout="responsive"
                    objectFit="cover"
                    height="650"
                    width="650"
                />
            </div>
            <ReactPlayer 
                url="https://www.youtube.com/watch?v=ysz5S6PUM-U" 
                playing={isPlaying}
                controls={true}
                className='article-video__video'
            />
        </div>
    )
}

export default ArticleVideo
