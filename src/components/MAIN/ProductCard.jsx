import React from 'react';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';
import useProduct from '../hooks/useProduct';

const ProductCard = ({ product }) => {
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
      {!searchObj.type ? (
          <h6 className="card-text">{product.typeName}</h6>
        ) : null}
        <img
          className="card-img-top"
          style={{
            height: 225 + 'px',
            width: '100%',
            height: '100%',
            display: 'block',
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
          <small className="text-muted">${product.price}/hr</small>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              onClick={() => handleAddProduct(product)}
            >
              Add To Cart
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
