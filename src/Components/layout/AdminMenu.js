import React from "react";
import { Link } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center mt-10">
        <div className="w-48 text-gray-900  bg-white  ">
          <h1 className="text-xl font-semibold pb-5">Admin panel</h1>
          <div className="flex flex-col gap-7 ">
            <Link
              to="/dashboard/admin/create-category"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-500 active:bg-gray-200 active:text-blue-700"
            >
              Create Category
            </Link>
            <Link
              to="/dashboard/admin/create-product"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-500 active:bg-gray-200 active:text-blue-700"
            >
              Create product
            </Link>
            <Link
              to="/dashboard/admin/products"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-500 active:bg-gray-200 active:text-blue-700"
            >
              Products
            </Link>
            <Link
              to="/dashboard/admin/users"
              className="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-500 active:bg-gray-200 active:text-blue-700"
            >
              Users
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
