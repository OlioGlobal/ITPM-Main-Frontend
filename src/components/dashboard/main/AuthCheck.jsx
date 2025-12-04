"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { verifyAuth } from "@/redux/slices/authSlice";

export default function AuthCheck({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [hasVerified, setHasVerified] = useState(false); // ⭐ Track if verified

  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  // Only verify once on mount
  useEffect(() => {
    if (!hasVerified) {
      // ⭐ Only if not verified yet
      dispatch(verifyAuth());
      setHasVerified(true); // ⭐ Mark as verified
    }
  }, [dispatch, hasVerified]);

  // Redirect if not authenticated
  useEffect(() => {
    if (
      hasVerified &&
      !isLoading &&
      !isAuthenticated &&
      pathname !== "/login"
    ) {
      router.push("/login");
    }
  }, [hasVerified, isLoading, isAuthenticated, pathname, router]);

  // Show loading only during initial verification
  if (!hasVerified || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, don't render
  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
