import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";

// Async Thunks
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Logout failed");
    }
  }
);

export const verifyAuth = createAsyncThunk(
  "auth/verify",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/auth/verify");
      return response.data.admin;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Verification failed"
      );
    }
  }
);

export const getDashboard = createAsyncThunk(
  "auth/getDashboard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/admin/dashboard");
      return response.data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch dashboard"
      );
    }
  }
);

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    dashboardData: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.dashboardData = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.dashboardData = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.dashboardData = null;
      });

    // Verify
    builder
      .addCase(verifyAuth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(verifyAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });

    // Dashboard
    builder
      .addCase(getDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dashboardData = action.payload;
      })
      .addCase(getDashboard.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, resetAuth } = authSlice.actions;
export default authSlice.reducer;
