import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import TypeButtons from "./TypeButtons";
import PriceInput from "./PriceInput";
// import PubPrivButtons from "./PubPrivButtons";

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
      <Link to="/editcategories">
        <button>Edit Categories</button>
      </Link>

      {Array.isArray(filterProducts) && filterProducts.length ? (
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">name</th>
                <th scope="col">Category</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {filterProducts.map((product) => (
                <tr key={`allusersTable:`}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.typeName}</td>
                  <td>{product.description}</td>
                  <td>${product.price}/hr</td>
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
