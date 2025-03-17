import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { getProductList } from "@/app/api/productList/productListApi";
import { ProductList } from "@/app/productList/page";

interface ProductState {
  products: ProductList[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  products: [],
  loading: true,
  error: null,
};
// Fetch tasks
export const fetchProductsThunk = createAsyncThunk(
  "tasks/fetchProducts",
  async () => {
    const res = await getProductList();
    return res?.products;
  }
);
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.products = [];
    },
    clearError: (state) => {
      state.error = "";
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsThunk.rejected, (state) => {
        state.loading = false;
        state.error = "Failed to fetch tasks";
      });
  },
});
export const { clearError, clearProducts, setLoading } = productSlice.actions;
export const loginSelector = (state: RootState) => state.products;
export const productListSelector = (state: RootState) => state.products;
export default productSlice.reducer;
