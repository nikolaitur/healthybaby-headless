import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ProductGallery = ({ props }) => {
    // const { header, subheader, desktopImage, mobileImage, ctaText, ctaUrl } = content.fields

    return (
        <div className="product-gallery">
            <div className="product-gallery__image">
                <Image
                    className=""
                    src={`https://images.ctfassets.net/urdrzzac4igp/2tXTyHkmAmp1vt1mQG3Vui/1739c50f44a05d20ed917b264e4628a6/Group_74__4_.png`}
                    alt={`image`}
                    layout="responsive"
                    objectFit="cover"
                    height="615"
                    width="490"
                />
            </div>
            <div className="product-gallery__image">
                <Image
                    className=""
                    src={`https://images.ctfassets.net/urdrzzac4igp/2tXTyHkmAmp1vt1mQG3Vui/1739c50f44a05d20ed917b264e4628a6/Group_74__4_.png`}
                    alt={`image`}
                    layout="responsive"
                    objectFit="cover"
                    height="615"
                    width="490"
                />
            </div>
            <div className="product-gallery__image product-gallery__image--full-width">
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
            <div className="product-gallery__image">
                <Image
                    className=""
                    src={`https://images.ctfassets.net/urdrzzac4igp/2tXTyHkmAmp1vt1mQG3Vui/1739c50f44a05d20ed917b264e4628a6/Group_74__4_.png`}
                    alt={`image`}
                    layout="responsive"
                    objectFit="cover"
                    height="615"
                    width="490"
                />
            </div>
            <div className="product-gallery__image">
                <Image
                    className=""
                    src={`https://images.ctfassets.net/urdrzzac4igp/2tXTyHkmAmp1vt1mQG3Vui/1739c50f44a05d20ed917b264e4628a6/Group_74__4_.png`}
                    alt={`image`}
                    layout="responsive"
                    objectFit="cover"
                    height="615"
                    width="490"
                />
            </div>

        </div>
    )
}

export default ProductGallery
