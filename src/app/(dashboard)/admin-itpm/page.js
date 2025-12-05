"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPages, deletePage } from "../../../redux/slices/pageSlice";
import { toast } from "sonner";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { Edit, Trash2, Plus, Eye, FileText, Calendar, Tag } from "lucide-react";
import PageFormModal from "@/components/dashboard/admin/PageFormModal";
import { useRouter } from "next/navigation";

export default function PagesListPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pages, loading } = useSelector((state) => state.pages);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPage, setSelectedPage] = useState(null);
  const [sorting, setSorting] = useState([]);

  useEffect(() => {
    dispatch(fetchPages());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this page?")) {
      try {
        await dispatch(deletePage(id)).unwrap();
        toast.success("Page deleted successfully");
      } catch (error) {
        toast.error(error || "Failed to delete page");
      }
    }
  };

  const handleEdit = (page) => {
    router.push(`/admin-itpm/pages/${page._id}`);
  };

  const handleCreate = () => {
    setSelectedPage(null);
    setIsModalOpen(true);
  };

  const columns = [
    {
      accessorKey: "title",
      header: "Page Details",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
            <FileText className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="min-w-0">
            <div className="font-semibold text-gray-900 truncate">
              {row.original.title}
            </div>
            <div className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
              <span className="truncate">/{row.original.slug}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Tag className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">
            {row.original.categoryId?.name || (
              <span className="text-gray-400 italic">Uncategorized</span>
            )}
          </span>
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${
            row.original.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
              row.original.status === "published"
                ? "bg-green-600"
                : "bg-yellow-600"
            }`}
          />
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created Date",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400" />
          {new Date(row.original.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex gap-2 justify-end">
          <button
            onClick={() => handleEdit(row.original)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Edit Page"
          >
            <Edit size={18} />
          </button>
          <button
            onClick={() => window.open(`/${row.original.slug}`, "_blank")}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            title="Preview Page"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => handleDelete(row.original._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            title="Delete Page"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: pages,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-200 border-t-blue-600"></div>
        <p className="mt-4 text-gray-600">Loading pages...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Pages</h1>
          <p className="text-sm text-gray-600 mt-1">
            Manage your course pages and content
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm font-medium"
        >
          <Plus size={20} />
          Create Page
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {pages.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              No pages yet
            </h3>
            <p className="text-gray-600 mb-4">
              Get started by creating your first course page
            </p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={18} />
              Create Page
            </button>
          </div>
        ) : (
          <>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr
                      key={headerGroup.id}
                      className="border-b border-gray-200 bg-gray-50"
                    >
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td key={cell.id} className="px-6 py-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-semibold">
                  {table.getState().pagination.pageIndex *
                    table.getState().pagination.pageSize +
                    1}
                </span>{" "}
                to{" "}
                <span className="font-semibold">
                  {Math.min(
                    (table.getState().pagination.pageIndex + 1) *
                      table.getState().pagination.pageSize,
                    pages.length
                  )}
                </span>{" "}
                of <span className="font-semibold">{pages.length}</span> results
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <button
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      <PageFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={selectedPage}
      />
    </div>
  );
}
