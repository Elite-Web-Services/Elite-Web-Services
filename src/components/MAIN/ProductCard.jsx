import React from "react";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useProduct from "../hooks/useProduct";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const ProductCard = ({ product }) => {
  const { addProduct, setCart } = useCart();
  const { searchObj } = useProduct();

  const successToast = (e) => {
    toast.success("Product added to Cart ", {
      theme: "colored",
      autoClose: 1000,
    });
  };

  const handleAddProduct = async (product) => {
    const newCart = await addProduct(product);
    console.log("Added a product, newcart: ", newCart);
    setCart(newCart);
    successToast();
  };

  return (
    <div className="card mb-4 box-shadow">
      <div className="card-body">
          <h6 className="card-text">{product.typeName}</h6>
        <img
          className="card-img-top"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
          alt="Thumbnail [100%x225]"
          src={product.imgURL}
        />
        <h4 className="card-text">{product.name}</h4>
        <p className="card-text">{product.description}</p>
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link to={`/viewproduct=${product.id}`}>
              <button className="btn btn-sm btn-outline-secondary">View</button>
            </Link>
          </div>
          <small className="text-muted">${product.price}</small>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            onClick={() => handleAddProduct(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
