import React from "react";
import useProduct from "../hooks/useProduct";
import useAuth from '../hooks/useAuth';
import { Link } from "react-router-dom";
import CreateType from "./CreateType";
import UpdateType from "./UpdateType";

const EditTypes = () => {
  const { types } = useProduct();
  const { user } = useAuth();

  return (
    <>
      {user.isAdmin ? (
        <>
          <Link to="/manageproducts">
            <button className="btn btn-sm btn-outline-secondary back-button">
              Back
            </button>
          </Link>

          {/* Display all types */}
          <h5
            style={{
              display: "flex",
              margin: "1rem",
              justifyContent: "center",
            }}
          >
            All Categories
          </h5>
          <div
            className="table-responsive"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">id</th>
                  <th scope="col">name</th>
                </tr>
              </thead>
              <tbody>
                {types.map((type) => (
                  <tr key={`manageProductsTable: ${type.id}`}>
                    <td>{type.id}</td>
                    <td>{type.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* editing cards */}
          <div
            className="card mb-4 box-shadow"
            style={{ margin: "2rem 3rem 0 3rem" }}
          >
            <div className="card-body" style={{ paddingTop: "1rem" }}>
              <CreateType />
            </div>
          </div>

          <div
            className="card mb-4 box-shadow"
            style={{ margin: "2rem 3rem 0 3rem" }}
          >
            <div className="card-body" style={{ paddingTop: "3rem" }}>
              <UpdateType />
            </div>
          </div>
        </>
      ) : (
        <h1
          style={{
            color: "red",
            display: "flex",
            margin: "4rem",
            justifyContent: "center",
          }}
        >
          You are not authorized
        </h1>
      )}
    </>
  );
};

export default EditTypes;
