import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

const ProfileOrderHistory = () => {
  const { token } = useAuth();
  const { cart } = useCart();
  return (
    <div>
      <h2>{cart.cartId} </h2>
      {/* need to add Purchased boolean */}
      {cart.products ? (
        <div id="orderHistory">
          {cart.products.map((product, idx) => {
            return (
              <div key={'Orders Purchased:' + idx}>
                <h3>{product.productName}</h3>
                <h5>{product.productDescription}</h5>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ProfileOrderHistory;
