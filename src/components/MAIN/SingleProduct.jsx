import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { addProductToCart } from "../../axios-services";
import useCart from "../hooks/useCart";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const SingleProduct = ({ product }) => {
  const { token, user } = useAuth();
  const { cart, setCart } = useCart();

  const successToast = (e) => {
    toast.success("Product added to Cart ", {
      theme: "colored",
      autoClose: 1000,
    });
  };
  return (
    <>
      <Link to="/products">
        <button className="btn btn-sm btn-outline-secondary back-button">
          Back
        </button>
      </Link>
      <div className="card mb-4 box-shadow">
        <div className="card-body">
          <img
            className="card-img-top"
            style={{
              height: 225 + "px",
              width: "100%",
              height: "100%",
              display: "block",
            }}
            alt="Thumbnail [100%x225]"
            src={product.imgURL}
          />
          <h6 className="card-text">Category: {product.typeName}</h6>
          <h2 className="card-text">{product.name}</h2>
          <p className="card-text">{product.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <div className="btn-group">
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={async (event) => {
                  event.preventDefault();
                  const newCart = await addProductToCart(
                    token,
                    cart.cartId,
                    product.id,
                    1
                  );
                  setCart(newCart);
                  successToast();
                }}
              >
                Add To Cart
              </button>
            </div>
            <small className="text-muted">${product.price}/hr</small>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
