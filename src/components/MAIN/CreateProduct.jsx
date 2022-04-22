import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { createProduct, getPublicProducts } from "../../axios-services";

const CreateProduct = () => {
    const { token, setPublicProducts, types } = useAuth();
  const [createState, setCreateState] = useState({
    typeId: 1,
    typeName: '',
    name: '',
    description: '',
    price: '',
    isPublic: true,
  });

  const [createError, setCreateError] = useState("");

  const handleCreateProduct = async () => {
    const result = await createProduct(
      token,
      createState.typeId,
      createState.name,
      createState.description,
      createState.price,
      createState.isPublic
    );
    
    if (result.name === "error") {
      console.log("error", result);
      setCreateError(result.message);
    } else {
      setCreateError("");

      const newProducts = await getPublicProducts();
      setPublicProducts(newProducts);
    }
  };

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          handleCreateProduct();
        }}
      >
        {createError ? <h3>Unable to create:{createError}</h3> : null}
        <input
          type="text"
          placeholder="Name"
          value={createState.name}
          onChange={(event) =>
            setCreateState({ ...createState, name: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={createState.description}
          onChange={(event) =>
            setCreateState({ ...createState, description: event.target.value })
          }
        />
        {/* sets isPublic to either true or false */}
        <select
          name="isPublic"
          id="select-public"
          value={createState.isPublic}
          onChange={(e) =>
            setCreateState({ ...createState, isPublic: e.target.value })
          }
        >
          <option value="true">Public</option>
          <option value="false">Private</option>
        </select>
        <div>
          <label htmlFor="category-select">Category</label>
          <select
            name="category"
            id="category-select"
            value={createState.typeId}
            onChange={(e) =>
              setCreateState({ ...createState, typeId: e.target.value })
            }
            /* this should create the value of the type */
          >
            {types.map((type) => {
              return (
                <option key={"typeList:" + type.id} value={type.id}>
                  {type.name}
                </option>
              );
            })}
            {/* map over the types, retCrn an <option /> */}
          </select>
          <input
            type="number"
            placeholder="Price per Hour"
            value={createState.price}
            onChange={(event) =>
              setCreateState({ ...createState, price: event.target.value })
            }
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </>
  );
};

export default CreateProduct;
