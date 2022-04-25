export const findCartProductIdx = (cart, productId) => {
  let idx = cart.products.findIndex(
    (product) => +product.productId === +productId
  );
  console.log('index of product: ', idx);
  return idx;
};
