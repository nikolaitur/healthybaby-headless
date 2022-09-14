import { useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import { useCart, useCheckout } from '@nacelle/react-hooks'
import { useCartDrawerContext } from '../../../context/CartDrawerContext'

import LineItem from './LineItem'

import IconClose from '../../../svgs/close-icon.svg'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css"

const CartDrawer = ({props, children}) => {
    const [
        { cart },
        { incrementItem, decrementItem, removeFromCart, clearCart, addToCart },
      ] = useCart()
    
    const cartDrawerContext =  useCartDrawerContext()
    const cartDrawerContent = cartDrawerContext.content[0]

    const cartSubtotal = cart.reduce((sum, lineItem) => {
        return sum + lineItem.variant.price * lineItem.quantity
    }, 0)

    useEffect(() => {
        console.log(cart, "cart", cartDrawerContent)
    })

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
                    {cartDrawerContent.fields?.marketingMessage ? (
                        <div className="cart-drawer__messaging">{ cartDrawerContent.fields.marketingMessage }</div>
                    ) : ""}

                    <div className="cart-drawer__header">
                        <div className="cart-drawer__title">
                            Your Bag <span>{ cart.length }</span>
                        </div>
                        <div className="cart-drawer__close" onClick={() => closeSlide()}>
                            <IconClose />
                        </div>
                    </div>
                    <div className="cart-drawer__shipping">
                        
                    </div>
                    {cart.length ? (
                        <div className="cart-drawer__items">
                            {cart.map((lineItem, index) => (
                                <LineItem item={lineItem} key={index} />
                            ))}
                        </div>
                    ) : ""}
                    
                    <div className="cart-drawer__upsell"></div>
                    <div className="cart-drawer__checkout">
                        <button className="btn secondary full-width" onClick={handleProcessCheckout}>
                            <span>{`Checkout - $${cartSubtotal}`}</span>
                        </button>
                    </div>
                </div>   
            </div>
        </div>
    )
}

export default CartDrawer