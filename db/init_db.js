const {
  client,
  Product,
  // declare your model imports here
  // for example, User
} = require('./');

async function buildTables() {
  try {
    client.connect();
    console.log("Started dropping tables");

    // drop tables in correct order
    await client.query(`
    DROP TABLE IF EXISTS products;
    `);
    console.log("Finished dropping tables");

    // build tables in correct order
    await client.query(`
    CREATE TABLE products (
      id SERIAL PRIMARY KEY,
      type varchar(255) UNIQUE NOT NULL,
      name VARCHAR(255) NOT NULL,
      description varchar(255),
      price varchar(255),
      public BOOLEAN DEFAULT true
      );
    `);

    console.log("Finished creating tables");
  } catch (error) {
    console.log("Problem with building tables")
    throw error;
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create initial products");

    const service1 = await Product.createProduct({
      type: "website",
      name: "Great Value",
      description: "I will make you a brand new website for CHEAP using 100% HTML.",
      price: "25",
      public: true,
    });

    const service2 = await Product.createProduct({
      type: "consultation",
      name: "I'm a great listener",
      description: "I don't know much about computers, personally. But I'll make you feel understood.",
      price: "125",
      public: true,
    });

    const service3 = await Product.createProduct({
      type: "web design",
      name: "Making websites stand out since 2021",
      description: "Colorblind? I'm here to help.",
      price: "100",
      public: true,
    });
    console.log("Finished creating initial products");
  } catch (error) {
    console.error("Error creating initial products");
    throw error;
  }
}

async function populateInitialData() {
  try {
    // create useful starting data by leveraging your
    // Model.method() adapters to seed your db, for example:
    // const user1 = await User.createUser({ ...user info goes here... })
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(createInitialProducts)
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
