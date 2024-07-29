import React, { useEffect, useState } from "react";
import Layout from "../Components/layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "./config";
import toast from "react-hot-toast";
import { useCart } from "../Context/Cart";

const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = useParams();
  const [cart, setCart] = useCart();

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
        <div className="flex flex-col md:flex md:flex-row md:gap-4  p-6 md:justify-center  w-[90%] border border-green-600 mx-auto rounded-md mt-4 ">
          <div className="w-[50%]">
            <img
              alt={product.name}
              className=" h-auto rounded-md"
              src={`${backendUrl}/product/get-product-photo/${product._id}`}
            />
          </div>

          <div className="max-w-screen-sm space-y-3">
            <h1 className="text-center font-bold text-pink-700 text-base">
              Product Details
            </h1>
            <h6>
              <span className=" font-bold text-pink-700 text-base">
                Name :{" "}
              </span>
              {product.name}
            </h6>
            <h6>
              <span className=" font-bold text-pink-700 text-base">
                Description :{" "}
              </span>{" "}
              {product.description}
            </h6>
            <h6>
              <span className=" font-bold text-pink-700 text-base">
                Price :{" "}
              </span>{" "}
              {product.price}
            </h6>
            <h6>
              <span className=" font-bold text-pink-700 text-base">
                Category :{" "}
              </span>{" "}
              {product?.category?.name}
            </h6>
            <button
              className="w-full  bg-[#4ADE80] inline font-medium rounded-lg text-sm  px-5 py-2.5 text-center "
              onClick={() => addToCart(product)}
            >
              ADD TO CART
            </button>
          </div>
        </div>
        <div>
          <h1 className="text-center font-bold text-pink-700 text-xl my-4">
            {" "}
            Similar Product
          </h1>
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
                    <h2 className="text-lg font-bold text-gray-900">
                      {p.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">Rs.{p.price}</p>

                    <p className="mt-1 text-xs text-gray-700">
                      {p.description.substring(0, 30)}...
                    </p>
                  </div>
                </div>

                <button
                  className="w-full mt-4 bg-[#4ADE80] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={() => addToCart(p)}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
