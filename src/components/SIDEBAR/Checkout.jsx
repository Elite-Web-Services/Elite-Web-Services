import React, { useState } from 'react';
import CheckoutForm from './CheckoutForm';
import CheckoutSubmitPayment from './CheckoutSubmitPayment';

const Checkout = () => {
  const [isSubmitPayment, setIsSubmitPayment] = useState(false);

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
