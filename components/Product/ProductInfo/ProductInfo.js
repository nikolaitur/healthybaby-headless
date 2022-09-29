import React from 'react'
import { useState, useEffect } from 'react'
import { useCart } from '@nacelle/react-hooks'
import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { getSelectedVariant } from 'utils/getSelectedVariant'
import { getCartVariant } from 'utils/getCartVariant'
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';

import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import ProductOptions from '../../Product/ProductOptions'

import { useCartDrawerContext } from '../../../context/CartDrawerContext'
import { useDiaperCalculatorContext } from '../../../context/DiaperCalculatorContext'

import StarFull from '../../../svgs/star-full.svg'
import Plus from '../../../svgs/plus.svg'
import Minus from '../../../svgs/minus.svg'

const ProductInfo = ( props ) => {
    const { product, page } = props

    const [, { addToCart }] = useCart()
    const [selectedVariant, setSelectedVariant] = useState(product.variants[0])
    const [selectedOptions, setSelectedOptions] = useState(selectedVariant.content.selectedOptions)
    const [selectedCombination, setSelectedCombination] = useState(true);
    const [isSubscription, setIsSubscription] = useState(false)
    const [purchaseSubscription, setPurchaseSubscription] = useState(false)
    const [activeOption, setActiveOption] = useState(0)
    const [activeTab, setActiveTab] = useState(0);
    const [quantity, setQuantity] = useState(1)
    const [review, setReview] = useState(false)

    const cartDrawerContext =  useCartDrawerContext()
    const diaperCalculatorContext = useDiaperCalculatorContext()

   // console.log(product, "info", selectedVariant, page)

    const richTextRenderOptions = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                return (
                    <></>
                )
            },
        }
      }

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
        // setActiveOption(index)
    }

    const handleCheckBoxChange = (option) => { 
        setSelectedCombination(!selectedCombination)

        let optionValue = (!selectedCombination ? option.values[0] : option.values[1])

        handleOptionChange(option.name, optionValue)
    }; 

    // To Do Confgiure Recharge
    const handleSubscriptionChange = (event) => {
        console.log(event.target.value)
        if(event.target.value === "Subscription") {
            setPurchaseSubscription(true)
        }
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
    const handleAddItem = async () => {
        const variant = getCartVariant({
            product,
            variant: selectedVariant,
        })

        if(purchaseSubscription) {
            let sellingPlan = selectedVariant.metafields.find((metafield) => metafield.key === 'sellingPlanAllocations')

            let lineItem = {
                nacelleEntryId: selectedVariant.nacelleEntryId,
                quantity: quantity,
            }

            if(!sellingPlan) {
                sellingPlan = false
            } else {
                const sellingPlanAllocationsValue = JSON.parse(sellingPlan.value)
                const sellingPlanId = atob(sellingPlanAllocationsValue[0].sellingPlan.id)

                lineItem = {
                    nacelleEntryId: selectedVariant.id,
                    quantity: quantity,
                    sellingPlanId,
                    attributes: [{ key: 'subscription', value: sellingPlanId }]
                }
            }

            addToCart({
                variant,
                quantity,
                sellingPlan,
                subscription: true,
                nacelleEntryId: selectedVariant.nacelleEntryId
            })

            await cartClient.cartLinesAdd({
                cartId: `${cartDrawerContext.shopifyCartId}`,
                lines: [
                    lineItem    
                ]
              })
              .then((data) => {
                console.log(data, "Cart data")
                // commit('setCartLineItems', res.lines)
              })
              .catch((err) => {
                console.error(err, "Error")
              })
        } else {
            console.log("one-time")
            let sellingPlan = selectedVariant.metafields.find((metafield) => metafield.key === 'sellingPlanAllocations')

            if(!sellingPlan) {
                sellingPlan = false
            }

            addToCart({
                variant,
                quantity,
                sellingPlan,
                subscription: false,
                nacelleEntryId: selectedVariant.nacelleEntryId
            })

            await cartClient.cartLinesAdd({
                cartId: cartDrawerContext.shopifyCartId,
                lines: [
                  {
                    nacelleEntryId: selectedVariant.nacelleEntryId,
                    quantity: quantity,
                  }
                ]
              })
              .then((res) => {
                console.log(res)
                // commit('setCartLineItems', res.lines)
              })
              .catch((err) => {
                console.error(err, "Error")
              })
        }

        // console.log(cartDrawerContext)

        cartDrawerContext.setIsOpen(true)
    }

    useEffect(() => {
        const sellingPlanAllocations = selectedVariant.metafields.find(
            (metafield) => metafield.key === 'sellingPlanAllocations'
        )

        setIsSubscription(sellingPlanAllocations)

        // console.log(sellingPlanAllocations, "sellingPlan")
    }, [])

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
                            <>
                                <span class="junip-store-key" data-store-key="8Y8nYkJkWCVANh2xkZy7L5xL"></span>
                                
                                <span class="junip-product-summary" data-product-id="4522469523505"></span>
                                {/* <span class="junip-product-summary" data-product-id={product.sourceEntryId.split("gid://shopify/Product/").pop()}></span> */}
                            </>
                            {/* <div className="product-info__reviews--count">{ review.rating_count } reviews</div> */}
                        </div>
                    ) : ""}

                    {product.content?.title && <h1 className="product-info__title h3">{product.content.title}</h1>}
                    <div className="product-info__description">The safest diaper for baby's developing brain & body.</div>
                    <h4 className="product-info__price">${selectedVariant.price}</h4>
                    <div className="product-form">
                        <div className="product-form__options">
                            {options &&
                                options.map((option, oIndex) => {
                                    
                                        let type = option.name

                                        switch (type) {
                                            case 'Combination': 
                                                return (
                                                    <div className="product-form__add-on" onChange={() => handleCheckBoxChange(option)}>
                                                        <div className="product-form__add-on--image"></div>
                                                        <div className="product-form__add-on--content">
                                                            <div className="product-form__add-on--title">Add a 4-pk of Wipes?</div>
                                                            <div className="product-form__add-on--price">+$27</div>
                                                        </div>
                                                        <input type="checkbox" ></input>
                                                    </div>
                                                )
                                            default:
                                            return <ProductOptions option={option} handleOptionChange={handleOptionChange} key={oIndex}/>
                                        }
                                })  
                            }
                        </div> 

                        {isSubscription ? (
                            <div className="product-form__subscription" onChange={(event) => handleSubscriptionChange(event)}>
                                <div className="product-form__input-wrapper active">
                                    <input type="radio" id="html" name="subscription" value="One Time" />
                                    <label for="html">Buy One Time</label>
                                </div>
                                <div className="product-form__input-wrapper">
                                    <input type="radio" id="html" name="subscription" value="Subscription" />
                                    <label for="html">Monthly Auto-Ship  <span>Update sizing or cancel anytime</span></label>
                                </div>
                            </div>
                        ): ""}
                        
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
                        <div className="product-status">
                            {product.availableForSale ? (
                                <p><span>• In Stock</span> Ships within 1-2 business days.</p>
                            ) : ""}
                            <p>Complimentary shipping over $100</p>
                        </div>
                        {page.fields?.messageTitle && page.fields?.messageText && page.fields?.messageUrl ? (
                            <div className="product-message">
                                <p className="product-message__title large">{ page.fields.messageTitle }</p>
                                <div className="product-message__wrapper">
                                    <div className="product-message__image"></div>
                                    <p className="product-message__text large">{ page.fields.messageText }</p>
                                    <Link href={page.fields.messageUrl }>
                                        <div className="product-message__link">
                                            <span>Shop Now</span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ) : ""}
                        
                        {page.fields?.productDetailTabTitle1 ? (
                            <div className='product-tabs'>
                                <div className="product-tabs__nav">
                                    {page.fields?.productDetailTabTitle1 && page.fields?.productDetailTabContent1 ? (<div className={`product-tabs__title ${activeTab == 0 ? "active" : ""}`} onClick={() => setActiveTab(0)}>{page.fields.productDetailTabTitle1}</div>) : ""}
                                    {page.fields?.productDetailTabTitle2 && page.fields?.productDetailTabContent2 ?(<div className={`product-tabs__title ${activeTab == 1 ? "active" : ""}`} onClick={() => setActiveTab(1)}>{page.fields.productDetailTabTitle2}</div>) : ""}
                                    {page.fields?.productDetailTabTitle3 && page.fields?.productDetailTabContent3 ? (<div className={`product-tabs__title ${activeTab == 2 ? "active" : ""}`} onClick={() => setActiveTab(2)}>{page.fields.productDetailTabTitle3}</div>) : ""}
                                </div>
                                <div className="product-tabs__content">
                                    {page.fields?.productDetailTabTitle1 && page.fields?.productDetailTabContent1 ? (
                                        <div className={`product-tabs__tab ${activeTab == 0 ? "active" : ""}`} dangerouslySetInnerHTML={{__html:  documentToHtmlString(page.fields.productDetailTabContent1, richTextRenderOptions) }}></div>
                                    ) : ""}
                                    {page.fields?.productDetailTabTitle2 && page.fields?.productDetailTabContent2 ? (
                                        <div className={`product-tabs__tab ${activeTab == 1 ? "active" : ""}`} dangerouslySetInnerHTML={{__html:  documentToHtmlString(page.fields.productDetailTabContent2, richTextRenderOptions) }}></div>
                                    ) : ""}
                                    {page.fields?.productDetailTabTitle3 && page.fields?.productDetailTabContent3 ? (
                                        <div className={`product-tabs__tab ${activeTab == 2 ? "active" : ""}`} dangerouslySetInnerHTML={{__html:  documentToHtmlString(page.fields.productDetailTabContent3, richTextRenderOptions) }}></div>
                                    ) : ""}
                                </div>
                            </div> 
                         ) : ""}
    
                    </div>
                </div>
            </div>
        ) : ""
    )
}

export default ProductInfo
