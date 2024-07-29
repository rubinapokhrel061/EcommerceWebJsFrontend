import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../Components/layout/Layout";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    answer: "",
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
      const res = await axios.post("http://localhost:5000/auth/register", {
        name: userData.name,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        address: userData.address,
        answer: userData.answer,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.success);
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
      <div>
        <div className="flex flex-col  items-center justify-center px-6 py-8 pb-10 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-blue-50 rounded-lg shadow shadow-green-700  md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
              <h1 className="text-xl font-bold leading-tight tracking-tight  text-pink-700 md:text-2xl ">
                Create an account
              </h1>
              <form className="space-y-2 md:space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your name"
                  required
                />

                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  className="border border-[#4ADE80]  outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your email"
                  required
                />

                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="border border-[#4ADE80]  outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  required
                />

                <input
                  type="number"
                  name="phone"
                  id="phone"
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  className=" border border-[#4ADE80]  outline-none text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                  required
                />

                <input
                  type="text"
                  name="address"
                  id="address"
                  onChange={handleChange}
                  className="border border-[#4ADE80]  outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your current address"
                  required
                />
                <input
                  type="text"
                  name="answer"
                  id="answer"
                  onChange={handleChange}
                  className="border border-[#4ADE80]  outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter Secret Key"
                  required
                />
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-[#6e77ea] rounded bg-gray-50 focus:ring-3 "
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="terms" className="font-light  ">
                      I accept the terms and conditions
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#4c57f8] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Create an account
                </button>
                <p className="text-sm font-light  ">
                  Already have an account?
                  <Link
                    to="/login"
                    className="font-medium text-[#4c57f8] hover:underline "
                  >
                    Login here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
