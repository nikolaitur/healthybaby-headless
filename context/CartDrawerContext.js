import { createContext, useContext, useState, useEffect } from 'react'
import { nacelleClient } from 'services'
import CartDrawer from '../components/Layout/CartDrawer'
import Router, { useRouter } from 'next/router'

const CartDrawerContext = createContext()

export function useCartDrawerContext() {
  return useContext(CartDrawerContext)
}

export function CartDrawerProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState('')

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

    return (
        <CartDrawerContext.Provider value={{ isOpen, setIsOpen, content }}>
            {children}
            <CartDrawer />
        </CartDrawerContext.Provider>
    )
}