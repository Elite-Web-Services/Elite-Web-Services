const productsRouter = require('express').Router();
const { Product } = require("../db/models");

productsRouter.use("/", (req, res, next) => {
  console.log('A request is being made to /products');

  next();
});

productsRouter.get("/", async (req, res, next) => {
  try {
    const publicProducts = await Product.getPublicProducts();

    res.send(publicProducts);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/types", async (req, res, next) => {
  try {
    const types = await Product.getAllTypes();
    
    res.send(types);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;