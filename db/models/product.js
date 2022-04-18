// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createProduct,
  getAllProducts,
};

async function createProduct({ type, name, description, price, public }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          INSERT INTO products(type, name, description, price, public) 
          VALUES($1, $2, $3, $4, $5) 
          RETURNING *;
          `,
      [type, name, description, price, public]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT * 
        FROM products
        `);

    return rows;
  } catch (error) {
    throw error;
  }
  /* this adapter should fetch a list of products from your db */
}
