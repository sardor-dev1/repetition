import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./ProductsSlice";
import colorSlice from "./ColorSlice";
import brandsSlice from "./BrandSlice";

export default configureStore({
  reducer: {
    products: productSlice,
    colors: colorSlice,
    brands: brandsSlice,
  },
});
