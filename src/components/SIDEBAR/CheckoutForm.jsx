import React, { useState } from 'react';
import { decrementQuantity, incrementQuantity } from '../context/helpers';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';
import useContact from '../hooks/useContact';
import ContactInfo from './ContactInfo';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';

const CheckoutForm = ({ setIsSubmitPayment }) => {
  const { user, token } = useAuth();
  const { cart, setCart, total } = useCart();
  const { addContact } = useContact();
  const [clicked, setClicked] = useState(false);

  const successToast = (e) => {
    toast.success('Contact updated successfully!', { theme: 'colored' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clicked) {
      await addContact();
      successToast();
    }
    setIsSubmitPayment(true);
  };

  const handleIncrementClick = async (product) => {
    const newCart = await incrementQuantity(cart, product.id, 1, user, token);
    setCart(newCart);
  };
  const handleDecrementClick = async (product) => {
    const newCart = await decrementQuantity(cart, product.id, 1, user, token);
    setCart(newCart);
  };

  return (
    <div className="row g-5">
      {/* CART */}
      <div className="col-md-5 col-lg-4 order-md-last">
        <h4 className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-primary">Your cart</span>
          <span className="badge bg-primary rounded-pill">
            {cart.products ? cart.products.length : '0'}
          </span>
        </h4>
        <ul className="list-group mb-3">
          {cart.products
            ? cart.products.map((product, i) => {
                return (
                  <li
                    className="list-group-item d-flex justify-content-between lh-sm"
                    key={`checkoutcartproduct:${i}`}
                  >
                    <div>
                      <h6 className="my-0">{product.name}</h6>
                      <small
                        className="text-muted"
                        style={{ textOverflow: 'ellipsis' }}
                      >
                        {product.description}
                      </small>
                      <p>
                        <strong>Quantity: {product.quantity}</strong>
                      </p>
                      <button onClick={() => handleIncrementClick(product)}>
                        +
                      </button>
                      <button onClick={() => handleDecrementClick(product)}>
                        -
                      </button>
                    </div>
                    <span className="text-muted">{`$${product.price}`}</span>
                  </li>
                );
              })
            : null}
          <li className="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>{`$${total}`}</strong>
          </li>
        </ul>
      </div>
      {/* CHECKOUT FORM */}
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" onSubmit={handleSubmit}>
          <ContactInfo />

          <hr className="my-4" />

          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={(e) => {
                setClicked(true);
              }}
            />
            <label className="form-check-label" htmlFor="save-info">
              Save this information for next time
            </label>
          </div>

          <hr className="my-4" />

          <h4 className="mb-3">Payment</h4>

          <div className="my-3">
            <div className="form-check" required="true">
              <input
                name="paymentMethod"
                type="radio"
                className="form-check-input"
                required="true"
              />
              <label className="form-check-label" htmlFor="credit">
                Credit card
              </label>
            </div>
            <div className="form-check">
              <input
                name="paymentMethod"
                type="radio"
                className="form-check-input"
                required=""
              />
              <label className="form-check-label" htmlFor="debit">
                Debit card
              </label>
            </div>
            <div className="form-check">
              <input
                name="paymentMethod"
                type="radio"
                className="form-check-input"
                required=""
              />
              <label className="form-check-label" htmlFor="paypal">
                IOU
              </label>
            </div>
          </div>

          <div className="row gy-3">
            <div className="col-md-6">
              <label htmlFor="cc-name" className="form-label">
                Name of Payer
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                required="true"
              />
              <small className="text-muted">
                Full name as displayed on card or IOU
              </small>
              <div className="invalid-feedback">Name on card is required</div>
            </div>

            <div className="col-md-6">
              <label htmlFor="payment-number" className="form-label">
                Payment Number
              </label>
              <input
                type="text"
                className="form-control"
                name="payment-number"
                placeholder=""
                required="true"
              />
            </div>
          </div>

          <hr className="my-4" />

          <button className="w-100 btn btn-primary btn-lg" type="submit">
            Continue to checkout
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutForm;
