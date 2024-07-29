import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/layout/AdminMenu";
import Layout from "../../Components/layout/Layout";
import axios from "axios";
import { backendUrl } from "../config";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { Select } from "antd";
const { Option } = Select;
const CreateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();

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
  }, []);

  //create product function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);
      const { data } = axios.post(
        `${backendUrl}/product/create-product`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  console.log(photo);
  return (
    <Layout>
      <div className="flex flex-col md:flex md:flex-row md:justify-center gap-10  p-3 w-[90%] min-h-screen mx-auto">
        <div className="w-full md:w-[40%]">
          <AdminMenu />
        </div>
        <div className="my-10 w-[100%] rounded ">
          <div className="w-full bg-white p-6 rounded-lg shadow shadow-green-700  md:mt-0  ">
            <div className="space-y-2 md:space-y-4 p-4">
              <div>
                <Select
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="w-full border border-[#4ADE80] rounded-lg "
                  onChange={(value) => {
                    setCategory(value);
                  }}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="w-[100%] mt-5 text-center  text-gray-900  cursor-pointer py-2">
                <label className=" text-sm ">
                  <span className=" text-sm font-bold">
                    {" "}
                    {photo ? photo.name : "Upload Photo"}
                  </span>
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div>
                {photo && (
                  <div className="mt-4 items-center ">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={photo.name}
                      height={"200px"}
                      width={"200px"}
                    />
                  </div>
                )}
              </div>
              <div className="mt-5 space-y-2 md:space-y-4">
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter Product Name"
                  required
                />
                <input
                  type="text"
                  name="description"
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your description"
                  required
                />
                <input
                  type="number"
                  name="quantity"
                  value={quantity}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                  }}
                  className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your quantity"
                  required
                />
                <input
                  type="number"
                  name="price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                  className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                  placeholder="Enter your price"
                  required
                />

                <Select
                  placeholder="Select Shipping "
                  size="large"
                  showSearch
                  className="w-full border border-[#4ADE80] rounded-lg"
                  onChange={(value) => {
                    setShipping(value);
                  }}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>

                <div className="mb-3">
                  <button
                    className="w-full bg-[#4ADE80] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={handleCreate}
                  >
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
      </div>
    </Layout>
  );
};

export default CreateProduct;
