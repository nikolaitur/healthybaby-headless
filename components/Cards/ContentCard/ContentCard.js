import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ContentCard = ({ content }) => {
    const { title, topic, stage } = content.fields
    const image = content.fields.image.fields.file.url
    return (
        <div className="content-card">
            <div className="content-card__image">
                <Link href="/">
                    <Image
                        src={`https:${image}`}
                        alt={``}
                        width="570"
                        height="405"
                    />
                </Link>
            </div>
            <div className="content-card__content">
                <div className="content-card__subheader">
                    <span>{ topic }</span>
                    {stage ? (
                        <>
                            <span className="bullet">&nbsp;&nbsp;&nbsp;•&nbsp;&nbsp;&nbsp;</span>
                            <span>{ stage }</span>
                        </>
                    ) : ""}
                </div>
                <div className="content-card__header">{ title }</div>
            </div>
        </div>
    )
}

export default ContentCard
