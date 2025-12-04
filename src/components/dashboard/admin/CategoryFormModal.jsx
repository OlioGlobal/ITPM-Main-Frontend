"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  createCategory,
  updateCategory,
} from "../../../redux/slices/categorySlice";
import { toast } from "sonner";
import { X } from "lucide-react";

export default function CategoryFormModal({ isOpen, onClose, category }) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
    } else {
      reset();
    }
  }, [category, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      if (category) {
        await dispatch(updateCategory({ id: category._id, data })).unwrap();
        toast.success("Category updated successfully");
      } else {
        await dispatch(createCategory(data)).unwrap();
        toast.success("Category created successfully");
      }
      onClose();
      reset();
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {category ? "Edit Category" : "Create Category"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category Name *
            </label>
            <input
              type="text"
              {...register("name", { required: "Category name is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter category name"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {isSubmitting
                ? "Saving..."
                : category
                ? "Update Category"
                : "Create Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
