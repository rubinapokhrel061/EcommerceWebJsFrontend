import React from "react";
import Layout from "../Components/layout/Layout";
import { Link } from "react-router-dom";
import useCategory from "../Hooks/UseCategory";

const AllCategories = () => {
  const categories = useCategory();

  console.log(categories);
  return (
    <Layout>
      <div className="min-h-screen">
        {categories.map((c) => (
          <div
            key={c._id}
            className="text-white  w-44 flex justify-center bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 mx-5 my-7 py-2.5 text-center  items-center "
          >
            <Link to={`/category/${c.slug}`}>{c.name}</Link>
          </div>
        ))}{" "}
      </div>
    </Layout>
  );
};

export default AllCategories;
