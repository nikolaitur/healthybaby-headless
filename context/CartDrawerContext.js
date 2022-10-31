import { createContext, useContext, useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import cartClient from 'services/nacelleClientCart'
import { useCart, useCheckout } from '@nacelle/react-hooks'
import CartDrawer from '../components/Layout/CartDrawer'
import Router, { useRouter } from 'next/router'
import { dataLayerViewCart } from '@/utils/dataLayer'

import * as Cookies from 'es-cookie'

const CartDrawerContext = createContext()

export function useCartDrawerContext() {
  return useContext(CartDrawerContext)
}

export function CartDrawerProvider({ children }) {
  const [{ cart }] = useCart()

  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')
  const [shopifyCartClient, setShopifyCartCartClient] = useState('')
  const [shopifyCartId, setShopifyCartId] = useState(false)
  const [shopifyCart, setShopifyCart] = useState(false)

  useEffect(() => {
    const getCartDrawerContent = async () => {
      await nacelleClient
        .content({
          handles: ['cart-drawer'],
        })
        .then((response) => {
          setContent(response)
        })
    }
    getCartDrawerContent()
  }, [])

  useEffect(() => {
    if (isOpen) {
      dataLayerViewCart({ cart })
    }
  }, [isOpen])

  useEffect(() => {
    const getCartClient = async () => {
      const cartItems = cart.map((lineItem) => ({
        merchandiseId: lineItem.nacelleEntryId,
        nacelleEntryId: lineItem.nacelleEntryId,
        quantity: lineItem.quantity,
      }))

      const lines = cartItems

      console.log(Cookies.get('shopifyCartId'), lines, cart)

      if (typeof Cookies.get('shopifyCartId') !== 'undefined') {
        cartClient
          .cart({
            cartId: Cookies.get('shopifyCartId'),
          })
          .then((response) => {
            console.log(Cookies.get('shopifyCartId'), response, "1")
            if (response) {
              setShopifyCartCartClient(response.cart)
              setShopifyCartId(Cookies.get('shopifyCartId'))
              setShopifyCart(response)
            }
          })
      } else {
        cartClient
          .cartCreate({
            lines
          })
          .then((response) => {
            console.log(Cookies.get('shopifyCartId'), response, "2")
            if (response) {
              setShopifyCartCartClient(response.cart)
              setShopifyCartId(response.cart.id)
              setShopifyCart(response)
              Cookies.set('shopifyCartId', response.cart.id)
            }
          })
      }
    }

    getCartClient()
  }, [])

  return (
    <CartDrawerContext.Provider
      value={{
        isOpen,
        setIsOpen,
        content,
        shopifyCartClient,
        setShopifyCartCartClient,
        shopifyCartId,
        setShopifyCartId,
        shopifyCart,
        setShopifyCart,
      }}
    >
      {children}
      <CartDrawer content={content} />
    </CartDrawerContext.Provider>
  )
}
