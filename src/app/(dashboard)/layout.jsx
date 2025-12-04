"use client";

import { useState } from "react";
import Sidebar from "../../components/dashboard/main/Sidebar";
import Header from "../../components/dashboard/ui/Header";
import AuthCheck from "../../components/dashboard/main/AuthCheck";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthCheck>
      <div className="min-h-screen bg-gray-50">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        {/* Main content */}
        <div className="lg:pl-64 relative">
          {" "}
          {/* ⭐ Added relative */}
          <Header onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
      </div>
    </AuthCheck>
  );
}
