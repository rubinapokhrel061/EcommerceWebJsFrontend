import React, { useEffect, useState } from "react";
import AdminMenu from "../../Components/layout/AdminMenu";
import Layout from "../../Components/layout/Layout";
import axios from "axios";
import { backendUrl } from "../config";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
const UpdateProduct = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");

  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState("");

  //get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${backendUrl}/product/get-single-product/${params.slug}`
      );
      setName(data.product.name);
      setCategory(data.product.category._id);
      setDescription(data.product.description);
      setPhoto(data.product.photo);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setId(data.product._id);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, []);

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

  //create product function
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const { data } = axios.put(
        `/api/v1/product/update-product/${id}`,
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

  useEffect(() => {
    getAllCategories();
  }, []);

  //delete product
  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure want to delete this product ?");
      if (!answer) return;
      const { data } = await axios.delete(
        `${backendUrl}/product/delete-product/${id}`
      );
      toast.success("Product deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="flex gap-10 p-3 w-[90%] mx-auto ">
        <div className="w-[20%]">
          <AdminMenu />
        </div>

        <div className="w-[60%] mx-auto">
          update category
          <div>
            <select
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              value={category}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 "
            >
              {categories?.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                  className=" w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 text-sm "
                >
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-[100%] mt-5 text-center bg-gray-50 border  py-2 border-gray-300 text-gray-900 rounded-lg cursor-pointer">
            <label className=" text-sm   ">
              {photo ? photo.name : "Upload Photo"}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div>
            {photo ? (
              <>
                <div className="mt-4 items-center ">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt={photo.name}
                    height={"200px"}
                    width={"200px"}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="mt-4 items-center ">
                  <img
                    src={`${backendUrl}/product/get-product-photo/${id}`}
                    alt={name}
                    height={"200px"}
                    width={"200px"}
                  />
                </div>
              </>
            )}
          </div>
          <div className="mt-5">
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="bg-gray-50 mt-5 border border-gray-300  sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your name"
              required
            />
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className="bg-gray-50 mt-5 border border-gray-300  sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 "
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
              className="bg-gray-50 mt-5 border border-gray-300 sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 "
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
              className="bg-gray-50 mt-5 border border-gray-300 sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter your price"
              required
            />

            <select
              onChange={(e) => {
                setShipping(e.target.value);
              }}
              value={shipping}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  focus:border-blue-500 block w-full p-2.5 "
            >
              <option
                value={"1"}
                className="bg-gray-50 border border-gray-300   p-2.5 text-gray-900 text-sm "
              >
                Yes
              </option>
              <option
                value={"0"}
                className="bg-gray-50 border border-gray-300   p-2.5 text-gray-900 text-sm "
              >
                No
              </option>
            </select>

            <div className="flex gap-3">
              <button
                className="bg-gray-50 mt-5 border border-gray-300 sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 "
                onClick={handleUpdate}
              >
                UPDATE PRODUCT
              </button>
              <button
                className="bg-gray-50 mt-5 border border-gray-300 sm:text-sm rounded-lg focus:border-blue-500 block w-full p-2.5 "
                onClick={handleDelete}
              >
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
