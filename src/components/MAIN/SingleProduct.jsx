import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { addProductToCart } from "../../axios-services";

const SingleProduct = ({ product }) => {
  const { token, cart, setCart, user } = useAuth();

  return (
    <div className="card mb-4 box-shadow">
      <div className="card-body">
        <h6 className="card-text">Category: {product.typeName}</h6>
        <h2 className="card-text">{product.name}</h2>
        <p className="card-text">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            {user.username ? (
              <button
                className="btn btn-sm btn-outline-secondary"
                onClick={async (event) => {
                  event.preventDefault();
                  const newCart = await addProductToCart(
                    token,
                    cart.cartId,
                    product.id,
                    1
                  );
                  setCart(newCart);
                }}
              >
                Add To Cart
              </button>
            ) : null}
          </div>
          <small className="text-muted">${product.price}/hr</small>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
