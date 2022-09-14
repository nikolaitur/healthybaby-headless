import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LineItem = ({item}) => {
  console.log(item)
  const getOptions = () => {
    let singleVariant = true
    if(item.variant.selectedOptions.length > 0) {
        if(item.variant.selectedOptions[0].value == "Default Title") {
            return false
        }
    }

    return true
  }
  return (
    <div className="line-item">
        <div className="line-item__image">
            <Image
                className=""
                src={`${item.variant.featuredMedia.src}`}
                alt={ item.variant.productTitle }
                layout="responsive"
                objectFit="cover"
                height="132"
                width="108"
            />
        </div>
        <div className="line-item__content">
            <div className="line-item__title">{ item.variant.productTitle }</div>
            {getOptions() ? (
                <div className="line-item__option">{ item.variant.selectedOptions[0].value }</div>
            ) : ""}
            
            <div className="line-item__price">${ item.variant.price }</div>
            <div className="line-item__quanity">

            </div>
        </div>
    </div>
  )
};

export default LineItem;
