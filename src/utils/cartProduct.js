export const cartProductCount = (userCart) => {
  let count = 0
  count = userCart.reduce((acc, el) => acc + el.product_count, count)
  return count
}