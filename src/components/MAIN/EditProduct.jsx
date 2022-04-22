import React, { useState } from "react";
import { Link } from "react-router-dom";
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
    imgURL: product.imgURL,
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
      <Link to="/products">
        <button className="btn btn-sm btn-outline-secondary">Back</button>
      </Link>
      <div className="card mb-4 box-shadow">
        {product ? (
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center">
              <form
                className="needs-validation"
                onSubmit={async (event) => {
                  event.preventDefault();
                  handleUpdateProduct();
                }}
              >
                {updateError ? <h3>Unable to edit:{updateError}</h3> : null}
                {/* sets isPublic to either true or false */}
                <div className="row">
                  <div className="col-md-5 mb-3">
                    <select
                      className="custom-select d-block w-100"
                      name="isPublic"
                      id="select-public"
                      value={updateState.isPublic}
                      onChange={(e) =>
                        setUpdateState({
                          ...updateState,
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
                      className="custom-select d-block w-100"
                      name="category"
                      id="category-select"
                      value={updateState.typeId}
                      onChange={(e) =>
                        setUpdateState({
                          ...updateState,
                          typeId: e.target.value,
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
                  </div>
                  <div className="col-md-5 mb-3">
                    <label htmlFor="price">Price/hr</label>
                    <input
                      className="custom-select d-block w-100"
                      type="number"
                      placeholder={product.price}
                      value={updateState.price}
                      onChange={(event) =>
                        setUpdateState({
                          ...updateState,
                          price: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>

                {/* Start text inputs here */}
                <div className="mb-3">
                  <label htmlFor="name">Title</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder={product.name}
                      value={updateState.name}
                      onChange={(event) =>
                        setUpdateState({
                          ...updateState,
                          name: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="description">Description</label>
                  <div className="input-group">
                    <input
                      className="form-control"
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
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="imgURL">Image URL</label>
                  <div className="input-group">
                    <input
                      className="form-control"
                      type="text"
                      placeholder={product.imgURL}
                      value={updateState.imgURL}
                      onChange={(event) =>
                        setUpdateState({
                          ...updateState,
                          imgURL: event.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <button className="btn btn-secondary" type="submit">
                  Update Product
                </button>

                <button
                  className="btn btn-secondary"
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
            </div>
          </div>
        ) : (
          <h5>Sorry, we couldn't find what you were looking for.</h5>
        )}
      </div>
    </>
  );
};

export default EditProduct;
