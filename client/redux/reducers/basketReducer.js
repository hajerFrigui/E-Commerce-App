import Cookie from "js-cookie";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "basket",
  initialState: Cookie.get("basket") || [],
  reducers: {
    ADD_PRODUCT: (basket, action) => {
      const item = action.payload; //feha le produit illi jebtou mel bd bech n7ottou fel cart
      const product = basket.find((x) => x.product === item.product); //item.product est id de produit
      return product
        ? basket.map((p) => (p.product === product.product ? item : p))
        : [...basket, item];
    },
    REMOVE_PRODUCT: (basket, action) =>
      basket.filter((p) => p.product !== action.payload),
  },
});

export const { ADD_PRODUCT, REMOVE_PRODUCT } = slice.actions;
export default slice.reducer;

//lib
//comps
//funcs
//css
