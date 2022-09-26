import React from 'react'
import { useState, useEffect } from 'react'
import { useCart } from '@nacelle/react-hooks'
import { nacelleClient } from 'services'
import { getSelectedVariant } from 'utils/getSelectedVariant'
import { getCartVariant } from 'utils/getCartVariant'
import Link from 'next/link';
import Image from 'next/image';

import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'

import StarFull from '../../../svgs/star-full.svg'
import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'

const ProductInfo = ( props ) => {
    const { product } = props

    const [, { addToCart }] = useCart()
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
    const [selectedOptions, setSelectedOptions] = useState(selectedVariant.content.selectedOptions)
    const [selectedCombination, setSelectedCombination] = useState(true);
    const [activeOption, setActiveOption] = useState(0)
    const [activeTab, setActiveTab] = useState(0);
    const [quantity, setQuantity] = useState(1)
    const [review, setReview] = useState(false)

    const diaperCalculatorContext = useDiaperCalculatorContext()

    let options = null

    if (product?.content?.options?.some((option) => option.values.length > 1)) {
      options = product?.content?.options
    }

    const handleOptionChange = (optionName, optionValue = false, index = activeOption) => {
        const newOption = { name: optionName, value: optionValue }
        const optionIndex = selectedOptions.findIndex((selectedOption) => {
            return selectedOption.name === newOption.name
        })

        const newSelectedOptions = [...selectedOptions]
        if (optionIndex > -1) {
            newSelectedOptions.splice(optionIndex, 1, newOption)
            setSelectedOptions([...newSelectedOptions])
        } else {
            setSelectedOptions([...newSelectedOptions, newOption])
        }
        const variant = getSelectedVariant({
            product,
            options: newSelectedOptions,
        })
        setSelectedVariant(variant ? { ...variant } : null)
        setActiveOption(index)
    }

    const handleCheckBoxChange = (option) => { 
        setSelectedCombination(!selectedCombination)

        let optionValue = (!selectedCombination ? option.values[0] : option.values[1])

        handleOptionChange(option.name, optionValue)
    }; 

    // To Do Confgiure Recharge
    const handleSubscriptionChange = (event) => {
        console.log(event.target.value)
    }

    const handleDecrementChange = () => {
        if (quantity <= 1) {
            setQuantity(1)
        } else {
            setQuantity(--quantity)
        }
    }

    const handleIncrementChange = () => {
        setQuantity(++quantity)
        // setQuantity(+event.target.value)
    }

    // Get product data and add it to the cart by using `addToCart`
    // from the `useCart` hook provided by `@nacelle/react-hooks`.
    // (https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks)
    const handleAddItem = () => {
        const variant = getCartVariant({
            product,
            variant: selectedVariant,
        })
        addToCart({
            variant,
            quantity,
        })
    }

    useEffect(() => {
        const getReview = async () => {
            await fetch('https://api.juniphq.com/v1/products/1167302', {
                method: 'GET',
                headers: {
                  'Content-Type': 'multipart/form-data',
                  'Junip-Store-Key': '8Y8nYkJkWCVANh2xkZy7L5xL'
                },
              })
              .then(res => res.json())
              .then((data) => {
                setReview(data.product)
            })
        }
    
        getReview()
    }, [])

    return (
        product ? (
            <div className="product-info">
                <div className="product-info__sticky">
                    {review ? (
                        <div className="product-info__reviews">
                            <div className="product-info__reviews--stars">
                                <StarFull />
                                <StarFull />
                                <StarFull />
                                <StarFull />
                                <StarFull />
                            </div>
                            <div className="product-info__reviews--count">{ review.rating_count } reviews</div>
                        </div>
                    ) : ""}

                    {product.content?.title && <h1 className="product-info__title h3">{product.content.title}</h1>}
                    <div className="product-info__description">The safest diaper for baby's developing brain & body.</div>
                    <h4 className="product-info__price">${selectedVariant.price}</h4>
                    <div className="product-form">
                        <div className="product-form__options">
                            {options &&
                                options.map((option, oIndex) => {
                                    return (
                                        option.name == "Size" ? (
                                            <>
                                                <div className="product-form__label">
                                                    <span>Choose Size:</span><span onClick={() => diaperCalculatorContext.setIsOpen(true)}>Diaper calculator</span>
                                                </div>
                                                <div className="product-form__items">
                                                    {option.values.map((value, vIndex) => (
                                                        <button className={`product-form__option ${activeOption == vIndex ? "active" : ""}`} key={vIndex} value={value} onClick={() => handleOptionChange(option.name, value, vIndex)}>
                                                            {value}
                                                        </button>
                                                    ))}
                                                </div>
                                                <div className="product-form__count">{ selectedVariant.content.selectedOptions[0].value.match(/\((.*)\)/).pop().replace('diapers','') } Diapers per pack</div>
        
                                            </>
                                        ) : (
                                            <div className="product-form__add-on">
                                                <div className="product-form__add-on--image"></div>
                                                <div className="product-form__add-on--content">
                                                    <div className="product-form__add-on--title">Add a 4-pk of Wipes?</div>
                                                    <div className="product-form__add-on--price">+$27</div>
                                                </div>
                                                <input type="checkbox" onChange={() => handleCheckBoxChange(option)}></input>
                                            </div>
                                        )
                                    )
                                })  
                            }
                        </div> 
                        <div className="product-form__subscription" onChange={() => handleSubscriptionChange(event)}>
                            <div className="product-form__input-wrapper active">
                                <input type="radio" id="html" name="subscription" value="One Time" />
                                <label for="html">Buy One Time</label>
                            </div>
                            <div className="product-form__input-wrapper">
                                <input type="radio" id="html" name="subscription" value="Subscription" />
                                <label for="html">Monthly Auto-Ship  <span>Update sizing or cancel anytime</span></label>
                            </div>
                        </div>
                        <div className="product-form__add-to-cart">
                            <div className="product-form__quantity">
                                <button  className="product-form__quantity--decrement" onClick={() => handleDecrementChange()}>
                                    <Minus />
                                </button>
                                <div className="product-form__quantity--count" aria-label="product quantity">
                                    {quantity}
                                </div>
                                <button className="product-form__quantity--increment" onClick={() => handleIncrementChange()}>
                                    <Plus />
                                </button>
                            </div> 
                            <button className="product-form__submit btn secondary full-width" onClick={() => handleAddItem()}>Add To Cart</button>
                        </div> 
                        <div className='product-tabs'>
                            <div className="product-tabs__nav">
                                <div className={`product-tabs__title ${activeTab == 0 ? "active" : ""}`} onClick={() => setActiveTab(0)}>Details</div>
                                <div className={`product-tabs__title ${activeTab == 1 ? "active" : ""}`} onClick={() => setActiveTab(1)}>Ingredients</div>
                                <div className={`product-tabs__title ${activeTab == 2 ? "active" : ""}`} onClick={() => setActiveTab(2)}>Beneifts</div>
                            </div>
                            <div className="product-tabs__content">
                                <div className={`product-tabs__tab ${activeTab == 0 ? "active" : ""}`}>
                                    Plant-powered & engineered with proprietary magic channels & flash dry technology to instantly wick moisture from baby's skin, providing 30% better leak protection, even overnight.
                                </div>
                                <div className={`product-tabs__tab ${activeTab == 1 ? "active" : ""}`}>
                                    Plant-powered & engineered with proprietary magic channels & flash dry technology to instantly wick moisture from baby's skin, providing 30% better leak protection, even overnight.
                                </div>
                                <div className={`product-tabs__tab ${activeTab == 2 ? "active" : ""}`}>
                                    Plant-powered & engineered with proprietary magic channels & flash dry technology to instantly wick moisture from baby's skin, providing 30% better leak protection, even overnight.
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </div>
        ) : ""
    )
}

export default ProductInfo
