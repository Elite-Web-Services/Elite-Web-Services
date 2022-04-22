import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { addProductToCart } from "../../axios-services";

const SingleProduct = ({ product }) => {
  const { token, cart, setCart, user } = useAuth();

  return (
    <>
      <Link to="/products">
        <button className="btn btn-sm btn-outline-secondary">Back</button>
      </Link>
      <div className="card mb-4 box-shadow">
        <div className="card-body">
          <img
            className="card-img-top"
            style={{ height: 225 + "px", width: "100%", display: "block" }}
            alt="Thumbnail [100%x225]"
            src={product.imgURL}
          />
          <h6 className="card-text">Category: {product.typeName}</h6>
          <h2 className="card-text">{product.name}</h2>
          <p className="card-text">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              {user.id ? (
                <button
                className="btn btn-secondary"
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
    </>
  );
};

export default SingleProduct;
