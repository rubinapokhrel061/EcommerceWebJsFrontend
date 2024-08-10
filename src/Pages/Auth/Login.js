import React, { useState } from "react";
// import Layout from "../Component/Layout";
import { Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../../Components/layout/Layout";
import { useAuth } from "../../Context/Auth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation;
  const [auth, setAuth] = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
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
        "https://digitalshop-n2jx.onrender.com/auth/login",
        {
          email: userData.email,
          password: userData.password,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
        console.log(location.state);
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
        <div className="w-full bg-blue-50 rounded-lg shadow shadow-green-700  md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
            <h1 className="text-xl font-bold leading-tight tracking-tight  text-pink-700 md:text-2xl ">
              login account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleChange}
                className="border border-[#4ADE80]  outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                placeholder="Enter your email"
                required
              />
              <div className="space-y-2">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="border border-[#4ADE80]  outline-none text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  required
                />
                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>
              <div className="flex justify-between mr-5">
                <div className="flex ">
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
                      Rememder me
                    </label>
                  </div>
                </div>
                <Link
                  to="/register"
                  className="font-medium text-[#4c57f8] hover:underline "
                >
                  Register
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-[#4c57f8] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
