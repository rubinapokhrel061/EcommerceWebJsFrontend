import React from "react";
import Layout from "../Components/layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../Hooks/UseCategory";

const AllCategories = () => {
  const categories = useCategory();

  console.log(categories);
  return (
    <Layout>
      {categories.map((c) => (
        <div
          key={c._id}
          className="text-white  w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 mx-5 my-7 py-2.5 text-center  items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Link to={`/category/${c.slug}`}>{c.name}</Link>
        </div>
      ))}
    </Layout>
  );
};

export default AllCategories;
