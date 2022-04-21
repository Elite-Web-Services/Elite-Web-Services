import React from "react";
import useAuth from "../hooks/useAuth";

const Cart = () => {
  const { cart } = useAuth();
  console.log(cart)
  return (
    <div>
      <h2>{cart.cartId}</h2>
      {cart.products ? (
       <div id="productList">
       {cart.products.map((product, index) => {
         return (
           <div key={"cart" + index}>
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

export default Cart;
