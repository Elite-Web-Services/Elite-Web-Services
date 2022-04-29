import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { addProductToCart } from "../../axios-services";
import useCart from "../hooks/useCart";

const SingleProduct = ({ product }) => {
  const { token, user } = useAuth();
  const { cart, setCart } = useCart();
  return (
    <>
      <Link to="/products">
        <button className="btn btn-sm btn-outline-secondary back-button">
          Back
        </button>
      </Link>
      <div className="card mb-4 box-shadow" style={{ margin: "2rem 3rem 0 3rem" }}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="card-text">{product.typeName}</h6>
            <h6 className="card-text">${product.price}/hr</h6>
          </div>
          <div className="row">
            <img
              className="col-md-4"
              style={{
                height: 225 + "px",
                width: "50%",
                height: "50%",
                display: "block",
              }}
              alt="Thumbnail [100%x225]"
              src={product.imgURL}
            />
            <div className="col-md-4" style={{flexGrow: "1"}}>
              <h2 className="card-text">{product.name}</h2>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
          <p className="card-text" style={{ margin: "2rem" }}>
            {product.fullDescription}
          </p>
          {/* <div className="d-flex justify-content-between align-items-center"> */}
            <div className="btn-group" style={{display: "flex"}}>
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
                }}
              >
                Add To Cart
              </button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
