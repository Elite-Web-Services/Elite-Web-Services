import React, { useState, useEffect, Fragment } from 'react';
import useAuth from '../hooks/useAuth';
import CheckoutForm from './CheckoutForm';
import CheckoutSubmitPayment from './CheckoutSubmitPayment';

const Checkout = () => {
  const [isSubmitPayment, setIsSubmitPayment] = useState(false);
  const [total, setTotal] = useState(0);
  const { user, cart } = useAuth();

  useEffect(() => {
    let newTotal = 0;
    if (cart.products) {
      cart.products.forEach((product) => (newTotal += +product.price));
    }
    setTotal(newTotal);
  }, [cart]);

  return (
    <div className="container">
      <CheckoutForm total={total} setIsSubmitPayment={setIsSubmitPayment} />
      {isSubmitPayment && (
        <CheckoutSubmitPayment
          isSubmitPayment={isSubmitPayment}
          setIsSubmitPayment={setIsSubmitPayment}
          total={total}
        />
      )}
    </div>
  );
};

export default Checkout;
