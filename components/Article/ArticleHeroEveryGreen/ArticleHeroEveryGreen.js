import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ArticleHeroEveryGreen = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url
    return (
        <div className="article-hero">
            <div className="article-hero__breadcrumbs">
                <Link href="/">
                    <div className="article-hero__breadcrumb">
                        <span>Home /{`\u00A0`}</span>
                    </div>
                </Link>
                <Link href="/">
                    <div className="article-hero__breadcrumb">
                        <span> Breadcrumb</span>
                    </div>
                </Link>
            </div>
            <h3 className="article-hero__title">How to foster deeper connections with your baby</h3>
            <div className="article-hero__image">
                <Image
                        className=""
                        src={`https://images.ctfassets.net/urdrzzac4igp/53rLh7AGXQVR2AW0DF4iTq/9f996b64bb25d31dbac5d6f994981117/Mask_group__20_.png`}
                        alt={`image`}
                        layout="responsive"
                        objectFit="cover"
                        height="700"
                        width="650"
                    />
            </div>
        </div>
    )
}

export default ArticleHeroEveryGreen
