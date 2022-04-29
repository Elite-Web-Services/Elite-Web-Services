import React from "react";
import useContact from "../hooks/useContact";
import useAuth from "../hooks/useAuth";
import ContactInfo from "./ContactInfo";
import { getMe } from "../../axios-services";
import { toast, Zoom, Bounce } from "react-toastify";

const ProfileContactInfo = () => {
  const { addContact } = useContact();
  const { user, setUser, token } = useAuth();

  const successToast = (e) => {
    toast.success("CONTACTS SAVED!", {});
  };

  const handleAddressStored = async (e) => {
    e.preventDefault();
    await addContact();
    successToast();
    const response = await getMe(token);
    setUser(response);
  };

  return (
    <div>
      <div>
        <h1> Update Profile below</h1>

        <div className="Current-contact-info">
          <h4>CURRENT CONTACT INFORMATION</h4>
          <p>Username: {user.username}</p>
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Country: {user.country}</p>
          <p>Email: {user.email}</p>
          <p>Address: {user.address}</p>
          <p>Address2: {user.address2}</p>
          <p>City: {user.city}</p>
          <p>State: {user.state}</p>
          <p>Zip: {user.zip}</p>
        </div>
      </div>

      <form className="row g-3" onSubmit={handleAddressStored}>
        <div className="col-12">
          <ContactInfo />
          <button
            type="submit"
            className="btn btn-primary"
            style={{ margin: 10 }}
          >
            Save Contact Information
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileContactInfo;
