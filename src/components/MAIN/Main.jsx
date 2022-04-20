import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './Products';
import AllUsers from './AllUsers';

const Main = () => {
  return (
    <div className="main">
      <Routes>
        <Route path="/users/" element={<AllUsers />}></Route>
        <Route path="/" element={<Products />}></Route>
      </Routes>
    </div>
  );
};

export default Main;
