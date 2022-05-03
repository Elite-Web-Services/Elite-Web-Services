import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useProduct from '../hooks/useProduct';
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
} from '../../axios-services';
import { toast } from 'react-toastify';

const EditProduct = ({ product }) => {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { setProducts, types } = useProduct();

  const [updateState, setUpdateState] = useState({
    typeId: product.typeId,
    typeName: product.typeName,
    name: product.name,
    description: product.description,
    fullDescription: product.fullDescription,
    price: product.price,
    isPublic: product.isPublic,
    imgURL: product.imgURL,
  });

  const [updateError, setUpdateError] = useState('');
  const successToast = (message) => {
    toast.success(message, { theme: 'colored' });
  };
  const failureToast = (error) => {
    toast.error(error, { theme: 'colored' });
  };

  const handleUpdateProduct = async () => {
    const result = await updateProduct(
      product.id,
      token,
      updateState.typeId,
      updateState.name,
      updateState.description,
      updateState.fullDescription,
      updateState.price,
      updateState.isPublic,
      updateState.imgURL
    );

    if (result.name == 'error') {
      setUpdateError(result.message);
      failureToast('Unable to update product');
    } else {
      setUpdateError('');

      const newProducts = await getAllProducts(token);
      setProducts(newProducts);
      successToast('Product updated!');
      navigate('/manageproducts');
    }
  };

  const handleDeleteProduct = async () => {
    const result = await deleteProduct(product.id, token);

    if (result.name == 'error') {
      setUpdateError(result.message);
      failureToast('Unable to delete product');
    } else {
      setUpdateError('');

      const newProducts = await getAllProducts(token);
      setProducts(newProducts);
      successToast('Product deleted');
      navigate('/manageproducts');
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
        style={{ margin: '2rem 3rem 0 3rem' }}
      >
        {product ? (
          <div className="card-body">
            <div style={{ margin: '2rem 12.5rem 5rem 12.5rem' }}>
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'block',
                }}
                alt="Thumbnail [100%x225]"
                src={product.imgURL}
              />
            </div>
            <form
              className="needs-validation"
              onSubmit={async (event) => {
                event.preventDefault();
                handleUpdateProduct();
              }}
            >
              {/* Start inputs here */}
              <div
                className="row"
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <div className="col-md-5 mb-3">
                  <select
                    style={{ padding: '.5rem', width: '100%' }}
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
                  {/* sets isPublic to either true or false */}
                </div>
                <div className="col-md-5 mb-3">
                  <select
                    style={{ padding: '.5rem', width: '100%' }}
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
                        <option key={'typeList:' + type.id} value={type.id}>
                          {type.name}
                        </option>
                      );
                    })}
                    {/* map over the types, return an <option /> */}
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
                <label htmlFor="fullDescription">Full Description</label>
                <div className="input-group">
                  <textarea
                    className="form-control"
                    style={{ height: '10rem' }}
                    type="text"
                    placeholder={product.fullDescription}
                    value={updateState.fullDescription}
                    onChange={(event) =>
                      setUpdateState({
                        ...updateState,
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
                    placeholder={product.imgURL}
                    value={updateState.imgURL ? updateState.imgURL : ''}
                    onChange={(event) =>
                      setUpdateState({
                        ...updateState,
                        imgURL: event.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="col-md-5 mb-3">
                <label htmlFor="price">Price</label>
                <input
                  className="form-control"
                  style={{ width: '50%' }}
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
              {updateError ? <h5>Unable to edit: {updateError}</h5> : null}
              <div
                className="d-flex justify-content-between align-items-center"
                style={{ margin: '1rem' }}
              >
                <button className="btn btn-info" type="submit">
                  Update Product
                </button>
                <button
                  className="btn btn-danger"
                  onClick={async (event) => {
                    event.preventDefault();
                    await handleDeleteProduct();
                  }}
                >
                  Delete Product
                </button>
              </div>
            </form>
          </div>
        ) : (
          <h5>Sorry, we couldn't find what you were looking for.</h5>
        )}
      </div>
    </>
  );
};

export default EditProduct;
