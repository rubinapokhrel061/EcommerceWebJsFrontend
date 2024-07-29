// import React from "react";
// import Layout from "../Components/layout/Layout";
// import { useAuth } from "../Context/Auth";
// import { useCart } from "../Context/Cart";
// import { useNavigate } from "react-router-dom";
// import { backendUrl } from "./config";

// const CartPage = () => {
//   const [auth, setAuth] = useAuth();
//   const [cart, setCart] = useCart();
//   const navigate = useNavigate();
//   //total price
//   const totalPrice = () => {
//     try {
//       let total = 0;
//       cart?.map((item) => {
//         total = total + item.price;
//       });
//       return total.toLocaleString("nepal", {
//         style: "currency",
//         currency: "NPR",
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   //detele item
//   const removeCartItem = (pid) => {
//     try {
//       let myCart = [...cart];
//       let index = myCart.findIndex((item) => item._id === pid);
//       myCart.splice(index, 1);
//       setCart(myCart);
//       localStorage.setItem("cart", JSON.stringify(myCart));
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <Layout>
//       <div className="min-h-screen">
//         <div>
//           <div className="text-center">
//             <h1 className="">{` ${auth?.token && auth?.user?.name}`}</h1>
//             <h4 className="text-pink-700 font-bold pt-10 mb-4">
//               {cart?.length
//                 ? `You Have ${cart.length} items in your cart ${
//                     auth?.token ? "" : "please login to checkout"
//                   }`
//                 : " Your Cart Is Empty"}
//             </h4>
//           </div>
//         </div>
//         <div className="flex justify-center gap-5 py-4 px-6">
//           <div className="flex flex-wrap gap-5">
//             {cart?.map((p) => (
//               <div
//                 key={p._id}
//                 className="border border-green-500 p-4 rounded-md"
//               >
//                 <div className="col-md-4">
//                   <img
//                     alt={p.name}
//                     height={"200px"}
//                     width={"200px"}
//                     src={`${backendUrl}/product/get-product-photo/${p._id}`}
//                   />
//                 </div>
//                 <div>
//                   <p className="text-pink-600 font-bold">{p.name}</p>
//                   <p>{p.description.substring(0, 30)}</p>
//                   <p>Price : {p.price}</p>
//                   <button
//                     className="bg-pink-800 text-white px-2 py-1 rounded-sm"
//                     onClick={() => removeCartItem(p._id)}
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//           <div className="text-center inline-block h-auto border border-green-300 p-4 rounded-md ">
//             <h2 className="text-pink-700 font-bold border-b-2 border-pink-700 mb-4">
//               Cart Summary
//             </h2>
//             <p className="font-semibold border-b-2 border-pink-700 ">
//               Total | Checkout | Payment
//             </p>

//             <h4>Total : {totalPrice()} </h4>
//             {auth?.user?.address ? (
//               <>
//                 <div className="mb-3">
//                   <h4>Current Address</h4>
//                   <h5>{auth?.user?.address}</h5>
//                   <button
//                     className="text-white w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <div className="mb-3">
//                 {auth?.token ? (
//                   <button
//                     className="text-white w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center"
//                     onClick={() => navigate("/dashboard/user/profile")}
//                   >
//                     Update Address
//                   </button>
//                 ) : (
//                   <button
//                     className="text-white w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center  items-center"
//                     onClick={() =>
//                       navigate("/login", {
//                         state: "/cart",
//                       })
//                     }
//                   >
//                     Plase Login to checkout
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default CartPage;
import React, { useEffect } from "react";
import Layout from "../Components/layout/Layout";
import { useAuth } from "../Context/Auth";
import { useCart } from "../Context/Cart";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./config";

const CartPage = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // Calculate total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total += item.price * item.quantity;
      });
      return total.toLocaleString("nepal", {
        style: "currency",
        currency: "NPR",
      });
    } catch (error) {
      console.log(error);
      return "Error calculating total";
    }
  };

  // Add or update item in the cart
  const addItemToCart = (item) => {
    try {
      // Check if item is already in cart
      const existingItem = cart.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        // Update quantity of existing item
        const updatedCart = cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
        setCart(updatedCart);
      } else {
        // Add new item
        const updatedCart = [...cart, { ...item, quantity: item.quantity }];
        setCart(updatedCart);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.log(error);
    }
  };

  // Remove item from cart and database
  const removeCartItem = async (pid) => {
    try {
      // Remove from cart state
      const updatedCart = cart.filter((item) => item._id !== pid);
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));

      // Remove from database
      await axios.delete(`${backendUrl}/api/cart/${pid}`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Increase item quantity
  const increaseQuantity = (pid) => {
    const updatedCart = cart.map((item) =>
      item._id === pid ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease item quantity
  const decreaseQuantity = (pid) => {
    const updatedCart = cart
      .map((item) =>
        item._id === pid && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <Layout>
      <div className="min-h-screen">
        <div className="text-center">
          {/* <h1>{auth?.token && auth?.user?.name}</h1> */}
          <h4 className="text-pink-700 font-bold pt-10 mb-4">
            {cart?.length
              ? `You Have ${cart.length} item(s) in your cart ${
                  auth?.token ? "" : "please login to checkout"
                }`
              : "Your Cart Is Empty"}
          </h4>
        </div>
        <div className="flex justify-center gap-5 py-4 px-6">
          <div className="flex flex-wrap gap-5">
            {cart?.map((p) => (
              <div
                key={p._id}
                className="border border-green-500 p-4 rounded-md"
              >
                <div className="col-md-4">
                  <img
                    alt={p.name}
                    height={"200px"}
                    width={"200px"}
                    src={`${backendUrl}/product/get-product-photo/${p._id}`}
                  />
                </div>
                <div>
                  <p className="text-pink-600 font-bold">{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>
                    Price:{" "}
                    {p.price.toLocaleString("nepal", {
                      style: "currency",
                      currency: "NPR",
                    })}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gray-300 text-black px-2 py-1 rounded-sm"
                      onClick={() => decreaseQuantity(p._id)}
                    >
                      -
                    </button>
                    <span>{p.quantity}</span>
                    <button
                      className="bg-gray-300 text-black px-2 py-1 rounded-sm"
                      onClick={() => increaseQuantity(p._id)}
                    >
                      +
                    </button>
                    <button
                      className="bg-pink-800 text-white px-2 py-1 rounded-sm ml-2"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center inline-block h-auto border border-green-300 p-4 rounded-md">
            <h2 className="text-pink-700 font-bold border-b-2 border-pink-700 mb-4">
              Cart Summary
            </h2>
            <p className="font-semibold border-b-2 border-pink-700">
              Total | Checkout | Payment
            </p>
            <h4>Total: {totalPrice()}</h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="text-white w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="text-white w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Update Address
                  </button>
                ) : (
                  <button
                    className="text-white w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to Checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
