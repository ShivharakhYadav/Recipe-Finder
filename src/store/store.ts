import { configureStore } from "@reduxjs/toolkit";
import recipeSlice from "./slices/recipeSlice";

const Store = configureStore({
  reducer: {
    recipe: recipeSlice,
  },
});

export type AppDispatch = typeof Store.dispatch;
export default Store;
