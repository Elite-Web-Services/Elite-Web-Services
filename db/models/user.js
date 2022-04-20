// grab our db client connection to use with our adapters
const client = require('../client');

module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserByUsername,
};

async function createUser({ username, password, isAdmin = false }) {
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
      [username, password, isAdmin]
    );
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
        SELECT * 
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
