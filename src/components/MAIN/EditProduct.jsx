import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { getPublicProducts, updateProduct } from "../../axios-services";

const EditProduct = ({ product, types }) => {
    const { token, setPublicProducts } = useAuth();

    const [updateState, setUpdateState] = useState({
        typeId: product.typeId,
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
                setUpdateState({ ...updateState, goal: event.target.value })
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
                value={product.typeId}
                onChange={(e) =>
                    setUpdateState({ ...updateState, typeId: e.target.value })
                }
                /* this should update the value of the type */
              >
                <option value={product.typeId}>{product.typeName}</option>
                {types.map((type) => {
                  return (
                    <option key={"typeList:" + type.id} value={type.id}>
                      {type.name}
                    </option>
                  );
                })}
                {/* map over the types, return an <option /> */}
              </select>
            </div>
            <button type="submit">Update Product</button>
          </form>
        </>
      );
    };

export default EditProduct;