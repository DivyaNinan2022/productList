"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { ProductList } from "../productList/page";

const fetchProducts = async ({ pageParam = 1 }) => {
    // const page = pageParam * 15;
  try {
    const { data } = await axios.get(`../api/productList?page=${pageParam}`);
    return {
      products: data.products ?? [],
      nextPage: data.nextPage ?? undefined,
    };
  } catch (error) {
    console.error("Error fetching products:", error);
    throw new Error("Failed to fetch products");
  }
};

export default function Page() {
  const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log("Last Page Data:", lastPage);
      return lastPage.nextPage ?? undefined;
    },
  });

  return (
    <div>
      {data?.pages.map((page, index) => (
        <div key={index}>
          {page.products.map(
            (
              product: ProductList
            ) => (
              <p key={product.id}>{product.brand}</p>
            )
          )}
        </div>
      ))}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()} disabled={isFetching}>
          {isFetching ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
}
