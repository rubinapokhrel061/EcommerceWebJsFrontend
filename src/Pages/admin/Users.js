import React from "react";
import AdminMenu from "../../Components/layout/AdminMenu";
import Layout from "../../Components/layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex md:flex-row md:justify-center gap-10  p-3 w-[90%] min-h-screen mx-auto">
        <div className="w-full md:w-[40%]">
          <AdminMenu />
        </div>
        <div className="my-10 w-[100%] border rounded border-gray-200 p-4">
          user
        </div>
      </div>
    </Layout>
  );
};

export default Users;
