import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { Link } from "react-router-dom";
import {
  createType,
  getAllTypes,
  updateType,
  deleteType,
} from "../../axios-services";

const CreateType = () => {
  const { token } = useAuth();
  const { types, setTypes } = useProduct();

  const [createState, setCreateState] = useState({
    name: "",
  });
  const [updateState, setUpdateState] = useState({
    id: 1,
    name: "",
  });

  const [deleteState, setDeleteState] = useState({
    id: 1,
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

  const handleUpdateType = async () => {
    const result = await updateType(updateState.id, updateState.name, token);

    if (result.name === "error") {
      console.log("error", result);
      setCreateError(result.message);
    } else {
      setCreateError("");

      const newTypes = await getAllTypes();
      setTypes(newTypes);
    }
  };

  const handleDeleteType = async () => {
    const result = await deleteType(deleteState.id, token);

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
            {/* UPDATE HERE */}
            <form
              className="needs-validation"
              onSubmit={async (event) => {
                event.preventDefault();
                handleUpdateType();
              }}
            >
              {createError ? <h3>Unable to update:{createError}</h3> : null}
              <select
                name="category"
                id="category-select"
                value={updateState.id}
                onChange={(e) =>
                  setUpdateState({
                    ...updateState,
                    id: e.target.value,
                  })
                }
                /* this should update the value of the type */
              >
                {types.map((type) => {
                  return (
                    <option key={"typeList:" + type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                })}
                {/* map over the types, return an <option /> */}
              </select>
              <input
                type="text"
                placeholder="Name"
                value={updateState.name}
                onChange={(event) =>
                  setUpdateState({ ...updateState, name: event.target.value })
                }
              />
              <button type="submit">Update Category</button>
            </form>
            {/* DELETE HERE */}
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                handleDeleteType();
              }}
            >
              {createError ? <h3>Unable to delete:{createError}</h3> : null}
              <select
                name="category"
                id="category-select"
                value={deleteState.id}
                onChange={(e) => setDeleteState({ id: e.target.value })}
              >
                {types.map((type) => {
                  return (
                    <option key={"typeList:" + type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                })}
              </select>
              <button type="submit">Delete Category</button>
            </form>
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
