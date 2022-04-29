import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { createType, getAllTypes } from "../../axios-services";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const successToast = (e) => {
  toast.success("Type creation successful!", { theme: "colored" });
};
const failureToast = (error) => {
  toast.error(error, { theme: "colored" });
};

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
      setCreateError(result.message);
      failureToast(result.message);
    } else {
      setCreateError("");

      const newTypes = await getAllTypes();
      setTypes(newTypes);
      successToast();
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
      {createError ? <h3>This category already exists!</h3> : null}
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
