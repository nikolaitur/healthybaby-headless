import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const CollectionCard = ({ content }) => {
    const { ctaText, ctaUrl } = content.fields
    const backgroundImage = content.fields.image.fields.file.url
    return (
        <div className="collection-card">
            <div className="collection-card__image">
                <Image
                    src={`https:${backgroundImage}`}
                    alt={ctaText}
                    layout="fill"
                />
            </div>
            <div className="collection-card__cta">
                <Link href={ctaUrl}>
                    {ctaText}
                </Link>
            </div>
        </div>
    )
}

export default CollectionCard
