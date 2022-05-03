
import React from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import { toast } from "react-toastify";

const SingleProduct = ({ product }) => {
  const { setCart, addProduct, } = useCart();

  const successToast = (e) => {
    toast.success('Product added to Cart ', {
      theme: 'colored',
      autoClose: 1000,
    });
  };

  const handleAddProduct = async () => {
    const newCart = await addProduct(product);
    setCart(newCart);
    successToast();
  };

  return (
    <>
      <Link to="/products">
        <button className="btn btn-sm btn-outline-secondary back-button">
          Back
        </button>
      </Link>
      <div
        className="card mb-4 box-shadow"
        style={{ margin: '2rem 3rem 0 3rem' }}
      >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="card-text">{product.typeName}</h6>
            <h6 className="card-text">${product.price}</h6>
          </div>
          <div className="my-row">
            <img
              className="my-col-md-4"
              style={{
                width: '50%',
                height: '50%',
                display: 'block',
              }}
              alt="Thumbnail [100%x225]"
              src={product.imgURL}
            />
            <div className="col-md-4" style={{ flexGrow: '1' }}>
              <h2 className="card-text">{product.name}</h2>
              <p className="card-text">{product.description}</p>
            </div>
          </div>
          <p className="card-text" style={{ margin: '2rem' }}>
            {product.fullDescription}
          </p>
            <div className="btn-group" style={{display: "flex"}}>
              <button
                className="btn btn-outline-success my-2 my-sm-0"
                onClick={async (event) => {
                  event.preventDefault();
                  handleAddProduct()
                }}
              >
                Add To Cart
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
