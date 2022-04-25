import React from 'react';
import useAuth from '../hooks/useAuth';
import useCart from '../hooks/useCart';

const CheckoutForm = ({ total, setIsSubmitPayment }) => {
  const { user } = useAuth();
  const { cart } = useCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitPayment(true);
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
                      <h6 className="my-0">{product.productName}</h6>
                      <small
                        className="text-muted"
                        style={{ textOverflow: 'ellipsis' }}
                      >
                        {product.productDescription}
                      </small>
                    </div>
                    <span className="text-muted">{`$${product.price}/hr`}</span>
                  </li>
                );
              })
            : null}
          <li className="list-group-item d-flex justify-content-between">
            <span>Total</span>
            <strong>{`$${total}/hr`}</strong>
          </li>
        </ul>
      </div>
      {/* CHECKOUT FORM */}
      <div className="col-md-7 col-lg-8">
        <h4 className="mb-3">Billing address</h4>
        <form className="needs-validation" onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="firstName" className="form-label">
                First name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value=""
                required=""
              />
            </div>

            <div className="col-sm-6">
              <label htmlFor="lastName" className="form-label">
                Last name
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                value=""
                required=""
              />
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">
                Email <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="email"
                className="form-control"
                placeholder={`${user.username || 'you'}@example.com`}
              />
            </div>

            <div className="col-12">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="1234 Main St"
                required=""
              />
            </div>

            <div className="col-12">
              <label htmlFor="address2" className="form-label">
                Address 2 <span className="text-muted">(Optional)</span>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Apartment or suite"
              />
            </div>

            <div className="col-md-5">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <select className="form-select" required="">
                <option value="">Choose...</option>
                <option>United States</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="state" className="form-label">
                State
              </label>
              <select className="form-select" required="">
                <option value="">Choose...</option>
                <option>California</option>
              </select>
            </div>

            <div className="col-md-3">
              <label htmlFor="zip" className="form-label">
                Zip Code
              </label>
              <input
                type="text"
                className="form-control"
                placeholder=""
                required=""
              />
            </div>
          </div>

          <hr className="my-4" />

          <div className="form-check">
            <input type="checkbox" className="form-check-input" />
            <label className="form-check-label" htmlFor="save-info">
              Save this information for next time
            </label>
          </div>

          <hr className="my-4" />

          <h4 className="mb-3">Payment</h4>

          <div className="my-3">
            <div className="form-check">
              <input
                name="paymentMethod"
                type="radio"
                className="form-check-input"
                required=""
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
                required=""
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
                required=""
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
