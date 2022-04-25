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
  addContacts,
};

async function createUser({ username, password, isAdmin = false }) {
  // CHANGE BCRYPT TO ASYNC SOMEHOW
  const hashedPW = bcrypt.hashSync(password, SALT);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users(username, password, "isAdmin")
      VALUES($1, $2, $3)
      ON CONFLICT (username) DO NOTHING
      RETURNING id, username, "isAdmin";
      `,
      [username, hashedPW, isAdmin]
    );

    const cart = await createCart({ userId: user.id, purchased: false });
    return user;
  } catch (error) {
    throw error;
  }
}

async function addContacts({ id, email }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      UPDATE users 
      SET email = COALESCE($2, users.email)
      WHERE users.id=$1
      RETURNING *;
      `,
      [id, email]
    );
    console.log("*****DB USERS******", user);
    return user;
  } catch (error) {
    console.error("error in addContacts in db");
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
