import React, { useEffect, useState } from "react";
import Layout from "../../Components/layout/Layout";
import AdminMenu from "../../Components/layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { backendUrl } from "../config";

import CategoryForm from "../../Components/Form/CategoryForm";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setName("");
    try {
      const { data } = await axios.post(
        `${backendUrl}/category/create-category`,
        { name }
      );
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategories();
      } else {
        toast.error(`${data.message}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong  create category");
    }
  };

  //get all category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/category/all-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting Category");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${backendUrl}/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setShowModal(false);
        getAllCategories();
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  //delete category
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `${backendUrl}/category/delete-category/${id}`
      );
      if (data.success) {
        toast.success(`Category is deleted Successfully`);

        getAllCategories();
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="flex gap-10 p-3 w-[90%] mx-auto">
        <div className="w-[30%]">
          <AdminMenu />
        </div>

        <div className="text-gray-900 w-[75%]  bg-gray-200">
          <div className="p-4 m-1  text-xl font-semibold">
            <h1 className="mb-5">Manage Category</h1>
            <div>
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              />
            </div>
          </div>
          <div className="px-3 py-4 flex justify-center  ">
            <table className="w-full text-md bg-white  shadow-md rounded mb-4">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3 px-5">Name</th>
                  <th className="text-left p-3 px-5 w-[50%]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((category) => (
                  <>
                    <tr
                      key={category._id}
                      className="border-b   bg-gray-100 text-left "
                    >
                      <td className="p-3 px-5">{category.name}</td>
                      <td className="p-3 px-5">
                        <button
                          type="button"
                          onClick={() => {
                            setShowModal(true);
                            setUpdatedName(category.name);
                            setSelected(category);
                          }}
                          className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(category._id)}
                          className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </table>

            {showModal ? (
              <>
                <div className="fixed inset-0 items-center h-[25%] pt-8 px-8 mt-20  bg-slate-100 rounded-md shadow-xl overflow-hidden  w-[70%] mx-auto z-50 ">
                  <CategoryForm
                    value={updatedName}
                    setValue={setUpdatedName}
                    handleSubmit={handleUpdate}
                  />
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
