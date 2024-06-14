import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../Hooks/UseCategory";

const Nav = () => {
  const [auth, setauth] = useAuth();
  const [display, setDisplay] = useState("none");
  const [show, setShow] = useState(false);
  const categories = useCategory();
  console.log(categories);
  const handledisplay = () => {
    setDisplay((prevDisplay) => (prevDisplay === "none" ? "block" : "none"));
    setShow(true);
  };
  const handleAdmin = () => {
    setShow(true);

    setDisplay((preDisplay) => (preDisplay === "none" ? "inline" : "none"));
  };
  // console.log(showAdmin)
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
              <div className="relative inline-block text-left">
                <button
                  id="dropdownDelayButton"
                  className="text-white    w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={handledisplay}
                >
                  <h1>CATEGORY</h1>
                  <svg
                    className="w-2.5 h-2.5 ms-3"
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
                </button>
                {/* Dropdown menu */}
                <div
                  id="dropdownDelay"
                  style={{ display }}
                  className=" absolute right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDelayButton"
                  >
                    <li>
                      <Link
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        to={"/categories"}
                      >
                        All Categories
                      </Link>
                    </li>
                    {categories?.map((c) => (
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          to={`/category/${c.slug}`}
                        >
                          {c.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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
                {/* <div
                  className="text-white    w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  onClick={handleAdmin}
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
                  style={{ showAdmin }}
                  id="dropdown"
                  className=" absolute right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
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
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        DASHBOARD
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={handleClick}
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        LOGOUT
                      </Link>
                    </li>
                  </ul>
                </div> */}

                <div className="relative inline-block text-left">
                  <button
                    id="dropdownDelayButton"
                    className="text-white    w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button"
                    onClick={handleAdmin}
                  >
                    <h1> {auth?.user?.name}</h1>
                    <svg
                      className="w-2.5 h-2.5 ms-3"
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
                  </button>
                  {/* Dropdown menu */}
                  <div
                    id="dropdownDelay"
                    style={{ display }}
                    className={`absolute right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
                  >
                    <ul
                      className="py-2 text-sm text-gray-700 dark:text-gray-200"
                      aria-labelledby="dropdownDelayButton"
                    >
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          DASHBOARD
                        </Link>
                      </li>

                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          to="/login"
                          onClick={handleClick}
                        >
                          LOGOUT
                        </Link>
                      </li>
                    </ul>
                  </div>
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
