// grab our db client connection to use with our adapters
const client = require('../client');
const { mapProducts, today } = require('./utils');

module.exports = {
  createCart,
  getCart,
  purchaseCart,
};

async function createCart({ userId, purchased = false }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO carts("userId", purchased)
        VALUES($1, $2)
        RETURNING carts.id as "cartId", *;
        `,
      [userId, purchased]
    );
    return mapProducts([cart]);
  } catch (error) {
    throw error;
  }
}

async function getCart(userId) {
  try {
    const { rows } = await client.query(
      `
    SELECT 
	    purchased, "purchaseDate", "userId", carts.id as "cartId", "productId", quantity, "imgURL",
        "typeId", products.name as "productName", products.description as "productDescription", price, "isPublic"
    FROM carts
	    LEFT JOIN cart_products ON cart_products."cartId" = carts.id
        LEFT JOIN products ON products.id = cart_products."productId"
    WHERE "userId"=$1 and purchased=false;
    `,
      [userId]
    );

    return mapProducts(rows);
  } catch (error) {
    throw error;
  }
}

async function purchaseCart(cartId) {
  const date = today();
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
    UPDATE carts SET
      purchased=true, "purchaseDate"=$2
    WHERE carts.id=$1
    RETURNING *;
    `,
      [cartId, date]
    );
    return cart;
  } catch (error) {
    throw error;
  }
}
