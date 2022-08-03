import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ContentCard = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url
    return (
        <div className="content-card">
            <div className="content-card__image">
                <Link href="/">
                    <Image
                        src={`https://images.ctfassets.net/urdrzzac4igp/3dbQX7tIxePa0mwVGLL1Dq/ae51673056338d645fb38907357dd753/Mask_group.png`}
                        alt={``}
                        width="570"
                        height="405"
                    />
                </Link>
            </div>
            <div className="content-card__content">
                <div className="content-card__subheader">
                    <span>DIAPERING</span><span className="bullet">•</span><span>3-6 months</span>  
                </div>
                <div className="content-card__header">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
            </div>
        </div>
    )
}

export default ContentCard
