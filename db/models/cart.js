// grab our db client connection to use with our adapters
const client = require("../client");
const { mapProducts } = require("./utils");

module.exports = {
  createCart,
  getCart,
};

async function createCart({ userId, purchased = false }) {
  try {
    const {
      rows: [cart],
    } = await client.query(
      `
        INSERT INTO carts("userId", purchased)
        VALUES($1, $2)
        RETURNING *;
        `,
      [userId, purchased]
    );

    return cart;
  } catch (error) {
    throw error;
  }
}

async function getCart(userId) {
  try {
    const { rows } = await client.query(
      `
    SELECT 
	    purchased, "userId", carts.id as "cartId", "productId", quantity, 
        "typeId", products.name as "productName", products.description as "productDescription", price, "isPublic"
    FROM carts
	    LEFT JOIN cart_products ON cart_products."cartId" = carts.id
        LEFT JOIN products ON products.id = cart_products."productId"
    WHERE "userId"=$1;
    `,
      [userId]
    );

    return mapProducts(rows);
  } catch (error) {
    throw error;
  }
}

async function getOrderhistory(userId) {
  try {
    const { rows } = await client.query(
      `
    SELECT 
	    purchased, "userId", carts.id as "cartId", "productId", quantity, 
        "typeId", products.name as "productName", products.description as "productDescription", price, "isPublic"
    FROM carts
	    LEFT JOIN cart_products ON cart_products."cartId" = carts.id
        LEFT JOIN products ON products.id = cart_products."productId"
    WHERE "userId"=$1 AND purchased=$2;
    `,
      [userId, true]
    );

    return mapProducts(rows);
  } catch (error) {
    throw error;
  }
}
