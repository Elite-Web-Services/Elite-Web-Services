// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  addProductToCart,
  deleteCartItem,
  increaseCartProductQuantity,
};

async function increaseCartProductQuantity({ quantity, cartId, productId }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
  UPDATE cart_products
  SET quantity = $1
  WHERE "cartId"=$2 and "productId"=$3
  RETURNING *;
  `,
      [quantity, cartId, productId]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function addProductToCart({
  cartId,
  productId,
  quantity,
  purchasedCost,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
        INSERT INTO cart_products("cartId", "productId", quantity, "purchasedCost")
        VALUES($1, $2, $3, $4)
        RETURNING *;
        `,
      [cartId, productId, quantity, purchasedCost]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function deleteCartItem(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
    DELETE
    FROM cart_products
    WHERE "productId"=$1;
    `,
      [productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}
