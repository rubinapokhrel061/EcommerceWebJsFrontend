import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/layout/UserMenu";
import Layout from "../../Components/layout/Layout";

import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../Context/Auth";
import { backendUrl } from "../config";

const Profile = () => {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  //get user data
  useEffect(() => {
    const { email, name, phone, address } = auth.user;
    setName(name);
    setPhone(phone);
    setEmail(email);
    setAddress(address);
  }, []);
  console.log(address);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.put(`${backendUrl}/auth/profile`, {
        name,
        email,
        password,
        phone,
        address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setAuth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  console.log(password);
  return (
    <Layout>
      <div className="flex gap-10 p-3 w-[90%] mx-auto">
        <div className="w-[40%]">
          <UserMenu />
        </div>
        <div>
          <div className="flex flex-col  items-center justify-center px-6 py-8 pb-10 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow shadow-zinc-700  md:mt-0 sm:max-w-md xl:p-0 ">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8 ">
                <h1 className="text-xl font-bold leading-tight tracking-tight  text-gray-900 md:text-2xl ">
                  Create an account
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="name"
                    value={name}
                    id="name"
                    onChange={(e) => setName(e.target.value)}
                    className="border border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    placeholder="Enter your name"
                    required
                  />

                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    placeholder="Enter your email"
                    required
                    disabled
                  />

                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="border border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  />

                  <input
                    type="number"
                    name="phone"
                    id="phone"
                    value={phone}
                    placeholder="Enter your phone number"
                    onChange={(e) => setPhone(e.target.value)}
                    className=" border border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                    required
                  />

                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="border border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    placeholder="Enter your current address"
                    required
                  />

                  <button
                    type="submit"
                    className="w-full bg-[#4c57f8] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
