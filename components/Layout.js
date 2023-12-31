import { nacelleClient } from 'services'
import { useCart, useCheckout } from '@nacelle/react-hooks'
import { useEffect } from 'react'

import { CustomerProvider } from '../context/CustomerContext'
import { ModalProvider } from '../context/ModalContext'
import { CartDrawerProvider } from '../context/CartDrawerContext'
import { HeaderProvider } from '../context/HeaderContext'
import { DiaperCalculatorProvider } from '../context/DiaperCalculatorContext'
import Footer from './Layout/Footer'

// This component utilizes `useCart` and `useCheckout` hooks from
// `@nacelle/react-hooks` to clear cart and checkout data if the
// checkout is completed.
// https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks

function Layout({ children, headerSettings, footerSettings }) {
  const [, { clearCart }] = useCart()
  const [{ completed }, { clearCheckoutData }] = useCheckout()

  useEffect(() => {
    if (completed) {
      clearCheckoutData()
      clearCart()
    }
  }, [completed, clearCheckoutData, clearCart])

  return (
    <CustomerProvider>
      <CartDrawerProvider>
        <DiaperCalculatorProvider>
          <ModalProvider>
            <HeaderProvider
              content={headerSettings}
              pageHandle={children.props.handle}
            >
              <main>{children}</main>
              <Footer content={footerSettings} />
            </HeaderProvider>
          </ModalProvider>
        </DiaperCalculatorProvider>
      </CartDrawerProvider>
    </CustomerProvider>
  )
}

export default Layout
