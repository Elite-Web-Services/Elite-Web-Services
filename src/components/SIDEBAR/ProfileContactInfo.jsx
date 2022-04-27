import React from "react";
import useContact from "../hooks/useContact";
import useAuth from "../hooks/useAuth";
import { USAStates } from "./USAStates";

const ProfileContactInfo = () => {
  const {
    addContact,
    contact,
    setContact,
    newEmail,
    setNewEmail,
    newAddress,
    setNewAddress,
    newAddress2,
    setNewAddress2,
    newCity,
    setNewCity,
    newState,
    setNewState,
    newZip,
    setNewZip,
  } = useContact();
  const { user } = useAuth();

  const handleAddressStored = async (e) => {
    e.preventDefault();
    await addContact();
  };

  const handleEmail = (e) => {
    setNewEmail(e.target.value);
  };
  const handleAddress = (e) => {
    setNewAddress(e.target.value);
  };
  const handleAddress2 = (e) => {
    setNewAddress2(e.target.value);
  };
  const handleCity = (e) => {
    setNewCity(e.target.value);
  };
  const handleState = (e) => {
    setNewState(e.target.value);
  };
  const handleZip = (e) => {
    setNewZip(e.target.value);
  };

  return (
    <div>
      <div>
        <h1> Update Email and Address below</h1>

        <div className="Current-contact-info">
          <h4>CURRENT CONTACT INFORMATION</h4>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Address2: {user.address2}</p>
          <p>City: {user.city}</p>
          <p>State: {user.state}</p>
          <p>Zip: {user.zip}</p>
        </div>
      </div>

      <form className="row g-3" onSubmit={handleAddressStored}>
        <div className="col-md-7">
          <label htmlFor="inputEmail4" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            value={newEmail}
            onChange={handleEmail}
          />
        </div>
        {/* <div className="col-md-6">
          <label htmlFor="inputPassword4" className="form-label">
            Password
          </label>
          <input type="password" className="form-contro" id="inputPassword4" />
        </div> */}
        <div className="col-7">
          <label htmlFor="inputAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            value={newAddress}
            onChange={handleAddress}
          />
        </div>
        <div className="col-7">
          <label htmlFor="inputAddress2" className="form-label">
            Address 2
          </label>
          <input
            type="text"
            className="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            value={newAddress2}
            onChange={handleAddress2}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="inputCity" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            id="inputCity"
            value={newCity}
            onChange={handleCity}
          />
        </div>
        <div className="col-md-3">
          <label htmlFor="inputState" className="form-label">
            State
          </label>

          <select
            id="inputState"
            className="form-select"
            value={newState}
            onChange={handleState}
          >
            <option selected>Choose...</option>
            {USAStates.map((state) => {
              return <option key={state.abbreviation}>{state.name}</option>;
            })}
          </select>
        </div>
        <div className="col-md-2">
          <label htmlFor="inputZip" className="form-label">
            Zip
          </label>
          <input
            type="text"
            className="form-control"
            id="inputZip"
            value={newZip}
            onChange={handleZip}
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Save Contact Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileContactInfo;
