const mapProducts = (cart) => {
  let map = {};

  if (cart.length) {
    for (const row of cart) {
      if (!map[row.cartId]) {
        map[row.cartId] = {
          cartId: row.cartId,
          purchased: row.purchased,
          purchaseDate: row.purchaseDate,
          userId: row.userId,
          products: [],
        };
      }
      if (row.productId) {
        map[row.cartId].products.push({
          id: row.productId,
          name: row.productName,
          description: row.productDescription,
          quantity: row.quantity,
          price: row.price,
          isPublic: row.isPublic,
          imgURL: row.imgURL,
        });
      }
    }

    return Object.values(map);
  } else {
    return cart;
  }
};

const today = () => {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  return today;
};

module.exports = {
  mapProducts,
  today,
};
