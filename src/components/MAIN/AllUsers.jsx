import React, { Fragment, useEffect, useState } from "react";
import { getAllUsers, getOrderHistory } from "../../axios-services";
import useAuth from "../hooks/useAuth";
import ProfileOrderHistory from "../SIDEBAR/ProfileOrderHistory";
import DeleteUser from "./DeleteUser";
import { deleteUser } from "../../axios-services";

const AllUsers = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, token, allUsers, setAllUsers } = useAuth();
  const [userOrderHistory, setUserOrderHistory] = useState([]);
  const [selected, setSelected] = useState(false);

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

  const handleSelect = async () => {};

  const handleDeleteUser = async (userId) => {
    const response = await deleteUser(userId, token);
    console.log("DELETE USER: ", userId);

    setSelected(true);
  };

  return (
    <Fragment>
      <div className="table-responsive">
        {isError ? <h1 style={{ color: "red" }}>{errorMessage}</h1> : null}
        {allUsers ? (
          <div className="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">check</th>
                <th scope="col">id</th>
                <th scope="col">username</th>
                <th scope="col">permissions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user, i) => {
                return (
                  <tr key={`allusersTable:${i}`}>
                    <td>
                      <input
                        className="form-check-input flex-shrink-0"
                        type="checkbox"
                        value={user.id}
                        onChange={handleDeleteUser}
                      ></input>
                    </td>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.isAdmin ? "Admin" : "User"}</td>
                    <td>
                      <div
                        className="nav-link"
                        onClick={() => handleSeeHistory(user.id)}
                      >
                        See order history
                      </div>
                    </td>
                    <td>
                      <div>{selected && user.id ? <DeleteUser /> : null}</div>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </div>
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
