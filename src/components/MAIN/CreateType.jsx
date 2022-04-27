import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { Link } from "react-router-dom";
import DeleteType from "./DeleteType";
import UpdateType from "./UpdateType";
import {
  createType,
  getAllTypes,
  updateType,
} from "../../axios-services";

const CreateType = () => {
  const { token } = useAuth();
  const { types, setTypes } = useProduct();

  const [createState, setCreateState] = useState({
    name: "",
  });

  const [createError, setCreateError] = useState("");

  const handleCreateType = async () => {
    const result = await createType(createState.name, token);

    if (result.name === "error") {
      console.log("error", result);
      setCreateError(result.message);
    } else {
      setCreateError("");

      const newTypes = await getAllTypes();
      setTypes(newTypes);
    }
  };

  return (
    <>
      <Link to="/manageproducts">
        <button className="btn btn-sm btn-outline-secondary">Back</button>
      </Link>
      <div className="card mb-4 box-shadow">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <form
              className="needs-validation"
              onSubmit={async (event) => {
                event.preventDefault();
                handleCreateType();
              }}
            >
              {createError ? <h3>Unable to create:{createError}</h3> : null}
              <input
                type="text"
                placeholder="Name"
                value={createState.name}
                onChange={(event) =>
                  setCreateState({ name: event.target.value })
                }
                required
              />
              <button type="submit">Create Category</button>

            </form>
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

export default CreateType;
