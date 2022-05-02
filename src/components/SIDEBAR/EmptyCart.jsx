import React from 'react';
import { Link } from 'react-router-dom';

const EmptyCart = () => {
  return (
    <div className="container col-xxl-8 px-4 py-5">
      <div className="row flex-lg-row-reverse align-items-center g-5 py-5">
        <div className="col-10 col-sm-8 col-lg-6">
          <img
            src="https://res.cloudinary.com/elite-web-services/image/upload/v1650567503/cld-sample.jpg"
            className="d-block mx-lg-auto img-fluid"
            alt="Happy Elite Web Services Customer"
            width="700"
            height="500"
          />
        </div>
        <div className="col-lg-6">
          <h1 className="display-5 fw-bold lh-1 mb-3">
            Your elite web solution is around the corner
          </h1>
          <p className="lead">
            In the modern age, no business survives without modern solutions.
            While your revenue may depend on your customers, with the right web
            solutions you can direct those customers to the choices that mean
            the difference for your business. It all starts with a modern
            website, but it doesn't end there. See all products.
          </p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-start">
            <Link to="/products">
              <button className="btn btn-primary btn-lg ox-4 me-md-2">
                Find Your Solution
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
