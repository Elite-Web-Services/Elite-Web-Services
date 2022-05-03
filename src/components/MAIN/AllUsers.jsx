import React, { Fragment, useEffect, useState } from 'react';
import { getAllUsers, getOrderHistory } from '../../axios-services';
import useAuth from '../hooks/useAuth';
import ProfileOrderHistory from '../SIDEBAR/ProfileOrderHistory';
import { deleteUser, getUserByUsername } from '../../axios-services';
import { toast } from 'react-toastify';
import UserContactInfo from './UserContactInfo';

const AllUsers = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { user, token, allUsers, setAllUsers } = useAuth();
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [userContactInfo, setUserContactInfo] = useState({});

  const successToast = (e) => {
    toast.success('User Deletion Successful', { theme: 'colored' });
  };
  const failureToast = (e) => {
    toast.error('Could Not Delete User', { theme: 'colored' });
  };

  useEffect(() => {
    if (!user.isAdmin) {
      setIsError(true);
      setErrorMessage('YOU ARE NOT AUTHORIZED');
    } else {
      setIsError(false);
    }
  }, [user]);

  const handleSeeHistory = async (userId) => {
    try {
      const orderHistory = await getOrderHistory(token, userId);
      setUserContactInfo([]);
      setUserOrderHistory(orderHistory);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSeeContact = async (username) => {
    try {
      const contact = await getUserByUsername(token, username);
      setUserContactInfo(contact);
      setUserOrderHistory({});
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteUser = async (_user) => {
    try {
      await deleteUser(_user.id, token);
      const updatedAllUsers = await getAllUsers(token);
      setAllUsers(updatedAllUsers);
      successToast();
    } catch (error) {
      failureToast();
    }
  };

  return (
    <Fragment>
      <div className="table-responsive">
        {isError ? <h1 style={{ color: 'red' }}>{errorMessage}</h1> : null}
        {allUsers ? (
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">username</th>
                <th scope="col">access</th>
                <th scope="col">orders</th>
                <th scope="col">contact info</th>
                <th scope="col">delete</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((_user, i) => {
                if (_user.id === user.id) return null;
                return (
                  <tr key={`allusersTable:${i}`}>
                    {/* <td>
                      <input
                        className="form-check-input flex-shrink-0"
                        type="checkbox"
                        value={user.id}
                        onChange={handleSelect}
                      ></input>
                    </td> */}
                    <td>{_user.id}</td>
                    <td>{_user.username}</td>
                    <td>{_user.isAdmin ? 'Admin' : 'User'}</td>
                    <td>
                      <div
                        className="nav-link usersLink"
                        onClick={() => handleSeeHistory(_user.id)}
                      >
                        Order History
                      </div>
                    </td>
                    <td>
                      <div
                        className="nav-link usersLink"
                        onClick={() => handleSeeContact(_user.username)}
                      >
                        Contact Information
                      </div>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteUser(_user);
                        }}
                      >
                        Delete user
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
      <div>
        {userOrderHistory.length > 0 ? (
          <ProfileOrderHistory userOrderHistory={userOrderHistory} />
        ) : null}
        {userContactInfo.id ? <UserContactInfo user={userContactInfo} /> : null}
      </div>
    </Fragment>
  );
};

export default AllUsers;
