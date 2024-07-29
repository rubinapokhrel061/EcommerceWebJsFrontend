import React from "react";
import UserMenu from "../../Components/layout/UserMenu";
import Layout from "../../Components/layout/Layout";

const Order = () => {
  return (
    <Layout>
      <div className="flex flex-col md:flex md:flex-row md:justify-center gap-10 p-3 min-h-screen w-[90%]  mx-auto">
        <div className="w-[40%]">
          <UserMenu />
        </div>
        <div className="w-[100%] mt-10">All product</div>
      </div>
    </Layout>
  );
};

export default Order;
