import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { decrementQuantity, incrementQuantity } from '../context/helpers';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import EmptyCart from './EmptyCart';
import { toast, Zoom, Bounce } from 'react-toastify';

const Cart = () => {
  const { cart, addProduct, removeProduct, setCart } = useCart();
  const { user, token } = useAuth();

  const removeToast = () => {
    toast.error('Product removed from cart.', { theme: 'colored' });
  };

  // this fixes weird formatting when only one item in cart
  let rowCols = 'row-cols-lg-3';
  if (cart.products && cart.products.length < 2) {
    rowCols = '';
  }

  const handleIncrementClick = async (product) => {
    const newCart = await incrementQuantity(cart, product.id, 1, user, token);
    setCart(newCart);
  };
  const handleDecrementClick = async (product) => {
    const newCart = await decrementQuantity(cart, product.id, 1, user, token);
    setCart(newCart);
  };

  return (
    <div className="container px-4 py-5">
      {cart.products && cart.products.length > 0 ? (
        <Fragment>
          <h2 className="pb-2 border-bottom">
            Cart{' '}
            <Link to="/checkout">
              <button className="btn btn-outline-success">Checkout</button>
            </Link>
          </h2>
          <div
            className={`row row-cols-1 ${rowCols} align-items-stretch g-4 py-5`}
          >
            {cart.products.map((product, index) => {
              return (
                <div className="col cartCard">
                  <div
                    key={'cart' + index}
                    className="card cartCardImg card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                    style={{ backgroundImage: `url(${product.imgURL})` }}
                  >
                    <div className="transparentLayer">
                      <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                        <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                          {product.name}
                        </h2>
                        <h4>Quantity: {product.quantity}</h4>
                        <div className="d-flex">
                          <button onClick={() => handleIncrementClick(product)}>
                            +
                          </button>
                          <button onClick={() => handleDecrementClick(product)}>
                            -
                          </button>
                        </div>
                        <ul className="d-flex list-unstyled mt-auto">
                          <li className="me-auto">
                            <Link to={`/viewproduct=${product.id}`}>
                              <button className="btn btn-success">
                                Details
                              </button>
                            </Link>
                          </li>
                          <li className="d-flex align-items-center me-3">
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                removeToast();
                                removeProduct(product);
                              }}
                            >
                              Remove
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Fragment>
      ) : (
        <EmptyCart />
      )}
    </div>
  );
};

export default Cart;
