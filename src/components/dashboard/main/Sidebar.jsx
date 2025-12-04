"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Settings,
  ChevronLeft,
  LogOut,
} from "lucide-react";
import { logoutUser } from "@/redux/slices/authSlice";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin-itpm",
    icon: LayoutDashboard,
  },
  {
    title: "Pages",
    href: "/admin-itpm/pages",
    icon: FileText,
  },
  {
    title: "Categories",
    href: "/admin-itpm/categories",
    icon: FolderOpen,
  },
  {
    title: "Settings",
    href: "/admin-itpm/settings",
    icon: Settings,
  },
];

export default function Sidebar({ isOpen, setIsOpen }) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen bg-white border-r border-gray-200
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:fixed
          w-64
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold text-gray-900">ITPM Admin</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  pathname.startsWith(item.href + "/");

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg
                        text-sm font-medium transition-colors
                        ${
                          isActive
                            ? "bg-blue-50 text-blue-700"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }
                      `}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="flex cursor-pointer items-center gap-3 w-full px-3 py-2.5 rounded-lg
                text-sm font-medium text-white bg-red-600 hover:bg-red-700
                transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-5 h-5" />
              <span>{isLoading ? "Logging out..." : "Logout"}</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
