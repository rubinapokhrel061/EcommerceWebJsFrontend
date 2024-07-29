// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../../Context/Auth";
// import toast from "react-hot-toast";
// import SearchInput from "../Form/SearchInput";
// import useCategory from "../../Hooks/UseCategory";
// import { useCart } from "../../Context/Cart";
// import { Badge } from "antd";

// const Nav = () => {
//   const [auth, setauth] = useAuth();
//   const [display, setDisplay] = useState("none");
//   const [show, setShow] = useState(false);
//   const categories = useCategory();
//   const [cart] = useCart();
//   console.log(categories);
//   const handledisplay = () => {
//     setDisplay((prevDisplay) => (prevDisplay === "none" ? "block" : "none"));
//     setShow(true);
//   };
//   const handleAdmin = () => {
//     setShow(true);

//     setDisplay((preDisplay) => (preDisplay === "none" ? "inline" : "none"));
//   };

//   const handleClick = () => {
//     setauth({
//       ...auth,
//       user: null,
//       token: "",
//     });
//     localStorage.removeItem("auth");
//     toast.success("Logout Successfully");
//   };
//   return (
//     <>
//       <div className="m-0 flex flex-col gap-y-6 bg-green-500 md:flex md:flex-row md:justify-between items-center py-4 px-10 mx-auto">
//         <div className="">
//           <h3 className="font-bold text-pink-700">🛒 ECOMMERCE APP</h3>
//         </div>
//         <SearchInput />
//         <div>
//           <ul className="flex text-[12px] md:text-base py-2 md:py-0 gap-3 w-[50%] items-center md:gap-12 ">
//             <li>
//               <Link
//                 to="/"
//                 className="focus:boder focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
//               >
//                 HOME
//               </Link>
//             </li>
//             <li>
//               <div className="relative inline-block text-left">
//                 <button
//                   id="dropdownDelayButton"
//                   className="text-white flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-[12px] md:text-base px-2 md:px-5 py-1 md:py-2.5 text-center  items-center "
//                   type="button"
//                   onClick={handledisplay}
//                 >
//                   <h1>CATEGORY</h1>
//                   <svg
//                     className="w-2.5 h-2.5 ms-3"
//                     aria-hidden="true"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 10 6"
//                   >
//                     <path
//                       stroke="currentColor"
//                       stroke-linecap="round"
//                       stroke-linejoin="round"
//                       stroke-width="2"
//                       d="m1 1 4 4 4-4"
//                     />
//                   </svg>
//                 </button>
//                 {/* Dropdown menu */}
//                 <div
//                   id="dropdownDelay"
//                   style={{ display }}
//                   className=" absolute right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
//                 >
//                   <ul
//                     className="py-2 text-sm text-gray-700 "
//                     aria-labelledby="dropdownDelayButton"
//                   >
//                     <li>
//                       <Link
//                         className="block px-4 py-2 hover:bg-gray-100 "
//                         to={"/categories"}
//                       >
//                         All Categories
//                       </Link>
//                     </li>
//                     {categories?.map((c) => (
//                       <li>
//                         <Link
//                           className="block px-4 py-2 hover:bg-gray-100 "
//                           to={`/category/${c.slug}`}
//                         >
//                           {c.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </li>
//             {!auth.user ? (
//               <>
//                 <li>
//                   <Link
//                     to="/register"
//                     className="focus:boder focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
//                   >
//                     REGISTER
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     to="/login"
//                     className="focus:boder focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
//                   >
//                     LOGIN
//                   </Link>
//                 </li>
//               </>
//             ) : (
//               <>

//                 <div className="relative inline-block text-left">
//                   <button
//                     id="dropdownDelayButton"
//                     className="text-white flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-[12px] md:text-base px-2 md:px-5 py-1 md:py-2.5 text-center  items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                     type="button"
//                     onClick={handleAdmin}
//                   >
//                     <h1> {auth?.user?.name}</h1>
//                     <svg
//                       className="w-2.5 h-2.5 ms-3"
//                       aria-hidden="true"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 10 6"
//                     >
//                       <path
//                         stroke="currentColor"
//                         stroke-linecap="round"
//                         stroke-linejoin="round"
//                         stroke-width="2"
//                         d="m1 1 4 4 4-4"
//                       />
//                     </svg>
//                   </button>
//                   {/* Dropdown menu */}
//                   <div
//                     id="dropdownDelay"
//                     style={{ display }}
//                     className={`absolute right-0 z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
//                   >
//                     <ul
//                       className="py-2 text-sm text-gray-700 dark:text-gray-200"
//                       aria-labelledby="dropdownDelayButton"
//                     >
//                       <li>
//                         <Link
//                           className="block px-4 py-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
//                           to={`/dashboard/${
//                             auth?.user?.role === 1 ? "admin" : "user"
//                           }`}
//                         >
//                           DASHBOARD
//                         </Link>
//                       </li>

