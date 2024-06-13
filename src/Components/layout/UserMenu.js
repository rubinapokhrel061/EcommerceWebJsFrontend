import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center mt-10">
        <div className="w-48 text-gray-900 bg-white  ">
          <h1 className="text-xl font-semibold pb-5">Dashboard</h1>
          <Link
            to="/dashboard/user/profile"
            className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-500 active:bg-gray-200 active:text-blue-700"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-500 active:bg-gray-200 active:text-blue-700"
          >
            Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
