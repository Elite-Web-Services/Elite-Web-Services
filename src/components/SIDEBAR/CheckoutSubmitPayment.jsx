import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

const CheckoutSubmitPayment = ({ isSubmitPayment, setIsSubmitPayment }) => {
  const handleClose = () => {
    setIsSubmitPayment(false);
  };

  return (
    <Modal show={isSubmitPayment} onHide={handleClose}>
      ARE YOU SURE YOU WANT TO PAY?
    </Modal>
  );
};

export default CheckoutSubmitPayment;
