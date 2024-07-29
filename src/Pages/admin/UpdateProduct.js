import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Components/layout/Layout";
import AdminMenu from "../../Components/layout/AdminMenu";
import { backendUrl } from "../config";
const { Option } = Select;

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/product/get-single-product/${params.slug}`
      );
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);

      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(photo);
  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, []);
  //get all category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/category/all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("shipping", shipping);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `${backendUrl}/product/update-product/${id}`,
        productData
      );
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  //delete a product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are You Sure want to delete this product ? ");
      if (!answer) return;
      const { data } = await axios.delete(
        `${backendUrl}/product/delete-product/${id}`
      );
      toast.success("Product Deleted Succfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex md:flex-row md:justify-center gap-10  p-3 w-[90%] min-h-screen mx-auto ">
        <div className="w-full md:w-[40%]">
          <AdminMenu />
        </div>
        <div className="my-10 w-[100%] border rounded border-gray-200">
          <div className="w-full bg-blue-50 rounded-lg shadow shadow-green-700  md:mt-0  p-6 ">
            <div className="space-y-2 md:space-y-4 p-4 w-full">
              <div>
                <Select
                  placeholder="Select a category"
                  size="large"
                  showSearch
                  className="w-full border border-[#4ADE80] rounded-lg "
                  onChange={(value) => {
                    setCategory(value);
                  }}
                  value={category}
                >
                  {categories?.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
                </Select>
                <div className="w-[100%] mt-5 text-center  text-gray-900  cursor-pointer py-2">
                  <label className=" text-sm ">
                    <span className=" text-sm font-bold">
                      {" "}
                      {photo ? photo.name : "Upload Photo"}
                    </span>

                    <input
                      type="file"
                      name="photo"
                      className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                      accept="image/*"
                      onChange={(e) => setPhoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo ? (
                    <div className="text-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="product_photo"
                        height={"200px"}
                      />
                    </div>
                  ) : (
                    <div className="text-center">
                      <img
                        src={`${backendUrl}/product/get-product-photo/${id}`}
                        alt="product_photo"
                        height={"200px"}
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={name}
                    placeholder="write a name"
                    className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    type="text"
                    value={description}
                    className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    placeholder="write a description"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="number"
                    value={price}
                    className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    placeholder="write a Price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    value={quantity}
                    placeholder="write a quantity"
                    className="border border-[#4ADE80] outline-none text-gray-900 sm:text-sm rounded-lg  block w-full p-2.5 "
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <Select
                    size="large"
                    showSearch
                    className="w-full border border-[#4ADE80] rounded-lg "
                    onChange={(value) => {
                      setShipping(value);
                    }}
                    value={shipping ? "Yes" : "No"}
                  >
                    <Option value="0">No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button
                    className="w-full bg-[#4ADE80] font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={handleUpdate}
                  >
                    UPDATE PRODUCT
                  </button>
                </div>
                <div className="mb-3">
                  <button
                    className="w-full bg-red-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                    onClick={handleDelete}
                  >
                    DELETE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
