import React, { useState } from "react";

import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../Components/layout/Layout";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: "",
    answer: "",
    newPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://digitalshop-n2jx.onrender.com/auth/forgot-password",
        {
          email: userData.email,
          answer: userData.answer,
          newPassword: userData.newPassword,
        }
      );
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <div className="flex flex-col  items-center justify-center px-6 py-8 pb-10 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow shadow-zinc-700  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  text-gray-900 md:text-2xl ">
              Reset Password
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                className="border border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                placeholder="Enter your email"
                required
              />
              <input
                type="text"
                name="answer"
                id="answer"
                placeholder="Enter your Secret Key"
                onChange={handleChange}
                className="border border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                required
              />
              <input
                type="Password"
                name="newPassword"
                id="newPassword"
                placeholder="Enter your new Password"
                onChange={handleChange}
                className="border border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                required
              />
              <button
                type="submit"
                className="w-full bg-[#4c57f8] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