//                       <li>
//                         <Link
//                           className="block px-4 py-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
//                           to="/login"
//                           onClick={handleClick}
//                         >
//                           LOGOUT
//                         </Link>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </>
//             )}

//             <li>
//               <Badge count={cart?.length} showZero className="p-2">
//                 <Link
//                   to="/cart"
//                   className="focus:boder focus:border-b-2 mt-1 text-[12px] md:text-base focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
//                 >
//                   CART
//                 </Link>
//               </Badge>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Nav;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/Auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../Hooks/UseCategory";
import { useCart } from "../../Context/Cart";
import { Badge } from "antd";

const Nav = () => {
  const [auth, setauth] = useAuth();
  const [categoryDropdown, setCategoryDropdown] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const categories = useCategory();
  const [cart] = useCart();

  const handleCategoryDropdown = () => {
    setCategoryDropdown((prev) => !prev);
    setUserDropdown(false); // Close user dropdown if open
  };

  const handleUserDropdown = () => {
    setUserDropdown((prev) => !prev);
    setCategoryDropdown(false); // Close category dropdown if open
  };

  const handleLogout = () => {
    setauth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
    setUserDropdown(false); // Close user dropdown after logout
  };

  return (
    <>
      <div className="m-0 flex flex-col gap-y-6 bg-green-500 md:flex md:flex-row md:justify-between md:gap-x-4 items-center py-4 px-10 mx-auto">
        <div className="">
          <h3 className="font-bold md:text-sm lg:text-lg text-pink-700">
            🛒 DIGITAL SHOP
          </h3>
        </div>
        <SearchInput />
        <div>
          <ul className="flex text-[12px] md:text-sm lg:text-base py-2 md:py-0 gap-3 w-[50%] md:w-[30%] lg-[30%] items-center md:gap-2 lg:gap-12">
            <li>
              <Link
                to="/"
                className="focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
              >
                HOME
              </Link>
            </li>
            <li>
              <div className="relative inline-block text-left">
                <button
                  id="categoryDropdownButton"
                  className="text-white flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-[12px] md:text-sm lg:text-base px-2 md:px-2 lg:px-5 py-1 lg:py-2.5 md:py-1 text-center items-center"
                  type="button"
                  onClick={handleCategoryDropdown}
                >
                  <span>CATEGORY</span>
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                {categoryDropdown && (
                  <div
                    id="categoryDropdown"
                    className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="categoryDropdownButton"
                    >
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100"
                          to={"/categories"}
                        >
                          All Categories
                        </Link>
                      </li>
                      {categories?.map((c) => (
                        <li key={c._id}>
                          <Link
                            className="block px-4 py-2 hover:bg-gray-100"
                            to={`/category/${c.slug}`}
                          >
                            {c.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </li>
            {!auth.user ? (
              <>
                <li>
                  <Link
                    to="/register"
                    className="focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
                  >
                    REGISTER
                  </Link>
                </li>
                <li>
                  <Link
                    to="/login"
                    className="focus:border-b-2 focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
                  >
                    LOGIN
                  </Link>
                </li>
              </>
            ) : (
              <div className="relative inline-block text-left">
                <button
                  id="userDropdownButton"
                  className="text-white flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-[12px] md:text-sm lg:text-base px-2 md:px-2 lg:px-5 py-1 lg:py-2.5 md:py-1 text-center items-center"
                  type="button"
                  onClick={handleUserDropdown}
                >
                  <span>{auth?.user?.name}</span>
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* Dropdown menu */}
                {userDropdown && (
                  <div
                    id="userDropdown"
                    className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 mt-2"
                  >
                    <ul
                      className="py-2 text-sm text-gray-700"
                      aria-labelledby="userDropdownButton"
                    >
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100"
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                        >
                          DASHBOARD
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block px-4 py-2 hover:bg-gray-100"
                          to="/login"
                          onClick={handleLogout}
                        >
                          LOGOUT
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <li>
              <Badge count={cart?.length} showZero className="p-2">
                <Link
                  to="/cart"
                  className="focus:border-b-2 mt-1 text-[12px] md:text-sm lg:text-lg focus:border-blue-800 font-bold hover:text-blue-800 focus:text-blue-800"
                >
                  CART
                </Link>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Nav;
