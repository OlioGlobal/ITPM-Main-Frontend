import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axios";

// Async thunks
export const fetchPages = createAsyncThunk(
  "pages/fetchPages",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/pages");
      return response.data.pages;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch pages"
      );
    }
  }
);

export const fetchPageById = createAsyncThunk(
  "pages/fetchPageById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/pages/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch page"
      );
    }
  }
);

export const createPage = createAsyncThunk(
  "pages/createPage",
  async (pageData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/pages", pageData);
      return response.data.page;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create page"
      );
    }
  }
);

export const updatePage = createAsyncThunk(
  "pages/updatePage",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/pages/${id}`, data);
      return response.data.page;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update page"
      );
    }
  }
);

export const deletePage = createAsyncThunk(
  "pages/deletePage",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/pages/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete page"
      );
    }
  }
);

// Section operations
export const createSection = createAsyncThunk(
  "pages/createSection",
  async ({ pageId, sectionData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/pages/${pageId}/sections`,
        sectionData
      );
      return response.data.section;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create section"
      );
    }
  }
);

export const updateSection = createAsyncThunk(
  "pages/updateSection",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/sections/${id}`, data);
      return response.data.section;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update section"
      );
    }
  }
);

export const deleteSection = createAsyncThunk(
  "pages/deleteSection",
  async (id, { rejectWithValue }) => {
    try {
      await axiosInstance.delete(`/sections/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete section"
      );
    }
  }
);

export const reorderSections = createAsyncThunk(
  "pages/reorderSections",
  async ({ pageId, sections }, { rejectWithValue }) => {
    try {
      await axiosInstance.put(`/pages/${pageId}/sections/reorder`, {
        sections,
      });
      return sections;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to reorder sections"
      );
    }
  }
);

const pageSlice = createSlice({
  name: "pages",
  initialState: {
    pages: [],
    currentPage: null,
    currentSections: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentPage: (state) => {
      state.currentPage = null;
      state.currentSections = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch pages
      .addCase(fetchPages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPages.fulfilled, (state, action) => {
        state.loading = false;
        state.pages = action.payload;
      })
      .addCase(fetchPages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch page by ID
      .addCase(fetchPageById.fulfilled, (state, action) => {
        state.currentPage = action.payload.page;
        state.currentSections = action.payload.sections;
      })
      // Create page
      .addCase(createPage.fulfilled, (state, action) => {
        state.pages.unshift(action.payload);
      })
      // Update page
      .addCase(updatePage.fulfilled, (state, action) => {
        const index = state.pages.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.pages[index] = action.payload;
        }
        if (state.currentPage?._id === action.payload._id) {
          state.currentPage = action.payload;
        }
      })
      // Delete page
      .addCase(deletePage.fulfilled, (state, action) => {
        state.pages = state.pages.filter((p) => p._id !== action.payload);
      })
      // Create section
      .addCase(createSection.fulfilled, (state, action) => {
        state.currentSections.push(action.payload);
      })
      // Update section
      .addCase(updateSection.fulfilled, (state, action) => {
        const index = state.currentSections.findIndex(
          (s) => s._id === action.payload._id
        );
        if (index !== -1) {
          state.currentSections[index] = action.payload;
        }
      })
      // Delete section
      .addCase(deleteSection.fulfilled, (state, action) => {
        state.currentSections = state.currentSections.filter(
          (s) => s._id !== action.payload
        );
      })
      // Reorder sections
      .addCase(reorderSections.fulfilled, (state, action) => {
        const reordered = action.payload.map((item) => {
          const section = state.currentSections.find((s) => s._id === item.id);
          return { ...section, sectionOrder: item.order };
        });
        state.currentSections = reordered.sort(
          (a, b) => a.sectionOrder - b.sectionOrder
        );
      });
  },
});

export const { clearCurrentPage } = pageSlice.actions;
export default pageSlice.reducer;
