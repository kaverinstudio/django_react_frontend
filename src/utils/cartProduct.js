export const cartProductCount = (userCart) => {
  let count = 0
  count = userCart.reduce((acc, el) => acc + el.product_count, count)
  return count
}

export const getPrices = (initialProducts, minPrice, maxPrice) => {
    let minPriceProduct = initialProducts.reduce((acc, curr) => parseInt(acc.price) < parseInt(curr.price) ? acc : curr)
    let maxPriceProduct = initialProducts.reduce((acc, curr) => parseInt(acc.price) > parseInt(curr.price) ? acc : curr)
    minPrice = Number(minPriceProduct.price)
    maxPrice = Number(maxPriceProduct.price)
    return [minPrice, maxPrice]
}