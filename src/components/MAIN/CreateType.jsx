import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { createType, getAllTypes } from "../../axios-services";

const CreateType = () => {
  const { token } = useAuth();
  const { setTypes } = useProduct();

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
        onChange={(event) => setCreateState({ name: event.target.value })}
        required
      />
      <button type="submit">Create Category</button>
    </form>
  );
};

export default CreateType;