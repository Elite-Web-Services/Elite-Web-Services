import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../axios-services";
import useAuth from "../hooks/useAuth";

const AllUsers = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, token, allUsers, setAllUsers } = useAuth();

  useEffect(() => {
    if (!user.isAdmin) {
      setIsError(true);
      setErrorMessage("YOU ARE NOT AUTHORIZED");
    } else {
      setIsError(false);
    }
  }, [user]);

  return (
    <div className="usersContainer">
      {isError ? <h1 style={{ color: "red" }}>{errorMessage}</h1> : null}
      {allUsers ? (
        <div className="list-group mx-0">
          {allUsers.map((user, i) => {
            return (
              <div className="list-group-item d-flex gap-2">
                <label
                  key={`allusers:${i}`}
                  className="list-group-item d-flex gap-2"
                >
                  <input
                    className="form-check-input flex-shrink-0"
                    type="checkbox"
                  ></input>
                  <div>
                    <span className="d-block text-muted">{user.username}</span>
                    <small>{`Admin: ${user.isAdmin}`}</small>
                    <small>See order history</small>
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default AllUsers;
