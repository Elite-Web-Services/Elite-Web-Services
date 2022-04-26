import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import { getOrderHistory } from "../../axios-services";

const ProfileOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);
  const { token } = useAuth();

  const getHistory = async () => {
    let newOrderHistory = await getOrderHistory(token);
    setOrderHistory(newOrderHistory);
  };
  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div>
      {orderHistory.length > 0 ? (
        <div>
          {orderHistory.map((cart, idx) => {
            return (
              <div>
                <h2>{cart.cartId} </h2>
                {cart.products ? (
                  <div id="orderHistory">
                    {cart.products.map((product, idx) => {
                      return (
                        <div key={"Orders Purchased:" + idx}>
                          <h3>{product.name}</h3>
                          <h5>{product.description}</h5>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default ProfileOrderHistory;
