import React, { useState, useEffect, Fragment } from 'react';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import CheckoutForm from './CheckoutForm';
import CheckoutSubmitPayment from './CheckoutSubmitPayment';

const Checkout = () => {
  const [isSubmitPayment, setIsSubmitPayment] = useState(false);
  const { user } = useAuth();
  const { cart } = useCart();

  return (
    <div className="container">
      <CheckoutForm setIsSubmitPayment={setIsSubmitPayment} />
      {isSubmitPayment && (
        <CheckoutSubmitPayment
          isSubmitPayment={isSubmitPayment}
          setIsSubmitPayment={setIsSubmitPayment}
        />
      )}
    </div>
  );
};

export default Checkout;
