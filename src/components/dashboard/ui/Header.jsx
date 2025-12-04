"use client";

import { Menu, Bell, User } from "lucide-react";
import { useSelector } from "react-redux";

export default function Header({ onMenuClick }) {
  const user = useSelector((state) => state.auth.user);

  return (
    <header className="h-16 bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="h-full px-4 lg:px-6 flex items-center justify-between">
        {/* Left side - Menu button */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Right side - Notifications and Profile */}
        <div className="ml-auto flex items-center gap-3">
          {/* Notifications */}
          <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">
                {user?.username || "Admin"}
              </p>
              <p className="text-xs text-gray-500">
                {user?.role || "Administrator"}
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
