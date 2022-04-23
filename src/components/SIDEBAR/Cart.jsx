import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { deleteCartProduct } from '../../axios-services';
import useAuth from '../hooks/useAuth';
import EmptyCart from './EmptyCart';

const Cart = () => {
  const { cart, token, setCart } = useAuth();
  console.log(cart);

  // this fixes weird formatting when only one item in cart
  let rowCols = 'row-cols-lg-3';
  if (cart.products && cart.products.length < 2) {
    rowCols = '';
  }
  return (
    <div className="container px-4 py-5">
      {cart.products && cart.products.length > 0 ? (
        <Fragment>
          <h2 className="pb-2 border-bottom">Cart</h2>
          <div
            className={`row row-cols-1 ${rowCols} align-items-stretch g-4 py-5`}
          >
            {cart.products.map((product, index) => {
              return (
                <div className="col">
                  <div
                    key={'cart' + index}
                    className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg"
                    style={{ backgroundImage: `url(${product.imgURL})` }}
                  >
                    <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                      <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">
                        {product.productName}
                      </h2>
                      <ul className="d-flex list-unstyled mt-auto">
                        <li className="me-auto">
                          <Link to={`/viewproduct=${product.productId}`}>
                            <button className="btn btn-primary">Details</button>
                          </Link>
                        </li>
                        <li className="d-flex align-items-center me-3">
                          <button
                            className="btn btn-danger"
                            onClick={async () => {
                              const newCart = await deleteCartProduct(
                                product.productId,
                                token
                              );
                              console.log('new cart', newCart);
                              setCart(newCart);
                            }}
                          >
                            Remove
                          </button>
                        </li>
                      </ul>
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
