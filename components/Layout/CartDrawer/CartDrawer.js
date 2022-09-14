import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import { useCart, useCheckout } from '@nacelle/react-hooks'
import { useCartDrawerContext } from '../../../context/CartDrawerContext'

import LineItem from './LineItem'
import Upsell from './Upsell'

import IconClose from '../../../svgs/close-icon.svg'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const CartDrawer = ({ content }) => {
    console.log(content, "content")
    const [
        { cart },
        { incrementItem, decrementItem, removeFromCart, clearCart, addToCart },
      ] = useCart()
    
    const [drawerContent, setDrawerContent] = useState(false)
    const [upsells, setUpsells] = useState(false)
    const [upsellsData, setUpsellsData] = useState({ products: [], variants: []})
    const cartDrawerContext =  useCartDrawerContext()
    const cartDrawerContent = cartDrawerContext.content[0]

    const cartSubtotal = cart.reduce((sum, lineItem) => {
        return sum + lineItem.variant.price * lineItem.quantity
    }, 0)

    const cartItemTotal = cart.reduce((sum, lineItem) => {
        return sum + lineItem.quantity
    }, 0)

    let freeShipping = false
    const freeShippingLimit = 100
    const freeShippingDistance = Math.abs((cartSubtotal - freeShippingLimit) + freeShippingLimit)

    if(cartSubtotal > freeShippingLimit) {
        freeShipping = true
    }

    useEffect(() => {
        setDrawerContent(content)
    }, [content])

    useEffect(() => {
        const getUpsells = async () => {
            const productList = drawerContent[0].fields.upsells.map(product => product.fields.handle.split("::")[0]);
            const productVariants = drawerContent[0].fields.upsells.map(product => product.fields?.variantId ? product.fields.variantId : false)

            await nacelleClient.products({
                handles: productList
            }).then(response => {
                setUpsells(true)
                setUpsellsData({
                    products: response,
                    variants: productVariants
                })
            })
        }

        if(drawerContent[0]) {
            getUpsells()
        }
                
    }, [upsells, drawerContent]);

    const closeSlide = () => {
        cartDrawerContext.setIsOpen(false)
    }

    const handleProcessCheckout = async () => {
        // Maps the cart line items into a new array with Shopify
        // required properties: `variantId` and `quantity`.
        const cartItems = cart.map((lineItem) => ({
          variantId: lineItem.variant.id,
          quantity: lineItem.quantity,
        }))
    
        // `processCheckout` utilizes the Shopify Checkout client to create 
        // a checkout using the provided `cartItems` array. If successful,
        // a URL and completed state are returned, which can then be used to
        // redirect the user to the Shopify checkout.
        // (https://github.com/getnacelle/nacelle-js/tree/main/packages/shopify-checkout)
        await processCheckout({ cartItems })
          .then(({ url, completed }) => {
            if (url && !completed) {
              window.location = url
            }
          })
          .catch((err) => {
            console.error(err)
          })
    }

    return (
        <div className={`cart-drawer ${cartDrawerContext.isOpen ? "active" : ""}`}>
            <div className="cart-drawer__overlay" onClick={() => closeSlide()}></div>
            <div className={`cart-drawer__container`}>
                <div className="cart-drawer__content">
                    {cartDrawerContent?.fields.marketingMessage ? (
                        <div className="cart-drawer__messaging">{ cartDrawerContent.fields.marketingMessage }</div>
                    ) : ""}

                    <div className="cart-drawer__header">
                        <div className="cart-drawer__title">
                            Your Bag <span>{ cartItemTotal }</span>
                        </div>
                        <div className="cart-drawer__close" onClick={() => closeSlide()}>
                            <IconClose />
                        </div>
                    </div>
                    <div className={`cart-drawer__shipping ${freeShipping ? "free" : ""}`}>
                        <span className="message">
                            {freeShipping ? (
                                <>
                                    <span><strong>You’ve earned free shipping!</strong></span>
                                </>
                            ) : (
                                <span><strong>${freeShippingLimit - cartSubtotal}</strong> away from complimentary shipping</span>
                            )}
                        </span>
                        <span className="border">
                            <span className="progress-bar" style={{width:  freeShippingDistance + "%"}}></span>
                        </span>
                    </div>
                    {cart.length ? (
                        <>
                            <div className="cart-drawer__items">
                                {cart.map((lineItem, index) => (
                                    <LineItem item={lineItem} key={index} />
                                ))}
                            </div>
                            {drawerContent[0] ? (
                                drawerContent[0].fields.upsells.length > 1 ? (
                                    <div className="cart-drawer__upsells">
                                        <div className="cart-drawer__upsells--title">Pair with these essentials:</div>
                                        <div className="cart-drawer__upsells--wrapper">
                                            {upsells ? (
                                                upsellsData.products.map((upsell, index) => (
                                                    <Upsell key={index} product={upsell} variantId={upsellsData.variants[index]} />
                                                ))
                                            ) : ""}
                                            
                                        </div>
                                    </div>
                                ) : ""
                            ) : ""}
                            
                            <div className="cart-drawer__checkout">
                                <button className="btn secondary full-width" onClick={handleProcessCheckout}>
                                    <span>{`Checkout - $${cartSubtotal}`}</span>
                                </button>
                            </div>
                        </>

                    ) : (
                        <div className="cart-drawer__empty">
                            Your bag is empty
                        </div>
                    )}
                </div>   
            </div>
        </div>
    )
}

export default CartDrawer