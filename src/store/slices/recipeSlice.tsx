import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AxiosInstance from "../../utils/ApiServices";
import qs from "qs";

type recipeType = {
  title: string;
  description: string;
  date: Date;
  author: {
    email: string;
    name: string;
  };
};

type initialStateType = {
  recipeList: recipeType[];
  loading: boolean;
  newRecord: any;
  error: string;
};

const initialState: initialStateType = {
  recipeList: [
    {
      title: "Test",
      description: "desc",
      date: new Date(),
      author: {
        email: "email",
        name: "Tets na",
      },
    },
  ],
  loading: true,
  newRecord: {},
  error: "",
};

export const searchRecipe = createAsyncThunk(
  "recipe/searchRecipe",
  async (query: any) => {
    try {
      const token = localStorage.getItem("recipe-token");
      const response = await AxiosInstance.get(
        `/api/recipeList?${qs.stringify(query)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
);

const recipeSlice = createSlice({
  initialState,
  name: "recipe",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(searchRecipe.pending, (state, action: any) => {
      state.recipeList = action?.payload?.data;
    });
    builder.addCase(searchRecipe.fulfilled, (state, action) => {
      state.recipeList = action?.payload?.data;
    });

    builder.addCase(searchRecipe.rejected, (state, action: any) => {
      state.error = action?.payload?.error;
    });
  },
});

export const recipeActions = recipeSlice.actions;
export default recipeSlice.reducer;
