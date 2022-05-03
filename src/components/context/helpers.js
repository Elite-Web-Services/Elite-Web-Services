import {
  deleteCartProduct,
  updateCartProductQuantity,
} from '../../axios-services';

export const findCartProductIdx = (cart, productId) => {
  if (cart.products && cart.products.length < 1) return -1;
  let idx = cart.products.findIndex((product) => +product.id === +productId);
  return idx;
};

export const incrementQuantity = async (
  cart,
  productId,
  addQuantity,
  user,
  token
) => {
  let cartProductIdx = findCartProductIdx(cart, productId);
  let newQuantity = addQuantity + cart.products[cartProductIdx].quantity;
  if (user.username) {
    let newCart = await updateCartProductQuantity(
      token,
      newQuantity,
      cart.cartId,
      productId
    );
    return newCart;
  } else {
    cart.products[cartProductIdx].quantity = newQuantity;
    const newCart = {
      cartId: cart.cartId,
      purchased: cart.purchased,
      userId: cart.userId,
      products: cart.products,
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
  }
};

export const decrementQuantity = async (
  cart,
  productId,
  deleteQuantity,
  user,
  token
) => {
  let cartProductIdx = findCartProductIdx(cart, productId);
  let newQuantity = cart.products[cartProductIdx].quantity - deleteQuantity;
  let newCart;
  // remove product if they delete too many quantity
  if (newQuantity <= 0) {
    if (user.username) {
      newCart = await deleteCartProduct(productId, token);
      return newCart;
    } else {
      newCart = {
        cartId: cart.cartId,
        purchased: cart.purchased,
        userId: cart.userId,
        products: cart.products.filter((item) => +item.id !== +productId),
      };
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    }
  }
  if (user.username) {
    let newCart = await updateCartProductQuantity(
      token,
      newQuantity,
      cart.cartId,
      productId
    );
    return newCart;
  } else {
    cart.products[cartProductIdx].quantity = newQuantity;
    const newCart = {
      cartId: cart.cartId,
      purchased: cart.purchased,
      userId: cart.userId,
      products: cart.products,
    };
    localStorage.setItem('cart', JSON.stringify(newCart));
    return newCart;
  }
};
