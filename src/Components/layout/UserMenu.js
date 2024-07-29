import React from "react";
import { Link } from "react-router-dom";

const UserMenu = () => {
  return (
    <>
      <div className="text-center  mt-10">
        <div className="w-[100%] text-gray-900 bg-white p-4 rounded-md ">
          <h1 className="text-xl font-semibold pb-5">Dashboard</h1>
          <Link
            to="/dashboard/user/profile"
            className="relative inline-flex items-center w-full px-4 py-2 mb-4 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-500 focus:bg-gray-200 focus:text-blue-700"
          >
            Profile
          </Link>
          <Link
            to="/dashboard/user/orders"
            className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-500 focus:bg-gray-200 focus:text-blue-700"
          >
            Orders
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
