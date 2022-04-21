const mapProducts = (cart) => {
  let map = {};
  console.log("CARTTTT", cart);
  if (cart.length) {
    for (const row of cart) {
      if (!map[row.cartId]) {
        map[row.cartId] = {
          cartId: row.cartId,
          purchased: row.purchased,
          userId: row.userId,
          products: [],
        };
      }
      if (row.productId) {
        map[row.cartId].products.push({
          productId: row.productId,
          productName: row.productName,
          productDescription: row.productDescription,
          quantity: row.quantity,
          price: row.price,
          isPublic: row.isPublic,
        });
      }
    }

    return Object.values(map);
  } else {
    return cart;
  }
};

module.exports = {
  mapProducts,
};
