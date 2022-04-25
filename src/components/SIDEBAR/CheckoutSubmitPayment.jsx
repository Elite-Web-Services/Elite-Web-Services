import React, { useState } from 'react';
import { Modal, ModalHeader } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import { purchaseCart } from '../../axios-services';
import useCart from '../hooks/useCart';

const CheckoutSubmitPayment = ({
  total,
  isSubmitPayment,
  setIsSubmitPayment,
}) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [purchased, setPurchased] = useState(false);
  const { token } = useAuth();
  const { cart, setCart } = useCart();

  const handleClose = () => {
    setIsSubmitPayment(false);
    setPurchased(false);
  };

  const handlePurchase = async () => {
    setPurchased(true);
    const newCart = await purchaseCart(token, cart.cartId);
    console.log('NEW CART AFTER PURCHASING, ', newCart);
    setCart(newCart);
  };

  const handleReject = () => {
    setIsError(true);
    setErrorMessage('Oops! You need to select the "Yes, Purchase!" button.');
  };

  return (
    <Modal show={isSubmitPayment} onHide={handleClose}>
      <div className="modal-body p-4 text-center">
        <h5 className="mb-0">
          {purchased ? 'Good Choice!' : 'Submit payment?'}
        </h5>
        {purchased ? (
          <p>
            {`Order Confirmation number: 978664-${cart.cartId}`}
            <hr />
            {'We will be in touch :)'}
          </p>
        ) : (
          <p className="mb-0">{`You are purchasing an elite package with ${cart.products.length} items with a cost of $${total}/hr.`}</p>
        )}
      </div>
      {isError && !purchased ? (
        <div className="errorMessage text-center">
          <p>{`${errorMessage}`}</p>
        </div>
      ) : null}
      {purchased ? null : (
        <footer className="modal-footer flex-nowrap p-0">
          <button
            onClick={handlePurchase}
            className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0 border-right"
          >
            <strong>Yes, purchase!</strong>
          </button>
          <button
            onClick={handleReject}
            className="btn btn-lg btn-link fs-6 text-decoration-none col-6 m-0 rounded-0"
          >
            Changed my mind.
          </button>
        </footer>
      )}
    </Modal>
  );
};

export default CheckoutSubmitPayment;
