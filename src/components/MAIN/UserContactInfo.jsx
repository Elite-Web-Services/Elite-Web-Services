import React from 'react';
import useAuth from '../hooks/useAuth';

const UserContactInfo = ({ user }) => {
  return (
    <div>
      <div>
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
    </div>
  );
};

export default UserContactInfo;
