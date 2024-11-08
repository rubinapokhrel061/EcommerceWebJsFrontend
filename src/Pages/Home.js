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

  // Get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/product/product-list/${page}`
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching products:", error);
      toast.error("Something went wrong while fetching products.");
    }
  };

  // Filter by categories
  const handleFilter = (value, id) => {
    setChecked((prev) => {
      if (value) {
        return [...prev, id];
      } else {
        return prev.filter((c) => c !== id);
      }
    });
  };

  // Handle price filter changes
  const handlePriceChange = (e) => {
    setRadio(e.target.value);
  };

  // Get filtered products
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/product/filter-product`,
        { checked, radio }
      );
      if (data?.success) {
        setProducts(data.products);
      } else {
        toast.error("No products found.");
      }
    } catch (error) {
      console.error("Error filtering products:", error);
      toast.error("Failed to fetch filtered products.");
    }
  };

  useEffect(() => {
    if (checked.length || radio.length) {
      filterProduct();
    } else {
      getAllProducts();
    }
  }, [checked, radio]);

  // Get total count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/product/count-product`);
      setTotal(data?.total);
    } catch (error) {
      console.error("Error fetching total count:", error);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  // Load more products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${backendUrl}/product/product-list/${page}`
      );
      setProducts((prev) => [...prev, ...data.products]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error loading more products:", error);
      toast.error("Failed to load more products.");
    }
  };

  // Get all categories
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/category/all-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong while fetching categories.");
    }
  };

  useEffect(() => {
    getAllCategories();
    getTotal();
  }, []);

  // Add to cart
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

  // Reset filters
  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    getAllProducts(); // Fetch all products without filters
  };

  return (
    <Layout>
      <div className="min-h-screen bg-sky-200">
        <div>
          <img
            className="w-full object-cover h-[80vh] "
            src="/heroimg.png"
          ></img>
        </div>
        <div>
          <h1 className="text-center pt-14 pb-10 underline text-xl font-extrabold">
            Top products
          </h1>
        </div>
        {products.length > 0 ? (
          <>
            <div className="w-full max-w-screen-xl min-h-screen mx-auto flex flex-col md:flex-row gap-4 p-4">
              {/* Sidebar for filters */}
              <div className="md:w-1/4 mb-4 md:mb-0">
                <div className="text-pink-500 font-semibold mb-2">
                  Filter by category
                </div>
                <div className="flex flex-col space-y-2">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => handleFilter(e.target.checked, c._id)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </div>
                {/* Price filter */}
                <div className="flex flex-col mt-4 text-pink-500 font-semibold">
                  Prices
                  <Radio.Group
                    onChange={handlePriceChange}
                    value={radio}
                    className="mt-2"
                  >
                    {Prices?.map((p) => (
                      <div key={p._id}>
                        <Radio value={p.array}>{p.name}</Radio>
                      </div>
                    ))}
                  </Radio.Group>
                </div>
                <button
                  onClick={resetFilters}
                  className="bg-red-600 mt-4 py-2 px-5 rounded inline text-white"
                >
                  RESET FILTERS
                </button>
              </div>

              {/* Product list */}
              <div className="flex-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products?.map((p) => (
                    <div
                      className="bg-white p-4 rounded-lg shadow-md flex flex-col"
                      key={p._id}
                    >
                      <div className="flex justify-center mb-4">
                        <img
                          alt={p.name}
                          className="w-full h-auto object-cover"
                          src={`${backendUrl}/product/get-product-photo/${p._id}`}
                        />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-bold text-gray-900">
                          {p.name}
                        </h2>
                        <p className="mt-1 text-sm text-gray-700">
                          Rs.{p.price}
                        </p>
                        <p className="mt-1 text-sm text-gray-700">
                          {p.description.substring(0, 30)}...
                        </p>
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
                <div className="flex justify-center mt-4">
                  {products && products.length < total && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(page + 1);
                      }}
                      className="bg-gray-50 border border-gray-300 text-sm rounded-lg py-2 px-4"
                    >
                      {loading ? "Loading..." : "Load More"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="text-center items-center pb-8">
              No Products found.
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Home;
