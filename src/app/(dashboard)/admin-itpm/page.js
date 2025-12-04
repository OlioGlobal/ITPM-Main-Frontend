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
import { Edit, Trash2, Plus, Eye } from "lucide-react";
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
      header: "Title",
      cell: ({ row }) => (
        <div className="font-medium text-gray-900">{row.original.title}</div>
      ),
    },
    {
      accessorKey: "slug",
      header: "Slug",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">/{row.original.slug}</div>
      ),
    },
    {
      accessorKey: "categoryId",
      header: "Category",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">
          {row.original.categoryId?.name || (
            <span className="text-gray-400">Uncategorized</span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            row.original.status === "published"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => (
        <div className="text-sm text-gray-600">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <button
            onClick={() => handleEdit(row.original)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => window.open(`/${row.original.slug}`, "_blank")}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition"
            title="Preview"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.original._id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <Trash2 size={16} />
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
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Pages</h1>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus size={20} />
          Create Page
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
            <tbody className="bg-white divide-y divide-gray-200">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
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
        <div className="flex items-center justify-between px-6 py-4 border-t">
          <div className="text-sm text-gray-700">
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              pages.length
            )}{" "}
            of {pages.length} results
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-4 py-2 text-sm border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      <PageFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        page={selectedPage}
      />
    </div>
  );
}
