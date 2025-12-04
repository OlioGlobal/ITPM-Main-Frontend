import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";

// Async thunks
export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/categories");
      return response.data.categories;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories"
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (categoryData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/categories", categoryData);
      return response.data.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create category"
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/categories/${id}`, data);
      return response.data.category;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update category"
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/categories/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete category"
      );
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
        state.categories.sort((a, b) => a.name.localeCompare(b.name));
      })
      // Update category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
        state.categories.sort((a, b) => a.name.localeCompare(b.name));
      })
      // Delete category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default categorySlice.reducer;
