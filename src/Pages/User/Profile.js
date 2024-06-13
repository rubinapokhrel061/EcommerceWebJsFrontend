import React from "react";
import UserMenu from "../../Components/layout/UserMenu";
import Layout from "../../Components/layout/Layout";

const Profile = () => {
  return (
    <Layout>
      <div className="flex gap-10 p-3 w-[90%] mx-auto">
        <div className="w-[40%]">
          <UserMenu />
        </div>
        <div>profile</div>
      </div>
    </Layout>
  );
};

export default Profile;
