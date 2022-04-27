import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { getAllTypes, updateType } from "../../axios-services";

const UpdateType = () => {
  const { token } = useAuth();
  const { types, setTypes } = useProduct();

  const [updateState, setUpdateState] = useState({
    id: 1,
    name: "",
  });

  const [updateError, setUpdateError] = useState("");

  const handleUpdateType = async () => {
    const result = await updateType(updateState.id, updateState.name, token);

    if (result.name === "error") {
      console.log("error", result);
      setUpdateError(result.message);
    } else {
      setUpdateError("");

      const newTypes = await getAllTypes();
      setTypes(newTypes);
    }
  };

  return (
    <form
      className="needs-validation"
      onSubmit={async (event) => {
        event.preventDefault();
        handleUpdateType();
      }}
    >
      {updateError ? <h3>Unable to update:{updateError}</h3> : null}
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
        required
      />
      <button type="submit">Update Category</button>
    </form>
  );
};

export default UpdateType;
