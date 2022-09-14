import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { useCart } from '@nacelle/react-hooks'

import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'
import Trash from '../../../svgs/trash.svg'

const LineItem = ({item}) => {
  console.log(item)

  const [
    { cart },
    { incrementItem, decrementItem, removeFromCart },
  ] = useCart()

  const getOptions = () => {
    let singleVariant = true
    if(item.variant.selectedOptions.length > 0) {
        if(item.variant.selectedOptions[0].value == "Default Title") {
            return false
        }
    }

    return true
  }

  const decrement = () => {
    if (item.quantity <= 1) {
      removeFromCart(item)
    } else {
      decrementItem(item)
    }
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
            <div className="line-item__quantity">
                <div className="line-item__quantity--wrapper">
                    <button onClick={() => decrement()} className="line-item__decrement">
                        <Minus />
                    </button>
                    <div className="line-item__count" aria-label="product quantity">
                        {item.quantity}
                    </div>
                    <button onClick={() => incrementItem(item)} className="line-item__increment">
                        <Plus />
                    </button>
                </div>
                <button onClick={() => removeFromCart(item)} className="line-item__trash">
                    <Trash />
                </button>
            </div>
        </div>
    </div>
  )
};

export default LineItem;
