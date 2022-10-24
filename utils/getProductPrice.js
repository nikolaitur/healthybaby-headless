export const getProductPrice = (product) => {
  if (!product) return ''
  if (product.variants.length > 1) {
    let lowestPrice = product.variants.reduce(function (prev, curr) {
      return prev.price < curr.price ? prev : curr
    })
    return lowestPrice.price
  } else {
    return product.variants[0].price
  }
}