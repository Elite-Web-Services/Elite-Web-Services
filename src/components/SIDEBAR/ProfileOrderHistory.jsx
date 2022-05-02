import React, { useState, useEffect, Fragment } from 'react';
import useAuth from '../hooks/useAuth';
import { getOrderHistory } from '../../axios-services';
import useCart from '../hooks/useCart';

const ProfileOrderHistory = ({ userOrderHistory }) => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { token } = useAuth();
  const { total } = useCart();

  const getHistory = async () => {
    let newOrderHistory = await getOrderHistory(token);
    setOrderHistory(newOrderHistory);
  };
  useEffect(() => {
    if (userOrderHistory) {
      setOrderHistory(userOrderHistory);
    } else {
      getHistory();
    }
  }, []);

  return (
    <div className="container">
      {orderHistory.length > 0 ? (
        <div>
          {orderHistory.map((cart, idx) => {
            return (
              <Fragment>
                {cart.products && cart.products.length > 0 ? (
                  <div>
                    <h2 className="d-block text-gray-dark">
                      Order Number: 978664-{cart.cartId}
                    </h2>
                    <p>Purchased {cart.purchaseDate.slice(0, 10)}</p>
                    {cart.products ? (
                      <div
                        id="orderHistory"
                        className="my-3 p-3 bg-body rounded shadow-lg"
                      >
                        {cart.products.map((product, idx) => {
                          return (
                            <div
                              key={'Orders Purchased:' + idx}
                              className="pb-3 mb-0 small lh-sm border-bottom"
                            >
                              <h3>{product.name}</h3>
                              <p>{product.description}</p>
                              <p>Quantity: {product.quantity}</p>
                              <p>Cost: ${product.price}</p>
                            </div>
                          );
                        })}
                        <h4>Total Purchase Cost: ${cart.totalCost}</h4>
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </Fragment>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ProfileOrderHistory;
