import { createContext, useContext, useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { useCart, useCheckout } from '@nacelle/react-hooks'
import CartDrawer from '../components/Layout/CartDrawer'
import Router, { useRouter } from 'next/router'

import * as Cookies from 'es-cookie'

const CartDrawerContext = createContext()

export function useCartDrawerContext() {
  return useContext(CartDrawerContext)
}

export function CartDrawerProvider({ children }) {
    const [ { cart } ] = useCart()

    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState('')
    const [shopifyCartClient, setShopifyCartCartClient] = useState('')
    const [shopifyCartId, setShopifyCartId] = useState(false)

    useEffect(() => {
        const getCartDrawerContent = async () => {
            await nacelleClient.content({
                handles: ['cart-drawer']
            }).then(response => {
                setContent(response)
            })            
        }
        getCartDrawerContent()
    }, [])

    useEffect(() => {
        const getCartClient = async () => {

            const cartItems = cart.map((lineItem) => ({
                merchandiseId: lineItem.nacelleEntryId,
                nacelleEntryId: lineItem.nacelleEntryId,
                quantity: lineItem.quantity,
            }))

            const lines = cartItems

            if(!Cookies.get('shopifyCartId')) {
                console.log(shopifyCartId, "ID")
                cartClient.cart({
                    cartId: Cookies.get('shopifyCartId')
                }).then(response => {
                    console.log(response, "response")
                    if (response.cart.length) {
                        setShopifyCartCartClient(response.cart)
                        setShopifyCartId(response.cart.id)
                    }
                })
            } else {
                const shopifyCart = await cartClient.cartCreate({
                    lines,
                    attributes: [{ key: 'gift_options', value: 'in box with bow' }],
                    note: 'Please use a red ribbon for the bow, if possible :)'
                }).then(response => {
                    console.log(response)
                    if (response) {
                        setShopifyCartCartClient(response.cart)
                        setShopifyCartId(response.cart.id)
                        Cookies.set('shopifyCartId', response.cart.id)
                    }
                });                
            }
        }

        getCartClient()
    }, [])

    return (
        <CartDrawerContext.Provider value={{ isOpen, setIsOpen, content, shopifyCartClient, setShopifyCartCartClient,  shopifyCartId, setShopifyCartId }}>
            {children}
            <CartDrawer content={content} />
        </CartDrawerContext.Provider>
    )
}