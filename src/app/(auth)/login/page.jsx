"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "@/redux/slices/authSlice";
import { GraduationCap, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const { isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Clear errors on unmount
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/admin-itpm");
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data) => {
    const result = await dispatch(
      loginUser({
        username: data.username,
        password: data.password,
      })
    );

    if (loginUser.fulfilled.match(result)) {
      router.push("/admin-itpm");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-10 h-10 text-white" />
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-600 mt-2">
              Sign in to access your admin dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Username/Email field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                {...register("username", {
                  required: "Username or email is required",
                })}
                className={`
                  w-full px-4 py-2.5 rounded-lg border
                  focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    errors.username
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300"
                  }
                `}
                placeholder="Enter your username or email"
              />
              {errors.username && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className={`
                    w-full px-4 py-2.5 rounded-lg border pr-12
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${
                      errors.password
                        ? "border-red-300 focus:ring-red-500"
                        : "border-gray-300"
                    }
                  `}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Error message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium
                py-2.5 rounded-lg transition-colors disabled:opacity-50 
                disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-8">
          Course Placement Admin Panel © 2024
        </p>
      </div>
    </div>
  );
}
