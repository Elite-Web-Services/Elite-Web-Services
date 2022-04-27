import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
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
    <div className="container">
      {orderHistory.length > 0 ? (
        <div>
          {orderHistory.map((cart, idx) => {
            return (
              <div key={"Order Number:" + idx}>
                <h2 className="d-block text-gray-dark">
                  Order Number: {cart.cartId}
                </h2>
                {cart.products ? (
                  <div
                    id="orderHistory"
                    className="my-3 p-3 bg-body rounded shadow-lg"
                  >
                    {cart.products.map((product, idx) => {
                      return (
                        <div
                          key={"Orders Purchased:" + idx}
                          className="pb-3 mb-0 small lh-sm border-bottom"
                        >
                          <h3>{product.name}</h3>
                          <p>{product.description}</p>
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
