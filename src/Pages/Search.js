import React from "react";
import Layout from "../Components/layout/Layout";
import { useSearch } from "../Context/SearchContext";
import { backendUrl } from "./config";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";
import toast from "react-hot-toast";

const Search = () => {
  const [value] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const addToCart = (product) => {
    const updatedCart = cart.find((item) => item._id === product._id)
      ? cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      : [...cart, { ...product, quantity: 1 }];

    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    toast.success("Item added to cart");
  };
  return (
    <Layout>
      <div className="min-h-screen">
        {/* <h1>Search Results</h1>  
        <h6>
          {value?.results.length < 1
            ? "No Product Found"
            : value?.results.length}
        </h6> */}

        <div className="flex flex-wrap w-[90%] mx-auto my-4 gap-3">
          {value?.results.map((p) => (
            <div
              className=" mb-6 rounded-lg w-80  bg-white p-6 mx-auto shadow-md "
              key={p._id}
            >
              <div className="items-centers mx-auto">
                <img
                  alt={p.name}
                  src={`${backendUrl}/product/get-product-photo/${p?._id}`}
                />
              </div>

              <div>
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{p.name}</h2>
                  <p className="mt-1 text-xs text-gray-700">Rs.{p.price}</p>

                  <p className="mt-1 text-xs text-gray-700">
                    {p.description.substring(0, 30)}...
                  </p>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={() => navigate(`/product/${p.slug}`)}
                  className="bg-red-600 text-white border border-gray-300 text-sm rounded-lg py-2 px-4"
                >
                  See More
                </button>
                <button
                  onClick={() => addToCart(p)}
                  className="bg-green-600 text-white border border-gray-300 text-sm rounded-lg py-2 px-4"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Search;
