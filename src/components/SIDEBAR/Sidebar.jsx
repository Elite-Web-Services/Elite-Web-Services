import React from "react";
import useAuth from "../hooks/useAuth";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div id="sidebar_container">
      <div className=" flex-shrink-0 p-3 bg-white" style={{ width: "280px" }}>
        <ul className="list-unstyled ps-0">
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#profile-collapse"
              aria-expanded="false"
            >
              My Profile
            </button>
            <div className="collapse" id="profile-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a href="#" className="link-dark rounded">
                    Order History
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Contact Info
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Customize Profile
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li className="mb-1">
            <button
              className="btn btn-toggle align-items-center rounded collapsed"
              data-bs-toggle="collapse"
              data-bs-target="#cart-sidebar-collapse"
              aria-expanded="false"
            >
              Cart
            </button>
            <div className="collapse" id="cart-sidebar-collapse">
              <ul className="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                <li>
                  <a href="#" className="link-dark rounded">
                    Checkout
                  </a>
                </li>
                <li>
                  <a href="#" className="link-dark rounded">
                    Go to Cart
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
