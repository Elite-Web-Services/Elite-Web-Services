import React from "react";
import useProduct from "../hooks/useProduct";
import { Link } from "react-router-dom";
import CreateType from "./CreateType";
import DeleteType from "./DeleteType";
import UpdateType from "./UpdateType";

const EditTypes = () => {
  const { types } = useProduct();

  return (
    <>
      <Link to="/manageproducts">
        <button className="btn btn-sm btn-outline-secondary">Back</button>
      </Link>
      <div className="card mb-4 box-shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <CreateType />
            <UpdateType />
            <DeleteType />
          </div>
        </div>
      </div>
      <ul>
        <h2>All Categories</h2>
        {types.map((type) => {
          return <li key={"typeList:" + type.id}>{type.name}</li>;
        })}
      </ul>
    </>
  );
};

export default EditTypes;
