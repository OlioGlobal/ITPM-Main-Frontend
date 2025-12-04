import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Custom base query with credentials
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  credentials: "include", // Include cookies
  prepareHeaders: (headers) => {
    headers.set("Content-Type", "application/json");
    return headers;
  },
});

// Base query with auto token refresh
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // If 401 error, try to refresh token
  if (result.error && result.error.status === 401) {
    // Prevent refresh if already refreshing
    if (args.url === "/auth/refresh") {
      // Redirect to login if refresh fails
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
      return result;
    }

    // Try to refresh token
    const refreshResult = await baseQuery(
      { url: "/auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Retry original request
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Refresh failed, redirect to login
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      }
    }
  }

  return result;
};

// Create API slice
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Admin", "Auth"],
  endpoints: (builder) => ({
    // Auth endpoints
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth", "Admin"],
    }),

    verifyAuth: builder.query({
      query: () => "/auth/verify",
      providesTags: ["Auth"],
    }),

    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
    }),

    // Admin endpoints
    getDashboard: builder.query({
      query: () => "/admin/dashboard",
      providesTags: ["Admin"],
    }),

    getProfile: builder.query({
      query: () => "/admin/profile",
      providesTags: ["Admin"],
    }),

    // Add more endpoints as needed
    // Example: Update profile
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/admin/profile",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Admin"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useLoginMutation,
  useLogoutMutation,
  useVerifyAuthQuery,
  useRefreshTokenMutation,
  useGetDashboardQuery,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = api;
