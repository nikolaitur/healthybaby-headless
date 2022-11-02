import cartClient from 'services/nacelleClientCart'
import * as Cookies from 'es-cookie'

export const getCartData = async () => {
  const { cart } = await cartClient.cart({
    cartId: Cookies.get('shopifyCartId'),
  })
  return cart
}
