const productsRouter = require('express').Router();
const { Product } = require('../db/models');
const { Cart } = require('../db/models');
const { requireAdmin } = require('./utils');

productsRouter.use('/', (req, res, next) => {
  console.log('A request is being made to /products');

  next();
});

productsRouter.get('/all', requireAdmin, async (req, res, next) => {
  try {
    const allProducts = await Product.getAllProducts();

    res.send(allProducts);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get('/', async (req, res, next) => {
  try {
    const publicProducts = await Product.getPublicProducts();

    res.send(publicProducts);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.post('/', requireAdmin, async (req, res, next) => {
  // const creatorId = req.user.id;
  const { typeId, name, description, price, isPublic } = req.body;

  const productsData = {
    // creatorId,
    typeId,
    name,
    description,
    price,
    isPublic,
  };

  try {
    const product = await Product.createProduct(productsData);

    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.patch('/:productId', requireAdmin, async (req, res, next) => {
  const { productId } = req.params;
  // const creatorId = req.user.id;
  const { typeId, name, description, price, isPublic } = req.body;

  const updateFields = {
    // creatorId,
    id: productId,
    typeId,
    name,
    description,
    price,
    isPublic,
  };

  try {
    // const originalProduct = await Product.getProductById(productId);

    // if (originalProduct.creatorId === req.user.id) {
    const updatedProduct = await Product.updateProduct(updateFields);

    res.send(updatedProduct);
    // } else {
    //   next({
    //     name: "UnauthorizedUserError",
    //     message: "You cannot update a product that is not yours",
    //   });
    // }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.delete('/:productId', requireAdmin, async (req, res, next) => {
  try {
    const deletedProduct = await Product.deleteProduct(req.params);

    res.send(deletedProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});


productsRouter.post("/types", requireAdmin, async (req, res, next) => {
  const { name } = req.body;

  try {
    const type = await Product.createType(name);

    res.send(type);
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


productsRouter.patch("/types/:typeId", requireAdmin, async (req, res, next) => {
  const { typeId } = req.params;
  const { name } = req.body;

  const updateFields = {
    id: typeId,
    name,
  };

  try {
    const updatedType = await Product.updateType(updateFields);

    res.send(updatedType);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.delete("/types/:typeId", requireAdmin, async (req, res, next) => {
  try {
    const deletedType = await Product.deleteType(req.params);

    res.send(deletedType);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get("/orderHistory", async (req, res, next) => {
  console.log("inside Products API orders", req.user.id);
  try {
    const history = await Product.getOrderHistory(req.user.id);
    res.send(history);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

productsRouter.get('/orderHistory/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    if (req.user.isAdmin) {
      const userHistory = await Product.getOrderHistory(userId);
      res.send(userHistory);
    } else {
      res.status(409);
      next({ name: 'unauthorized', message: 'this requires admin access' });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productsRouter;
