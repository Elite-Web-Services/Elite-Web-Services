const {
  client,
  Product,
  User,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();
    console.log('Started dropping tables');

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS products;
    DROP TABLE IF EXISTS types;
    DROP TABLE IF EXISTS users;
    `);
    console.log('Finished dropping tables');

    // build tables in correct order
    await client.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      "isAdmin" BOOLEAN DEFAULT false,
      username varchar(255) UNIQUE NOT NULL,
      password varchar(255) NOT NULL
    );
    CREATE TABLE types (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL
      );
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      "typeId" INTEGER REFERENCES types(id),
      name VARCHAR(255) NOT NULL,
      description varchar(255),
      price varchar(255),
      "isPublic" BOOLEAN DEFAULT true
      );
    `);

    console.log('Finished creating tables');
  } catch (error) {
    console.log('Problem with building tables');
    throw error;
  }
}

async function createInitialUsers() {
  try {
    console.log('Starting to create users...');
    const usersToCreate = [
      { username: 'KDawg', password: 'dawgiedawgworld' },
      { username: 'daniel', password: 'daniel', isAdmin: true },
      { username: 'DanDigidy', password: 'TheDFrameWork' },
      { username: 'HaytersGonHay8', password: 'Hayyoooo1' },
    ];
    const users = await Promise.all(usersToCreate.map(User.createUser));
    console.log('Finished creating users!');
  } catch (error) {
    console.error('Error creating users!');
    throw error;
  }
}

async function createInitialTypes() {
  try {
    console.log('Starting to create initial types');

    const typesToCreate = [
      { name: 'Website' },
      { name: 'Consultation' },
      { name: 'Services' },
    ];
    const types = await Promise.all(typesToCreate.map(Product.createType));
    console.log('Finished creating initial types');
  } catch (error) {
    console.error('Error creating initial types');
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log('Starting to create initial products');

    const productsToCreate = [
      {
        typeId: 1,
        name: 'Great Value',
        description:
          'I will make you a brand new website for CHEAP using 100% HTML.',
        price: '25',
        isPublic: true,
      },
      {
        typeId: 2,
        name: "I'm a great listener",
        description:
          "I don't know much about computers, personally. But I'll make you feel understood.",
        price: '125',
        isPublic: true,
      },
      {
        typeId: 3,
        name: 'Making websites stand out since 2021',
        description: "Colorblind? I'm here to help.",
        price: '100',
        isPublic: true,
      },
    ];
    const products = await Promise.all(
      productsToCreate.map(Product.createProduct)
    );

    console.log('Finished creating initial products');
  } catch (error) {
    console.error('Error creating initial products');
    throw error;
  }
}

buildTables()
  .then(createInitialUsers)
  .then(createInitialTypes)
  .then(createInitialProducts)
  .catch(console.error)
  .finally(() => client.end());
