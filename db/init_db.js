const { application_name } = require('pg/lib/defaults');
const {
  client,
  Product,
  User,
  CartProduct,
  Cart,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();
    console.log('Started dropping tables');

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS cart_products;
    DROP TABLE IF EXISTS carts;
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
      password varchar(255) NOT NULL,
      "firstName" varchar(255),
      "lastName" varchar(255),
      email varchar(255) UNIQUE,
      address varchar(255),
      address2 varchar(255),
      city varchar(255),
      state varchar(255),
      zip integer,
      country varchar(255)
    );
    CREATE TABLE types (
      id SERIAL PRIMARY KEY,
      name varchar(255) UNIQUE NOT NULL
      );
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      "typeId" INTEGER REFERENCES types(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      description varchar(255),
      "fullDescription" varchar(600),
      price varchar(255),
      "isPublic" BOOLEAN DEFAULT true,
      "imgURL" text
      );
      CREATE TABLE carts (
        id SERIAL PRIMARY KEY,
        "userId" INTEGER REFERENCES users(id) ON DELETE CASCADE,
        purchased BOOLEAN DEFAULT false,
        "purchaseDate" date
      );
      CREATE TABLE cart_products (
        id SERIAL PRIMARY KEY,
        "cartId" INTEGER REFERENCES carts(id) ON DELETE CASCADE,
        "productId" INTEGER REFERENCES products(id) ON DELETE CASCADE,
        quantity INTEGER NOT NULL,
        "purchasedCost" INTEGER
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
      { username: 'Guest', password: 'guestUserPassword' },
      {
        username: 'KDawg',
        password: 'dawgiedawgworld',
        firstName: 'Kevin',
        lastName: 'Hongkham',
        email: 'Kevin@Kevin.com',
        address: '12346 Kevin on Kevin St.',
        address2: "apt. Dan's",
        city: 'Kevinsville',
        state: 'Georgia',
        zip: '123456',
        country: 'USA',
      },
      {
        username: 'daniel',
        password: 'daniel',
        isAdmin: true,
        firstName: 'Daniel',
        lastName: 'Forkner',
        email: 'daniel@daniel.com',
        address: '12346 Daniel on Daniel St.',
        address2: "apt. Dan's",
        city: 'Danielsville',
        state: 'Georgia',
        zip: '123456',
        country: 'USA',
      },
      { username: 'DanDigidy', password: 'TheDFrameWork' },
      { username: 'HaytersGonHay8', password: 'Hayyoooo1' },
      { username: 'kevin', password: 'kevinkevin' },
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

    const typesToCreate = ['Website', 'Consultation', 'Services'];
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

          "I will make you a brand new website for CHEAP using 100% HTML.",
        fullDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: "25",

        isPublic: true,
        imgURL:
          'https://res.cloudinary.com/elite-web-services/image/upload/v1650999020/websiteTemplate_4_tcl71q.png',
      },
      {
        typeId: 1,
        name: "I'm a great listener",
        description:
          "I don't know much about computers, personally. But I'll make you feel understood.",
        fullDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: "125",

        isPublic: true,
        imgURL:
          'https://res.cloudinary.com/elite-web-services/image/upload/v1650999019/websiteTemplate_1_k4jp4i.png',
      },
      {
        typeId: 1,
        name: 'Making websites stand out since 2021',
        description: "Colorblind? I'm here to help.",

        fullDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: "100",

        isPublic: true,
        imgURL:
          'https://res.cloudinary.com/elite-web-services/image/upload/v1650999019/websiteTemplate_3_x7mpsh.png',
      },
      {
        typeId: 1,
        name: 'Making websites stand out since 2021',
        description: "Colorblind? I'm here to help.",

        fullDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: "100",

        isPublic: true,
        imgURL:
          'https://res.cloudinary.com/elite-web-services/image/upload/v1650999019/websiteTemplate_tuq40k.png',
      },
      {
        typeId: 1,
        name: 'Making websites stand out since 2021',
        description: "Colorblind? I'm here to help.",

        fullDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: "100",

        isPublic: true,
        imgURL:
          'https://res.cloudinary.com/elite-web-services/image/upload/v1650999019/websiteTemplate_2_uxkaab.png',
      },
      {
        typeId: 2,
        name: 'Making websites stand out since 2021',
        description: "Colorblind? I'm here to help.",

        fullDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: "100",

        isPublic: true,
        imgURL:
          'https://res.cloudinary.com/elite-web-services/image/upload/v1650999341/consulting2_tyaxed.jpg',
      },
      {
        typeId: 2,
        name: 'Making websites stand out since 2021',
        description: "Colorblind? I'm here to help.",

        fullDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: "100",

        isPublic: true,
        imgURL:
          'https://res.cloudinary.com/elite-web-services/image/upload/v1650999321/consulting1_nz7vep.jpg',
      },
      {
        typeId: 3,
        name: 'Analysis of your business',
        description: "Colorblind? I'm here to help.",

        fullDescription:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        price: "100",

        isPublic: true,
        imgURL:
          'https://res.cloudinary.com/elite-web-services/image/upload/v1650999415/service_po98bn.jpg',
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

async function addInitialProductsToCarts() {
  try {
    console.log('Starting to add initial products to carts');

    const productsToAdd = [
      { cartId: 2, productId: 1, quantity: 1 },
      { cartId: 2, productId: 2, quantity: 1 },
      { cartId: 2, productId: 3, quantity: 1 },
      { cartId: 5, productId: 1, quantity: 1 },
    ];

    const cartProducts = await Promise.all(
      productsToAdd.map(CartProduct.addProductToCart)
    );

    console.log('Finished adding products to carts');
  } catch (error) {
    throw error;
  }
}

async function retrieveCart() {
  try {
    console.log('Starting to retrieve cart for userId 2');
    const cart = await Cart.getCart(2);
    console.log('Got the cart: ', cart);
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(createInitialUsers)
  .then(createInitialTypes)
  .then(createInitialProducts)
  .then(addInitialProductsToCarts)
  .then(retrieveCart)
  .catch(console.error)
  .finally(() => client.end());
