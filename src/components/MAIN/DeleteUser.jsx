import React from "react";
import useAuth from "../hooks/useAuth";
import { deleteUser } from "../../axios-services";

const DeleteUser = ({ user }) => {
  const { token } = useAuth();

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    const response = await deleteUser(user.id, token);
    console.log("USER ID FOR DELETION", user.id);
  };

  return (
    <div>
      <form onSubmit={handleDeleteUser}>
        <button type="submit">Delete User</button>
      </form>
    </div>
  );
};

export default DeleteUser;