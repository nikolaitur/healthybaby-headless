import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({ content }) => {
    // const { ctaText, ctaUrl } = content.fields
    // const backgroundImage = content.fields.image.fields.file.url
    return (
        <div className="product-card">
            <div className="product-card__image">
                <Link href="/">
                    <Image
                        src={`https://images.ctfassets.net/urdrzzac4igp/2rkdyg89YOKZU9QGZkh0sU/ef2bcf60039b4a74dba9960ca356007f/Product_img.png?h=250`}
                        alt={`Diaper`}
                        
                        width="570"
                        height="455"
                    />
                </Link>
            </div>
            <div className="product-card__content">
                <div className="product-card__title">
                    <Link href="/">Diapers</Link>
                </div>
                <div className="product-card__subtitle">6 sizes available — Made with our patented magic channels</div>
                <div className="product-card__reviews"></div>
                <div className="product-card__price">$30</div>
            </div>
        </div>
    )
}

export default ProductCard
