import React, { Fragment, useEffect, useState } from "react";
import { getAllUsers, getOrderHistory } from "../../axios-services";
import useAuth from "../hooks/useAuth";
import ProfileOrderHistory from "../SIDEBAR/ProfileOrderHistory";
import { deleteUser } from "../../axios-services";
import { ToastContainer, toast, Zoom, Bounce } from "react-toastify";

const AllUsers = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, token, allUsers, setAllUsers } = useAuth();
  const [userOrderHistory, setUserOrderHistory] = useState([]);

  const successToast = (e) => {
    toast.success("User Deletion Successful", { theme: "colored" });
  };

  useEffect(() => {
    if (!user.isAdmin) {
      setIsError(true);
      setErrorMessage("YOU ARE NOT AUTHORIZED");
    } else {
      setIsError(false);
    }
  }, [user]);

  const handleSeeHistory = async (userId) => {
    const orderHistory = await getOrderHistory(token, userId);
    setUserOrderHistory(orderHistory);
  };

  const handleDeleteUser = async (_user) => {
    const response = await deleteUser(_user.id, token);
    successToast();
    console.log("USER ID FOR DELETION", _user.id);
  };

  return (
    <Fragment>
      <div className="table-responsive">
        {isError ? <h1 style={{ color: "red" }}>{errorMessage}</h1> : null}
        {allUsers ? (
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">check</th>
                <th scope="col">id</th>
                <th scope="col">username</th>
                <th scope="col">permissions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((_user, i) => {
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
                    <td>{_user.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <div
                        className="nav-link"
                        onClick={() => handleSeeHistory(_user.id)}
                      >
                        See order history
                      </div>
                    </td>
                    <td>
                      <button
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
      </div>
    </Fragment>
  );
};

export default AllUsers;
