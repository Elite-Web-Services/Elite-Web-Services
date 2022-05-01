import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import TypeButtons from "./TypeButtons";
import PriceInput from "./PriceInput";
// import PubPrivButtons from "./PubPrivButtons";

const ManageProducts = () => {
  const { filterProducts } = useProduct();

  return (
    <div>
      <div
        className="navbar-dark bg-dark"
        style={{
          marginBottom: "1rem",
          position: "sticky",
          top: "0",
          zIndex: "100",
        }}
      >
        <div className="hide-price">
          <PriceInput />
        </div>
        <TypeButtons />
      </div>

<div
style={{display: "flex", justifyContent: "center", justifyContent: "space-evenly", margin: "2rem"}}>
      <Link to="/createproduct">
        <button
        className="btn btn-outline-success"
        style={{width: "12rem", padding: "1rem"}}
        >Add New Product</button>
      </Link>
      <Link to="/editcategories">
        <button className="btn btn-outline-success"
        style={{width: "12rem", padding: "1rem"}}
        >Edit Categories</button>
      </Link>
      </div>

      {Array.isArray(filterProducts) && filterProducts.length ? (
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col">Visibility</th>
                <th className="table-description" scope="col">
                  Description
                </th>
              </tr>
            </thead>
            <tbody>
              {filterProducts.map((product) => (
                <tr key={`manageProductsTable: ${product.id}`}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.typeName}</td>
                  <td>${product.price}/hr</td>
                  <td>{product.isPublic ? "Public" : "Private"}</td>
                  <td className="table-description">{product.description}</td>
                  <td>
                    <Link to={`/editproduct=${product.id}`}>
                      <button className="btn btn-sm btn-outline-secondary">
                        Edit
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h5
          style={{ display: "flex", margin: "4rem", justifyContent: "center" }}
        >
          Sorry, we couldn't find anything that matched your search!
        </h5>
      )}
    </div>
  );
};

export default ManageProducts;
