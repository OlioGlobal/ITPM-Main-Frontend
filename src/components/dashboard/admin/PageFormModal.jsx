"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createPage, updatePage } from "@/redux/slices/pageSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PageFormModal({ isOpen, onClose, page }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      slug: "",
      categoryId: "",
      status: "draft",
      metaTitle: "",
      metaDescription: "",
    },
  });

  const title = watch("title");

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (page) {
      setValue("title", page.title);
      setValue("slug", page.slug);
      setValue("categoryId", page.categoryId?._id || "");
      setValue("status", page.status);
      setValue("metaTitle", page.metaTitle || "");
      setValue("metaDescription", page.metaDescription || "");
    } else {
      reset();
    }
  }, [page, setValue, reset]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!page && title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setValue("slug", slug);
    }
  }, [title, page, setValue]);

  const onSubmit = async (data) => {
    try {
      // Convert empty categoryId to null
      const submitData = {
        ...data,
        categoryId: data.categoryId || null,
      };

      if (page) {
        await dispatch(updatePage({ id: page._id, data: submitData })).unwrap();
        toast.success("Page updated successfully");
        onClose();
      } else {
        const result = await dispatch(createPage(submitData)).unwrap();
        toast.success("Page created successfully");
        onClose();
        reset();
        // Navigate to page builder
        router.push(`/admin-itpm/pages/${result._id}`);
      }
    } catch (error) {
      toast.error(error || "Something went wrong");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {page ? "Edit Page" : "Create Page"}
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
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Title *
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter page title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Page Slug *
            </label>
            <input
              type="text"
              {...register("slug", { required: "Slug is required" })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="page-slug"
            />
            {errors.slug && (
              <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              {...register("categoryId")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select Category (Optional)</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status *
            </label>
            <select
              {...register("status")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          {/* Meta Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Title
            </label>
            <input
              type="text"
              {...register("metaTitle")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter meta title for SEO"
            />
          </div>

          {/* Meta Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meta Description
            </label>
            <textarea
              {...register("metaDescription")}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter meta description for SEO"
            />
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
                : page
                ? "Update Page"
                : "Create Page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
