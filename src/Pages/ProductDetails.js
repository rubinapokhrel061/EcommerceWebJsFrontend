import React, { useEffect, useState } from "react";
import Layout from "../Components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./config";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();

  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/product/get-single-product/${params.slug}`
      );
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="flex gap-8">
        <div>
          <img
            alt={product.name}
            src={`${backendUrl}/product/get-product-photo/${product._id}`}
          />
        </div>

        <div className="text-start">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button className="bg-gray-50  border border-gray-300 text-sm rounded-lg focus:border-blue-500 block  p-1.5 ">
            ADD TO CART
          </button>
        </div>
      </div>
      <div>
        <div className="flex gap-3">
          {relatedProducts?.map((p) => (
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

              <button className="bg-gray-50 mt-3 border border-gray-300 text-sm rounded-lg focus:border-blue-500 block  p-1.5 ">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
