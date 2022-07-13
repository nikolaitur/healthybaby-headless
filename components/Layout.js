import { nacelleClient } from 'services'
import { useCart, useCheckout } from '@nacelle/react-hooks'
import { useEffect } from 'react'

import Header from './Layout/Header'

// This component utilizes `useCart` and `useCheckout` hooks from
// `@nacelle/react-hooks` to clear cart and checkout data if the
// checkout is completed.
// https://github.com/getnacelle/nacelle-react/tree/main/packages/react-hooks

function Layout({ children, headerSettings }) {
  const [, { clearCart }] = useCart()
  const [{ completed }, { clearCheckoutData }] = useCheckout()

  console.log(headerSettings)

  useEffect(() => {
    if (completed) {
      clearCheckoutData()
      clearCart()
    }
  }, [completed, clearCheckoutData, clearCart])

  return (
    <>
      <Header content={headerSettings}/>
      <main>{children}</main>
    </>
  )
        
}

export default Layout

// export async function getStaticProps({ previewData }) {
//   console.log('loggged')
//   const headerData = await nacelleClient.content({
//     handles: ['announcement-bar']
//   })

//   console.log(headerData, 'pages')

//   return {
//     props: { headerData }
//   }
// }
