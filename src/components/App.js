import React, { useState } from 'react';
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import '../style/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './context/AuthContext';
import Main from './MAIN/Main';
import Navbar from './NAV/Navbar';

import Sidebar from './SIDEBAR/Sidebar'; //NEW
import { BrowserRouter as Router } from 'react-router-dom';
import CartProvider from './context/CartContext';
import ProductProvider from './context/ProductContext';
import ContactProvider from './context/ContactContext';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const App = () => {
  const [APIHealth, setAPIHealth] = useState('');

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <ContactProvider>
              <main>
                <Navbar />
                <div className="content d-flex justify-content-between">
                  <ToastContainer
                    position="bottom-left"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    theme={'colored'}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                  />

                  <Main />

                  <Sidebar />
                </div>
              </main>
            </ContactProvider>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
