import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link';
import Image from 'next/image';

const ProductReviews = ({ props }) => {
    // const { header, subheader, desktopImage, mobileImage, ctaText, ctaUrl } = content.fields

    useEffect(() => {
        const getReview = async () => {
            await fetch('https://api.juniphq.com/v1/product_reviews/', {
                method: 'GET',
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Junip-Store-Key': '8Y8nYkJkWCVANh2xkZy7L5xL'
                },
              })
              .then(res => res.json())
              .then((data) => {
                console.log(data, "Reviews")
                // setReview(data.product)
            })
        }
    
        getReview()
    }, [])

    return (
        <div className="product-reviews">
        </div>
    )
}

export default ProductReviews
