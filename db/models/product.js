// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createProduct,
  getPublicProducts,
  updateProduct,
  deleteProduct,
  createType,
  getAllTypes,
};

async function createProduct({ typeId, name, description, price, isPublic }) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          INSERT INTO products("typeId", name, description, price, "isPublic") 
          VALUES($1, $2, $3, $4, $5) 
          RETURNING *;
          `,
      [typeId, name, description, price, isPublic]
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
        types.id AS "typeId",
        types.name AS "typeName",
        products.description AS description,
        products.price AS price,
        products."isPublic" AS "isPublic"
        FROM products
        LEFT JOIN types ON products."typeId" = types.id
        WHERE "isPublic" is true
        ORDER BY products.id desc
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}

async function updateProduct(fields = {}) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(", ");

  // return early if this is called without fields
  if (setString.length === 0) {
    return;
  }

  try {
    const {
      rows: [product],
    } = await client.query(
      `
          UPDATE products
          SET ${setString}
          WHERE id=${fields.id}
          RETURNING *;
        `,
      Object.values(fields)
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function deleteProduct({ productId }) {
  try {  
    const {
      rows: [product],
    } = await client.query(
      `
    DELETE
    FROM products
    WHERE id=$1;
    `,
      [productId]
    );
    return product
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
        ORDER BY types.id
        `);

    return rows;
  } catch (error) {
    throw error;
  }
}
