import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useProduct from '../hooks/useProduct';
import { getAllTypes, updateType, deleteType } from '../../axios-services';
import { toast } from 'react-toastify';

const UpdateType = () => {
  const { token } = useAuth();
  const { types, setTypes } = useProduct();

  const [updateId, setUpdateId] = useState(1);
  const [updateName, setUpdateName] = useState('');

  const [updateError, setUpdateError] = useState('');

  const [deleteError, setDeleteError] = useState('');

  const successToast = (message) => {
    toast.success(message, { theme: 'colored' });
  };
  const failureToast = (error) => {
    toast.error(error, { theme: 'colored' });
  };

  const handleUpdateType = async () => {
    const result = await updateType(updateId, updateName, token);

    if (result.name === 'error') {
      setUpdateError(result.message);
      failureToast('Unable to update category');
    } else {
      setUpdateError('');

      const newTypes = await getAllTypes();
      setTypes(newTypes);
      successToast('Successfully updated category');
    }
  };

  const handleDeleteType = async () => {
    const result = await deleteType(updateId, token);

    if (result.name === 'error') {
      setDeleteError(result.message);
      failureToast('Unable to delete category');
    } else {
      setDeleteError('');

      const newTypes = await getAllTypes();
      setTypes(newTypes);
      successToast('Successfully deleted category');
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
      <div
        className="row"
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className="col-md-5 mb-3" style={{ display: 'flex' }}>
          <select
            style={{ padding: '.5rem', width: '100%' }}
            name="category"
            id="category-select"
            value={updateId}
            onChange={(e) => {
              setUpdateId(e.target.value);
            }}
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
        <div className="col-md-5 mb-3" style={{ display: 'flex' }}>
          <input
            style={{ padding: '.5rem', width: '100%' }}
            type="text"
            placeholder="New Name"
            value={updateName}
            onChange={(event) => setUpdateName(event.target.value)}
            required
          />
        </div>
      </div>
      {updateError ? (
        <p style={{ color: 'red' }}>Unable to update:{updateError}</p>
      ) : null}
      {deleteError ? (
        <p style={{ color: 'red' }}>
          Unable to delete: Cannot delete this category while there are products
          listed under it.
        </p>
      ) : null}
      <div
        className="d-flex justify-content-between align-items-center"
        style={{ margin: '1rem' }}
      >
        <button className="btn btn-info" type="submit">
          Update Category
        </button>
        <button
          className="btn btn-danger"
          onClick={async (event) => {
            event.preventDefault();
            handleDeleteType();
          }}
        >
          Delete Category
        </button>
      </div>
    </form>
  );
};

export default UpdateType;
