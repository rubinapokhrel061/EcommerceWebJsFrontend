import React from "react";
import UserMenu from "../../Components/layout/UserMenu";
import Layout from "../../Components/layout/Layout";

const Order = () => {
  return (
    <Layout>
      <div className="flex gap-10 p-3 w-[90%] mx-auto">
        <div className="w-[40%]">
          <UserMenu />
        </div>
        <div>all product</div>
      </div>
    </Layout>
  );
};

export default Order;
