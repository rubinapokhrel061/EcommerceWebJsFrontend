import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";

const Nav = () => {
  const [auth, setauth] = useAuth();
  const [display, setDisplay] = useState("none");

  const handledisplay = () => {
    setDisplay((prevDisplay) => (prevDisplay === "none" ? "block" : "none"));
  };
  const handleClick = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };
  return (
    <>
      <div className="m-0  bg-[#D1D1c7] flex justify-between py-4 px-10 mx-auto">
        <div className="">
          <h3>🛒 ECOMMERCE APP</h3>
        </div>

        <div>
          <ul className="flex  w-[50%] gap-12 ">
            <SearchInput />
            <li>
              <Link
                to="/"
                className="focus:boder focus:border-b-2 focus:border-black"
              >
                HOME
              </Link>
            </li>
            <li>
              <Link
                to="/category"
                className="focus:boder focus:border-b-2 focus:border-black"
              >
                CATEGORY
              </Link>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <Link
                    to="/register"
                    className="focus:boder focus:border-b-2 focus:border-black"
                  >
                    REGISTER
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="focus:boder focus:border-b-2 focus:border-black"
                  >
                    LOGIN
                  </Link>
                </li>
              </>
            ) : (
              <>
                <div
                  className="flex bg-blue-700 text-white items-center hover:bg-blue-800 px-5 py-1"
                  onClick={handledisplay}
                >
                  <h5
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                  >
                    {auth?.user?.name}
                  </h5>
                  <svg
                    className="w-2.5 h-2.5 ms-3 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </div>
                <div
                  style={{ display }}
                  id="dropdown"
                  className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        to={`/dashboard/${
                          auth?.user?.role === 1 ? "admin" : "user"
                        }`}
                        className="focus:boder focus:border-b-2 focus:border-black"
                      >
                        DASHBOARD
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={handleClick}
                        className="focus:boder focus:border-b-2 focus:border-black"
                      >
                        LOGOUT
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            )}
            <li>
              <Link
                to="/cart"
                className="focus:boder focus:border-b-2 focus:border-black"
              >
                CART
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
