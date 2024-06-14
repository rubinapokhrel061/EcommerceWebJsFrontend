import { useState, useEffect } from "react";
import axios from "axios";
import { backendUrl } from "../Pages/config";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get category
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/category/all-category`);
      setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);
  console.log(categories);
  return categories;
}
