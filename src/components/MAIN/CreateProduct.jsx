import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import useProduct from "../hooks/useProduct";
import { Link, useNavigate } from "react-router-dom";
import { createProduct, getAllProducts } from "../../axios-services";
import { toast } from "react-toastify";

const CreateProduct = () => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setProducts, types } = useProduct();

  const [createState, setCreateState] = useState({
    typeId: 1,
    typeName: "",
    name: "",
    description: "",
    fullDescription: "",
    price: "",
    isPublic: true,
    imgURL: "",
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
      createState.fullDescription,
      createState.price,
      createState.isPublic,
      createState.imgURL
    );

    if (result.name === "error") {
      console.log("error", result);
      setCreateError(result.message);
      failureToast("Unable to create product");
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
        <button className="btn btn-sm btn-outline-secondary back-button">
          Back
        </button>
      </Link>
      <div
        className="card mb-4 box-shadow"
        style={{ margin: "2rem 3rem 0 3rem" }}
      >
        <div className="card-body" style={{paddingTop: "2rem"}}>
          <form
            className="needs-validation"
            onSubmit={async (event) => {
              event.preventDefault();
              handleCreateProduct();
            }}
          >
            <div
              className="row"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {/* sets isPublic to either true or false */}
              <div className="col-md-5 mb-3">
                <select
                  style={{ padding: ".5rem", width: "100%" }}
                  name="isPublic"
                  id="select-public"
                  value={createState.isPublic}
                  onChange={(e) =>
                    setCreateState({
                      ...createState,
                      isPublic: e.target.value,
                    })
                  }
                >
                  <option value="true">Public</option>
                  <option value="false">Private</option>
                </select>
              </div>
              <div className="col-md-5 mb-3">
                <select
                  style={{ padding: ".5rem", width: "100%" }}
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
              </div>
            </div>
            {/* Text inputs start here */}
            <div className="mb-3">
              <label htmlFor="name">Title</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Title"
                  value={createState.name}
                  onChange={(event) =>
                    setCreateState({
                      ...createState,
                      name: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="name">Description</label>
              <div className="input-group">
                <input
                  className="form-control"
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
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="fullDescription">Full Description</label>
              <div className="input-group">
                <textarea
                  className="form-control"
                  style={{ height: "10rem" }}
                  type="text"
                  placeholder="Full Description"
                  value={createState.fullDescription}
                  onChange={(event) =>
                    setCreateState({
                      ...createState,
                      fullDescription: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="imgURL">Image URL</label>
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Image URL"
                  value={createState.imgURL}
                  onChange={(event) =>
                    setCreateState({
                      ...createState,
                      imgURL: event.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-5 mb-3">
            <label htmlFor="price">Price/hr</label>
              <input
              className="form-control"
              style={{ width: "50%" }}
                type="number"
                placeholder="Price/hr"
                value={createState.price}
                onChange={(event) =>
                  setCreateState({
                    ...createState,
                    price: event.target.value,
                  })
                }
              />
            </div>
            {createError ? <p>Unable to create:{createError}</p> : null}
            <button
              className="btn btn-success"
              style={{ margin: "1.5rem 0 .5rem 0", width: "100%" }}
              type="submit"
            >
              Create Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateProduct;
