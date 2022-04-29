import React, { useState, useEffect } from "react";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthProvider from "./context/AuthContext";
import Main from "./MAIN/Main";
import Navbar from "./NAV/Navbar";

import Sidebar from "./SIDEBAR/Sidebar"; //NEW
import { BrowserRouter as Router } from "react-router-dom";
import CartProvider from "./context/CartContext";
import ProductProvider from "./context/ProductContext";
import ContactProvider from "./context/ContactContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <ContactProvider>
              <main>
                <Navbar />
                {/* <p>API Status: {APIHealth}</p> */}
                <div className="content d-flex justify-content-between">
                  <ToastContainer
                    position="top-right"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    theme={"colored"}
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
