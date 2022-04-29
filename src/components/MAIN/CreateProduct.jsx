import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, getAllProducts } from "../../axios-services";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setProducts, types } = useProduct();

  const [createState, setCreateState] = useState({
    typeId: 1,
    typeName: "",
    name: "",
    description: "",
    price: "",
    isPublic: true,
    imageURL: "",
  });

  const [createError, setCreateError] = useState("");

  const successToast = (e) => {
    toast.success("Product creation successful!", { theme: "colored" });
  };
  const failureToast = (error) => {
    toast.error(error, { theme: "colored" });
  };

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
      failureToast(result.message);
    } else {
      setCreateError("");

      const newProducts = await getAllProducts(token);
      setProducts(newProducts);
      successToast();
      navigate("/manageproducts");
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
                  setCreateState({
                    ...createState,
                    description: event.target.value,
                  })
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
                    setCreateState({
                      ...createState,
                      price: event.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Image URL"
                  value={createState.imageURL}
                  onChange={(event) =>
                    setCreateState({
                      ...createState,
                      imageURL: event.target.value,
                    })
                  }
                />
              </div>
              <button type="submit">Create Product</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
