import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import TypeButtons from "./TypeButtons";
import PriceInput from "./PriceInput";

const ManageProducts = () => {
  const { user } = useAuth();
  const { searchObj, filterProducts } = useProduct();

  return (
    <div>
      <TypeButtons />
      <PriceInput />

        <Link to="/createproduct">
          <button>Add New Product</button>
        </Link>
        <Link to="/createcategory">
          <button>Edit Categories</button>
        </Link>

      {Array.isArray(filterProducts) ? (
        <div id="productList" className="album py-5 bg-light">
          <div className="container">
            <div className="row">
              {searchObj.type ? (
                <h1>{searchObj.type}</h1>
              ) : (
                <h1>All Products</h1>
              )}
              {filterProducts.map((product) => (
                <div key={"productList:" + product.id} className="col-md-4">
                  <div className="card mb-4 box-shadow">
                    <div className="card-body">
                      <h6 className="card-text">
                        {product.isPublic ? "Public" : "Private"}
                      </h6>
                        <h6 className="card-text">
                          Category: {product.typeName}
                        </h6>
                      <h2 className="card-text">{product.name}</h2>
                      <p className="card-text">{product.description}</p>
                      {/* remove later */}
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          {user.isAdmin ? (
                            <Link to={`/editproduct=${product.id}`}>
                              <button className="btn btn-sm btn-outline-secondary">
                                Edit
                              </button>
                            </Link>
                          ) : null}
                        </div>
                        <small className="text-muted">
                          ${product.price}/hr
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h5>Sorry, we couldn't find anything that matched your search!</h5>
      )}
    </div>
  );
};

export default ManageProducts;
