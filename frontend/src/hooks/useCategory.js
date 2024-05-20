import axios from "axios";
import { useEffect, useState } from "react";

function useCategory() {
  const [categories, setCategorise] = useState([]);

  const getCategorise = async (req, res, next) => {
    try {
      const { data } = await axios.get("/api/v1/category/getAll-category");
      setCategorise(data?.categorys);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorise();
  }, []);

  return categories;
}

export default useCategory;
