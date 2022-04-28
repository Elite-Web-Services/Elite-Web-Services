import React from "react";
import useAuth from "../hooks/useAuth";
import { deleteUser } from "../../axios-services";

const DeleteUser = () => {
  const { token, user, setUser } = useAuth();

  const handleDeleteUser = async () => {
    const response = await deleteUser(user.id, token);
  };

  return (
    <div>
      <form onSubmit={handleDeleteUser}></form>
      <button type="submit">Delete User</button>
    </div>
  );
};

export default DeleteUser;
