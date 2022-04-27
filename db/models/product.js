// grab our db client connection to use with our adapters
const client = require("../client");
const { mapProducts } = require("./utils");

module.exports = {
  // add your database adapter fns here
  createProduct,
  getAllProducts,
  getPublicProducts,
  updateProduct,
  deleteProduct,
  createType,
  getAllTypes,
  updateType,
  deleteType,
  getOrderHistory,
};

async function createProduct({
  typeId,
  name,
  description,
  price,
  isPublic,
  imgURL,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
          INSERT INTO products("typeId", name, description, price, "isPublic", "imgURL") 
          VALUES($1, $2, $3, $4, $5, $6) 
          RETURNING *;
          `,
      [typeId, name, description, price, isPublic, imgURL]
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function getAllProducts() {
  try {
    const { rows } = await client.query(`
        SELECT
        products.id AS id,
        products.name AS name,
        types.id AS "typeId",
        types.name AS "typeName",
        products.description AS description,
        products.price AS price,
        products."isPublic" AS "isPublic",
        products."imgURL" AS "imgURL"
        FROM products
        LEFT JOIN types ON products."typeId" = types.id
        ORDER BY products.id desc
        `);

    return rows;
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
        products."isPublic" AS "isPublic",
        products."imgURL" AS "imgURL"
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
    return product;
  } catch (error) {
    throw error;
  }
}

async function createType(name) {
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

async function updateType({id, name}) {
  try {
    const {
      rows: [type],
    } = await client.query(
      `
          UPDATE types
          SET name=$2
          WHERE id=$1
          RETURNING *;
        `,[id, name]
    );

    return type;
  } catch (error) {
    throw error;
  }
}

async function deleteType({ typeId }) {
  try {
    const {
      rows: [type],
    } = await client.query(
      `
    DELETE
    FROM types
    WHERE id=$1;
    `,
      [typeId]
    );
    return type;
  } catch (error) {
    throw error;
  }
}

async function getOrderHistory(userId) {
  try {
    const { rows } = await client.query(
      `
    SELECT 
	    purchased, 
      "userId", 
      carts.id as "cartId", 
      "productId", 
      quantity, 
      "typeId", 
      products.name as "productName", 
      products.description as "productDescription", 
      price, 
      "isPublic"
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
