/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../css/productList.css";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import ProductTable from "@/components/ProductTable";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import {
  fetchProductsThunk,
  productListSelector,
} from "@/redux/productListSlice";
import { AppDispatch } from "@/redux/store";

export type ProductList = {
  id: number;
  title: string;
  image: string;
  price: number;
  brand: string;
  description: string;
  model: string;
  color: string;
  category: string;
  discount: number;
  popular?: true;
};

function ProductSearch() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSelector(productListSelector);
  const [searchTerm, setSearchTerm] = useState("");
  const [productList, setProductList] = useState<ProductList[]>([]);
  const [productBrands, setProductBrands] = useState<{ brand: string }[]>([]);


  useEffect(() => {
    dispatch(fetchProductsThunk()).then((res) => {
      setProductList(res?.payload);
    });
  }, [dispatch]);

  useEffect(() => {
    if (productList.length > 0) {
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
      const filteredProducts = products.filter((item) =>
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
    const filteredProducts = products.filter((item) =>
      item.brand.toLowerCase().includes(value.brand.toLowerCase())
    );
    setProductList(filteredProducts);
  };
  console.log("loading", loading);
  return (
    <div className="container">
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <CircularProgress
            color="primary"
            size={100}
            variant="indeterminate"
          />
        </div>
      ) : (
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
                    productBrands.find(
                      (option) => option.brand === searchTerm
                    ) || null
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
      )}
    </div>
  );
}

export default ProductSearch;
