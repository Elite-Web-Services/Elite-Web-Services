import React from 'react';
import useContact from '../hooks/useContact';
import useAuth from '../hooks/useAuth';
import { USAStates } from './USAStates';
import { Countries } from './Countries';

const ContactInfo = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
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
    country,
    setCountry,
  } = useContact();
  const { user } = useAuth();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleCountry = (e) => {
    setCountry(e.target.value);
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
      <div className="row g-3">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">
            First name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={firstName}
            required=""
            onChange={handleFirstName}
          />
        </div>

        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label">
            Last name
          </label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            value={lastName}
            onChange={handleLastName}
            required=""
          />
        </div>

        <div className="col-12">
          <label htmlFor="email" className="form-label">
            Email <span className="text-muted">(Optional)</span>
          </label>
          <input
            type="email"
            className="form-control"
            placeholder={`${user.username || 'you'}@example.com`}
            value={newEmail}
            onChange={handleEmail}
          />
        </div>
        <div className="col-md-5">
          <label htmlFor="country" className="form-label">
            Country
          </label>
          <select
            className="form-select"
            required=""
            value={country}
            onChange={handleCountry}
          >
            <option value="">Choose...</option>
            {Countries.map((country) => {
              return <option key={country.abbreviation}>{country.name}</option>;
            })}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="1234 Main St"
            required=""
            value={newAddress}
            onChange={handleAddress}
          />
        </div>

        <div className="col-12">
          <label htmlFor="address2" className="form-label">
            Address 2 <span className="text-muted">(Optional)</span>
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Apartment or suite"
            value={newAddress2}
            onChange={handleAddress2}
          />
        </div>

        <div className="col-12">
          <label htmlFor="address" className="form-label">
            City
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="1234 Main St"
            required=""
            value={newCity}
            onChange={handleCity}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="state" className="form-label">
            State
          </label>
          <select
            className="form-select"
            required=""
            value={newState}
            onChange={handleState}
          >
            <option value="">Choose...</option>
            {USAStates.map((state) => {
              return <option key={state.abbreviation}>{state.name}</option>;
            })}
          </select>
        </div>

        <div className="col-md-3">
          <label htmlFor="zip" className="form-label">
            Zip Code
          </label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            required=""
            value={newZip}
            onChange={handleZip}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
