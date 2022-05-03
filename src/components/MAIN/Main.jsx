import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './Products';
import AllUsers from './AllUsers';
import Cart from '../SIDEBAR/Cart';
import Checkout from '../SIDEBAR/Checkout';
import EditProduct from './EditProduct';
import SingleProduct from './SingleProduct';
import CreateProduct from './CreateProduct';
import ProfileContactInfo from '../SIDEBAR/ProfileContactInfo';
import useAuth from '../hooks/useAuth';
import useProduct from '../hooks/useProduct';
import ManageProducts from './ManageProducts';
import EditTypes from './EditTypes';
import ProfileOrderHistory from '../SIDEBAR/ProfileOrderHistory';
import Home from './Home';

const Main = () => {
  const { user } = useAuth();
  const { products } = useProduct();

  return (
    <div className="main">
      <Routes>
        <Route path="/users/" element={<AllUsers />} />
        <Route path="/contactinfo" element={<ProfileContactInfo />} />
        <Route path="/orderHistory" element={<ProfileOrderHistory />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Products />} />
        {/* add check for admin into components. either navigate away, or display unauthorized error */}
        {/* {user.isAdmin ? (
          <> */}
        <Route path="/manageproducts" element={<ManageProducts />} />
        <Route path="/createproduct" element={<CreateProduct />} />
        <Route path="/editcategories" element={<EditTypes />} />
        {/* </>
        ) : null} */}
        <Route path="/" element={<Home />} />

        {Array.isArray(products)
          ? products.map((product) => (
              <Route
                key={`SingleProductLink ${product.id}`}
                path={`viewproduct=${product.id}`}
                element={<SingleProduct product={product} />}
              />
            ))
          : null}

        {Array.isArray(products) && user.isAdmin
          ? products.map((product) => (
              <Route
                key={`editProductLink ${product.id}`}
                path={`editproduct=${product.id}`}
                element={<EditProduct product={product} />}
              />
            ))
          : null}
      </Routes>
    </div>
  );
};

export default Main;
