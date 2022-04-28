import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import {
  getAllTypes,
  deleteType,
} from "../../axios-services";

const DeleteType = () => {
  const { token } = useAuth();
  const { types, setTypes } = useProduct();

  const [deleteState, setDeleteState] = useState({
    id: 1,
  });

  const [deleteError, setDeleteError] = useState("");

  const handleDeleteType = async () => {
    const result = await deleteType(deleteState.id, token);

    if (result.name === "error") {
      console.log("error", result);
      setDeleteError(result.message);
    } else {
      setDeleteError("");

      const newTypes = await getAllTypes();
      setTypes(newTypes);
    }
  };

  return (
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                handleDeleteType();
              }}
            >
              {deleteError ? <p>Unable to delete: Cannot delete this category while there are products listed under it.</p> : null}
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
  );
};

export default DeleteType;