/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductList } from "../productList/page";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import ProductTable from "@/components/ProductTable";
import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";

const fetchProducts = async () => {
  const { data } = await axios.get("../api/productList");
  return data;
};

export default function page() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState<ProductList[]>([]);
  const [productBrands, setProductBrands] = useState<{ brand: string }[]>([]);
  const products = data?.products;

  useEffect(() => {
    setProductList(products);
  }, [products]);

  useEffect(() => {
    if (productList?.length > 0) {
      const productBrand = Array.from(
        new Set(productList.map(({ brand }) => brand))
      ).map((brand) => ({ brand }));
      setProductBrands(productBrand);
    }
  }, [productList]);

  // Debounced Search Handler
  const debouncedHandleSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
      if (!value) {
        setProductList(products);
        return;
      }
      const filteredProducts = products.filter((item: { brand: string }) =>
        item.brand.toLowerCase().includes(value.toLowerCase())
      );
      setProductList(filteredProducts);
    }, 300),
    [products]
  );

  // Handle Input Change
  const handleInputChange = (event: any, value: string) => {
    debouncedHandleSearch(value);
  };

  // Handle Selection
  const handleOnChange = (_event: any, value: { brand: string } | null) => {
    if (!value) {
      setSearchTerm("");
      setProductList(products);
      return;
    }
    setSearchTerm(value.brand);
    const filteredProducts = products.filter((item: { brand: string }) =>
      item.brand.toLowerCase().includes(value.brand.toLowerCase())
    );
    setProductList(filteredProducts);
  };

  if (isLoading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <CircularProgress color="primary" size={100} variant="indeterminate" />
      </div>
    );
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <h1 className="headingStyle">Product List</h1>
      {productList?.length > 0 ? (
        <div className="table-container">
          <div className="search-container-div">
            <Autocomplete
              className="search-container mb-5"
              disablePortal
              style={{ background: "white", border: "none" }}
              options={productBrands}
              value={
                productBrands.find((option) => option.brand === searchTerm) ||
                null
              }
              getOptionLabel={(option) => option.brand}
              isOptionEqualToValue={(option, value) =>
                option?.brand === value?.brand
              }
              renderInput={(params) => (
                <TextField
                  placeholder="Select Product Name"
                  {...params}
                  style={{ border: "none" }}
                />
              )}
              onInputChange={handleInputChange}
              onChange={handleOnChange}
            />
          </div>
          <ProductTable list={productList} />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen text-gray-500 text-xl font-semibold">
          No Products Loaded
        </div>
      )}
    </>
  );
}
