import React, { useEffect, useState } from "react";
import Layout from "../Components/layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./config";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    if (params?.slug) getPrductsByCategory();
  }, [params?.slug]);
  const getPrductsByCategory = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/product/category-wise-product/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen">
        {/* <h1>{category?.name}</h1> */}
        <div className="flex flex-wrap gap-3 py-10">
          {products?.map((p) => (
            <div
              className=" mb-6 rounded-lg w-80  bg-white p-6 mx-auto shadow-md "
              key={p._id}
            >
              <div className="items-centers mx-auto">
                <img
                  alt={p.name}
                  src={`${backendUrl}/product/get-product-photo/${p._id}`}
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
              <div className="mt-3 flex gap-3 justify-between">
                <button
                  onClick={() => navigate(`/product/${p.slug}`)}
                  className="w-full bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  See More
                </button>

                <button className="w-full bg-[#4ADE80] font-medium rounded-lg text-sm px-5 py-2.5 text-center ">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>{" "}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
