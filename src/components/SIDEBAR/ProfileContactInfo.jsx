import React, { useState } from "react";
import { addContact, getMe } from "../../axios-services";
import useAuth from "../hooks/useAuth";

const ProfileContactInfo = () => {
  const { token, user } = useAuth();
  const theUser = user.id;
  const [newEmail, setNewEmail] = useState(user.email);
  const [newAddress, setNewAddress] = useState(user.address);
  const [newAddress2, setNewAddress2] = useState(user.address2);
  const [newCity, setNewCity] = useState(user.city);
  const [newZip, setNewZip] = useState(user.zip);

  const handleAddressStored = async (e) => {
    e.preventDefault();
    const response = await addContact(
      token,
      newEmail,
      theUser,
      newAddress,
      newAddress2,
      newCity,
      newZip
    );
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
  const handleZip = (e) => {
    setNewZip(e.target.value);
  };

  return (
    <div>
      <div>
        <h1> bye!</h1>
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
          <input type="password" className="form-control" id="inputPassword4" />
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
        <div className="col-md-4">
          <label htmlFor="inputState" className="form-label">
            State
          </label>

          <select id="inputState" className="form-select">
            <option selected>Choose...</option>
            <option>...</option>
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
