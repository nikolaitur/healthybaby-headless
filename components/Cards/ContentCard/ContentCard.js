import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ContentCard = ({ content }) => {
    const { title, topic, stage, image } = {...content.fields}
    return (
        <div className="content-card">
            <div className="content-card__image">
                {image?.fields?.file?.url && <Link href="/">
                    <Image
                        src={`https:${image}`}
                        alt={``}
                        sizes="(min-width: 1080px) 33vw"
                        layout="fill"
                    />
                </Link>}
            </div>
            <div className="content-card__content">
                <div className="content-card__subheader">
                    <span>{ topic }</span>
                    {stage ? (
                        <>
                            <span className="bullet">{`\u00A0`}{`\u00A0`}{`\u00A0`}•{`\u00A0`}{`\u00A0`}{`\u00A0`}</span>
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
