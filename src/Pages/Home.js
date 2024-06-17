import React, { useEffect, useState } from "react";
import Layout from "../Components/layout/Layout";
import axios from "axios";
import { backendUrl } from "./config";
import toast from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import { Prices } from "../Components/Price";
import { useNavigate } from "react-router-dom";
import { useCart } from "../Context/Cart";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  //get products

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/product/product-list/${page}`
      );
      console.log(data);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went wrong");
    }
  };
  //filter by categories
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, []);

  //get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/product/count-product`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);
  //load more
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/product/product-list/${page}`
      );

      setProducts([...products, ...data?.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("Something Went wrong");
    }
  };

  // get filter product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/product/filter-product`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked.length, radio.length]);
  //get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/category/all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting Category");
    }
  };
  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);
  console.log(products);
  return (
    <Layout title={"Best offers "}>
      <div className=" flex gap-10 p-3 w-[90%] mx-auto">
        <div>
          <div className="w-[40%]">Filter by category</div>
          <div className="flex flex-col">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>
          {/* pricce filter */}
          <div className="flex flex-col mt-4">
            Prices
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="bg-red-600 mt-4 p-2 rounded"
          >
            RESET FILTERS
          </button>
        </div>

        <div className="mt-16">
          <div className="flex gap-3">
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
                    <h2 className="text-lg font-bold text-gray-900">
                      {p.name}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700">Rs.{p.price}</p>

                    <p className="mt-1 text-xs text-gray-700">
                      {p.description.substring(0, 30)}...
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex justify-between">
                  <button
                    onClick={() => navigate(`/product/${p.slug}`)}
                    className="bg-gray-50  border border-gray-300 text-sm rounded-lg focus:border-blue-500 block p-1.5"
                  >
                    See More
                  </button>

                  <button
                    onClick={() => {
                      setCart([...cart, p]);
                      toast.success("Item Added to Cart");
                    }}
                    className="bg-gray-50  border border-gray-300 text-sm rounded-lg focus:border-blue-500 block  p-1.5 "
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            {products && products.length < total && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
                className="bg-gray-50  border border-gray-300 text-sm rounded-lg focus:border-blue-500 block  p-1.5 "
              >
                {loading ? "Loading..." : "LoadMore"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
