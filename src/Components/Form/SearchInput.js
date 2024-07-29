import React from "react";
import { useSearch } from "../../Context/SearchContext";
import axios from "axios";
import { backendUrl } from "../../Pages/config";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `${backendUrl}/product/search-product/${values.keyword}`
      );
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };
  console.log(values);
  return (
    <>
      <form role="search" onClick={handleSubmit}>
        <div className="flex rounded-lg">
          <input
            type="search"
            className="w-80 md:w-44 lg:w-80 rounded-l-md outline-none border border-blue-700 text-gray-900 text-sm  block  p-2  "
            placeholder="Search"
            value={values.keyword}
            onChange={(e) => setValues({ ...values, keyword: e.target.value })}
          />
          <button
            type="submit"
            className="p-2.5 rounded-r-md text-sm font-medium text-white bg-blue-700 hover:bg-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default SearchInput;
