import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "redux/store";

export interface ProductData {
  price: string;
  name: string;
}
const INITIAL_STATE = {
  data: null,
};

export const ProductSlice = createSlice({
  name: "product",
  initialState: INITIAL_STATE,
  reducers: {
    addProduct: (state, action) => {
      state.data = action.payload;
    },
    removeProduct: (state) => {
      state.data = null;
    },
  },
});

export const { addProduct, removeProduct } = ProductSlice.actions;


export default ProductSlice.reducer;
