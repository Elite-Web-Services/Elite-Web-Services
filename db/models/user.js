// grab our db client connection to use with our adapters
const bcrypt = require("bcrypt");
const SALT = 10;
const client = require("../client");
const { createCart } = require("./cart");

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByUsername,
};

async function createUser({
  username,
  password,
  isAdmin = false,
  email,
  address,
  address2,
  city,
  state,
  zip,
}) {
  // CHANGE BCRYPT TO ASYNC SOMEHOW
  const hashedPW = bcrypt.hashSync(password, SALT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, "isAdmin",email, address, address2, city, state, zip)
      VALUES($1, $2, $3,$4,$5,$6, $7,$8,$9)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, "isAdmin";
      `,
      [username, hashedPW, isAdmin, email, address, address2, city, state, zip]
    );

    const cart = await createCart({ userId: user.id, purchased: false });
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  /* this adapter should fetch a list of users from your db */
  //ADMIN FUNCTION
  try {
    const { rows } = await client.query(
      `
        SELECT id, username, "isAdmin" 
        FROM users
      `
    );
    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * 
      FROM users
      WHERE username=$1;
      `,
      [username]
    );

    return user;
  } catch (error) {
    throw error;
  }
}
