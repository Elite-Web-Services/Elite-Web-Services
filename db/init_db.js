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
      "typeId" INTEGER REFERENCES types(id),
      name VARCHAR(255) NOT NULL,
      description varchar(255) NOT NULL,
      "fullDescription" varchar(1000),
      price varchar(255) NOT NULL,
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
  const loremIpsum = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut atque quo perferendis, mollitia fugit recusandae optio necessitatibus minima iusto quae corporis cumque sequi itaque vitae rem? Dolorum, quis molestiae! Reiciendis."

  try {
    console.log('Starting to create initial products');


    const productsToCreate = [
        {
            typeId: 3,
            name: 'Front-End Management',
            description: "Struggling to keep up with modern technologies? You're in the right place.",
            fullDescription: loremIpsum + loremIpsum,
            price: 199,
            isPublic: true,
            imgURL:
              'https://instabug.com/blog/wp-content/uploads/2017/09/Featured.jpg',
          },
          {
            typeId: 2,
            name: 'Analysis of your business',
            description: "Not all things in tech revolve around coding. Seek business and financial consultation from trained professionals here.",
            fullDescription: loremIpsum + loremIpsum,
            price: 599,
            isPublic: true,
            imgURL:
              'https://res.cloudinary.com/elite-web-services/image/upload/v1650999321/consulting1_nz7vep.jpg',
          },
          {
            typeId: 1,
            name: 'Add to your Wesbsite',
            description: "If you already have a site of your own up and running but need help adding more functionality for your clients, this is the place for you.",
            fullDescription: loremIpsum,
            price: 299,
            isPublic: true,
            imgURL:
              'https://res.cloudinary.com/elite-web-services/image/upload/v1650999019/websiteTemplate_3_x7mpsh.png',
          },
          {
            typeId: 3,
            name: 'Database Management',
            description: "Whether old or new, every good database needs health check ups.",
            fullDescription: loremIpsum + loremIpsum,
            price: 599,
            isPublic: true,
            imgURL:
              'https://help.spreadsheetweb.com/wp-content/uploads/2019/04/Data-management-and-analysis-scaled.jpg',
          },
          {
            typeId: 2,
            name: 'Website Planning',
            description: "Looking to build a site but don't know where to start? Talk with one of our experts.",
            fullDescription: loremIpsum,
            price: 149,
            isPublic: true,
            imgURL:
              'https://res.cloudinary.com/elite-web-services/image/upload/v1650999341/consulting2_tyaxed.jpg',
          },
          {
            typeId: 1,
            name: 'Forum Site',
            description: "Does your company staff work from home? Or do you deal with sensitive information? Let our experts create a messaging site for you.",
            fullDescription: loremIpsum,
            price: 499,
            isPublic: true,
            imgURL:
              'https://res.cloudinary.com/elite-web-services/image/upload/v1650999019/websiteTemplate_2_uxkaab.png',
          },
          {
            typeId: 3,
            name: 'App Development',
            description: "Looking to expand your outreach with a mobile phone app? Look no further.",
            fullDescription: loremIpsum + loremIpsum,
            price: 799,
            isPublic: true,
            imgURL:
              'https://www.avi.com/wp-content/uploads/2018/07/dreamstime_l_66721609.jpg',
          },
          {
            typeId: 2,
            name: 'A Crash Course in Advertising',
            description: "Learn how to navigate the lucrative world of advertising within the web",
            fullDescription: loremIpsum,
            price: 399,
            isPublic: true,
            imgURL:
              'https://sumtotalmarketing.com/wp-content/uploads/2020/10/vectorstock_1669719-1024x731.jpg',
          },
          {
            typeId: 1,
            name: 'E-Commerce Site',
            description: "We will create an online store to help you sell your line of products!",
            fullDescription: loremIpsum,
            price: 999,
            isPublic: true,
            imgURL:
              'https://res.cloudinary.com/elite-web-services/image/upload/v1650999019/websiteTemplate_1_k4jp4i.png',
          },
          {
            typeId: 3,
            name: 'Visual Design',
            description: "Make your website stand out and give your users customizable viewing options like dark mode!",
            fullDescription: loremIpsum,
            price: 199,
            isPublic: true,
            imgURL:
              'https://www.creativefaze.com/sites/default/files/webdesign.jpg',
          },
          {
            typeId: 2,
            name: "Security Consulting",
            description:
              "Learn about the latest technologies in the industry to keep your company's and clients' information safe.",
            fullDescription: loremIpsum,
            price: 224,
            isPublic: true,
            imgURL:
              'https://securityintelligence.com/wp-content/uploads/2015/03/Data-Security.jpg',
          },
          {
            typeId: 1,
            name: 'Build Your First Site',
            description: "Let one of our professionals build a basic site that represents you and your company.",
            fullDescription: loremIpsum + loremIpsum,
            price: 599,
            isPublic: true,
            imgURL:
              'https://res.cloudinary.com/elite-web-services/image/upload/v1650999020/websiteTemplate_4_tcl71q.png',
          },
    ]
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
