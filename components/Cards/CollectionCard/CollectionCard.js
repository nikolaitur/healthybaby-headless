import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const CollectionCard = ({ content }) => {
    const { ctaText, ctaUrl, image, imageHover, ctaTextColor, ctaBackgroundColor } = content.fields

    const style = {
        'backgroundColor': ctaBackgroundColor,
        'color': ctaTextColor,
    }

    return (
        <div className="collection-card">
            <div className={`collection-card__image ${imageHover?.fields?.file?.url ? 'collection-card__image-has-hover-image' : ''}`}>
                {image?.fields?.file?.url && <Image
                    src={`https:${image.fields.file.url}`}
                    alt={ctaText}
                    layout="fill"
                />}
                {imageHover?.fields?.file?.url && <Image
                    src={`https:${imageHover.fields.file.url}`}
                    alt={ctaText}
                    layout="fill"
                    className="collection-card__image-hover"
                />}
            </div>
            <div className="collection-card__cta">
                <Link href={ctaUrl || ''}>
                    <button className="btn" style={style}>{ctaText}</button>
                </Link>
            </div>
        </div>
    )
}

export default CollectionCard
