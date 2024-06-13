import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/layout/AdminMenu";
import Layout from "../../Components/layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../config";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/product/get-All-product`);
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="flex gap-10 p-3 w-[90%] mx-auto">
        <div className="w-[40%]">
          <AdminMenu />
        </div>
        <div className="mt-16">
          {/* start */} products
          {products?.map((p) => (
            <Link key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
              <div className=" mb-6 rounded-lg bg-white p-6 mx-auto shadow-md ">
                <div className="items-centers mx-auto">
                  <img
                    alt={p.name}
                    src={`${backendUrl}/product/get-product-photo/${p._id}`}
                  />
                </div>

                <div>
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {p.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">{p.price}</p>
                    <p className="mt-1 text-xs text-gray-700">
                      {p.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          {/* end */}
        </div>
      </div>
    </Layout>
  );
};

export default Products;
