import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useProduct from "../hooks/useProduct";


const ProductCard = ({ product }) => {
  const { user } = useAuth();
  const { addProduct, setCart } = useCart();
  const { searchObj } = useProduct();


  const handleAddProduct = async (product) => {
    const newCart = await addProduct(product);
    console.log('Added a product, newcart: ', newCart);
    setCart(newCart);
  };

  return (
    <div className="card mb-4 box-shadow">
      <div className="card-body">
        <img
          className="card-img-top"
          style={{
            height: 225 + 'px',
            width: '100%',
            display: 'block',
          }}
          alt="Thumbnail [100%x225]"
          src={product.imgURL}
        />
        {!searchObj.type ? (
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
              onClick={() => handleAddProduct(product)}
            >
              Add To Cart
            </button>
          </div>
          <small className="text-muted">${product.price}/hr</small>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
