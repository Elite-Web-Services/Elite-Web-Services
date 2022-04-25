import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
// import { addProductToCart } from "../../axios-services";
import useCart from '../hooks/useCart';

const ProductCard = ({ product, productType }) => {
    const { cart, setCart, addProductToCart } = useCart();
    const { token, user } = useAuth();

    const handleAddToCart = async () => {
    const newCart = await addProductToCart(product);
      setCart(newCart);
    }

  return (
    <div className="card mb-4 box-shadow">
      <div className="card-body">
        {user.isAdmin ? (
          <h6 className="card-text">
            {product.isPublic ? "Public" : "Private"}
          </h6>
        ) : null}
        <img
          className="card-img-top"
          style={{
            height: 225 + "px",
            width: "100%",
            display: "block",
          }}
          alt="Thumbnail [100%x225]"
          src={product.imgURL}
        />
        {!productType ? (
          <h6 className="card-text">Category: {product.typeName}</h6>
        ) : null}
        <h2 className="card-text">{product.name}</h2>
        <p className="card-text">{product.description}</p>
        {/* remove later */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="btn-group">
            <Link to={`/viewproduct=${product.id}`}>
              <button className="btn btn-sm btn-outline-secondary">View</button>
            </Link>
              <button
                className="btn btn-secondary"
                onClick={async (event) => {
                  event.preventDefault();
                  handleAddToCart()
                }}
              >
                Add To Cart
              </button>
            {user.isAdmin ? (
              <Link to={`/editproduct=${product.id}`}>
                <button className="btn btn-sm btn-outline-secondary">
                  Edit
                </button>
              </Link>
            ) : null}
          </div>
          <small className="text-muted">${product.price}/hr</small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
