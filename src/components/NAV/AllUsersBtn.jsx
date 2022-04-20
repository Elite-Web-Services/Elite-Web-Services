import React from 'react';
import { Link } from 'react-router-dom';

const AllUsersBtn = () => {
  return (
    <div>
      <Link to="/users">
        <button>All Users</button>
      </Link>
    </div>
  );
};

export default AllUsersBtn;
