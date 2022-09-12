import { createContext, useContext, useState, useEffect } from 'react'
import CartDrawer from '../components/Layout/CartDrawer'
import Router, { useRouter } from 'next/router'

const CartDrawerContext = createContext()

export function useCartDrawerContext() {
  return useContext(CartDrawerContext)
}

export function CartDrawerProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [content, setContent] = useState('')

  return (
    <CartDrawerContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
      <CartDrawer />
    </CartDrawerContext.Provider>
  )
}