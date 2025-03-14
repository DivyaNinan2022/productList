
import axios from "axios";

// const API_URL = "http://fakestoreapi.in/api/products"

export const getProductList = async () => {
    const response = await axios.get('api/productList');
    return response.data;
  };