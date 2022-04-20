// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createProduct,
  getPublicProducts,
  createType,
  getAllTypes,
};

async function createProduct({ typeId, name, description, price, public }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          INSERT INTO products("typeId", name, description, price, public) 
          VALUES($1, $2, $3, $4, $5) 
          RETURNING *;
          `,
      [typeId, name, description, price, public]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getPublicProducts() {
  try {
    const { rows } = await client.query(`
        SELECT
        products.id AS id,
        products.name AS name,
        types.name AS type,
        products.description AS description,
        products.price AS price,
        products.public AS public
        FROM products
        LEFT JOIN types ON products."typeId" = types.id
        WHERE public is true
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function createType({ name }) {
  try {
    const {
      rows: [type],
    } = await client.query(
      `
          INSERT INTO types(name) 
          VALUES($1) 
          RETURNING *;
          `,
      [name]
    );

    return type;
  } catch (error) {
    throw error;
  }
}

async function getAllTypes() {
  try {
    const { rows } = await client.query(`
        SELECT * 
        FROM types
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}