import React from "react";

const CategoryForm = ({ handleSubmit, setValue, value }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="border w-[75%] border-[#2a2a2b] text-gray-900 sm:text-sm rounded-lg  block p-2.5 "
            placeholder="Enter new category"
            required
          />
          <button
            type="submit"
            className="mr-3 text-sm w-[18%] bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
