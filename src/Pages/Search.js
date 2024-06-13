import React from "react";
import Layout from "../Components/layout/Layout";
import { useSearch } from "../Context/SearchContext";
import { backendUrl } from "./config";

const Search = () => {
  const [value] = useSearch();
  return (
    <Layout>
      <div>
        <h1>Search Results</h1>
        <h6>
          {value?.results.length < 1
            ? "No Product Found"
            : value?.results.length}
        </h6>

        <div className="flex gap-3">
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
              <div className="mt-3 flex justify-between">
                <button className="bg-gray-50  border border-gray-300 text-sm rounded-lg focus:border-blue-500 block p-1.5">
                  See More
                </button>

                <button className="bg-gray-50  border border-gray-300 text-sm rounded-lg focus:border-blue-500 block  p-1.5 ">
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
