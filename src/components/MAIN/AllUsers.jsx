import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../axios-services';
import useAuth from '../hooks/useAuth';

const AllUsers = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, token, allUsers, setAllUsers } = useAuth();

  useEffect(() => {
    // change to user.isAdmin
    if (!user.username) {
      setIsError(true);
      setErrorMessage('YOU ARE NOT AUTHORIZED');
    } else {
      setIsError(false);
    }
  }, [user]);

  return (
    <div>
      <h1>Hello</h1>
      {isError ? <h1 style={{ color: 'red' }}>{errorMessage}</h1> : null}
      {allUsers ? (
        <div className="allUsersContainer">
          {allUsers.map((user, i) => {
            return <div key={`allusers:${i}`}>{user.username}</div>;
          })}
        </div>
      ) : null}
    </div>
  );
};

export default AllUsers;
