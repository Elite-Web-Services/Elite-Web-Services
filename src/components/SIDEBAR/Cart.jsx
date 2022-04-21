import React from "react";
import { deleteCartProduct } from "../../axios-services";
import useAuth from "../hooks/useAuth";

const Cart = () => {
  const { cart, token, setCart } = useAuth();

  return (
    <div>
      <h2>{cart.cartId}</h2>
      {cart.products ? (
        <div id="productList">
          {cart.products.map((product, index) => {
            return (
              <div key={"cart" + index}>
                <h3>{product.productName}</h3>
                <h5>{product.productDescription}</h5>
                <button
                  onClick={async () => {
                    const newCart = await deleteCartProduct(
                      product.productId,
                      token
                    );
                    console.log("new cart", newCart);
                    setCart(newCart);
                  }}
                >
                  Remove Product
                </button>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
