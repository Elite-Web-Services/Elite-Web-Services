import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import {
  getPublicProducts,
  updateProduct,
  deleteProduct,
} from "../../axios-services";

const EditProduct = ({ product }) => {

  const { token, setPublicProducts, types } = useAuth();

  const [updateState, setUpdateState] = useState({
    typeId: product.typeId,
    typeName: product.typeName,
    name: product.name,
    description: product.description,
    price: product.price,
    isPublic: product.isPublic,
  });

  const [updateError, setUpdateError] = useState("");

  const handleUpdateProduct = async () => {
    const result = await updateProduct(
      product.id,
      token,
      updateState.typeId,
      updateState.name,
      updateState.description,
      updateState.price,
      updateState.isPublic
    );

    if (result.error) {
      console.log("error", result);
      setUpdateError(result.error);
    } else {
      setUpdateError("");

      const newProducts = await getPublicProducts();
      setPublicProducts(newProducts);
    }
  };

  return (
    <>
      {product ? (
        <>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              handleUpdateProduct();
            }}
          >
            {updateError ? <h3>Unable to edit:{updateError}</h3> : null}
            <input
              type="text"
              placeholder={product.name}
              value={updateState.name}
              onChange={(event) =>
                setUpdateState({ ...updateState, name: event.target.value })
              }
            />
            <input
              type="text"
              placeholder={product.description}
              value={updateState.description}
              onChange={(event) =>
                setUpdateState({
                  ...updateState,
                  description: event.target.value,
                })
              }
            />
            {/* sets isPublic to either true or false */}
            <select
              name="isPublic"
              id="select-public"
              value={updateState.isPublic}
              onChange={(e) =>
                setUpdateState({ ...updateState, isPublic: e.target.value })
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
                value={updateState.typeId}
                onChange={(e) =>
                  setUpdateState({ ...updateState, typeId: e.target.value })
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
                type="number"
                placeholder={product.price}
                value={updateState.price}
                onChange={(event) =>
                  setUpdateState({ ...updateState, price: event.target.value })
                }
              />
            </div>
            <button type="submit">Update Product</button>
          </form>
          <form>
            <button
              onClick={async (event) => {
                event.preventDefault();
                await deleteProduct(product.id, token);

                const newProducts = await getPublicProducts();
                setPublicProducts(newProducts);
              }}
            >
              Delete Product
            </button>
          </form>
        </>
      ) : null}
    </>
  );
};

export default EditProduct;
