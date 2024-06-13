import React from "react";
import Layout from "../../Components/layout/Layout";
import AdminMenu from "../../Components/layout/AdminMenu";
import { useAuth } from "../../Context/Auth";

const AdminDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="flex gap-10 p-3 w-[90%] mx-auto">
        <div className="w-[40%]">
          <AdminMenu />
        </div>
        <div className="mt-16 border rounded border-gray-200">
          <h3 className=" relative inline-flex items-center w-[90%] px-4 py-2 text-sm font-medium ">
            Admin Name : {auth?.user?.name}
          </h3>
          <h3 className=" relative inline-flex items-center w-[90%] px-4 py-2 text-sm font-medium ">
            Admin Email : {auth?.user?.email}
          </h3>
          <h3 className=" relative inline-flex items-center w-[90%] px-4 py-2 text-sm font-medium ">
            Admin Contact : {auth?.user?.phone}
          </h3>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
