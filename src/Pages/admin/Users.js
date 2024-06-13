import React from "react";
import AdminMenu from "../../Components/layout/AdminMenu";
import Layout from "../../Components/layout/Layout";

const Users = () => {
  return (
    <Layout>
      <div className="flex gap-10 p-3 w-[90%] mx-auto">
        <div className="w-[40%]">
          <AdminMenu />
        </div>
        <div>user</div>
      </div>
    </Layout>
  );
};

export default Users;
