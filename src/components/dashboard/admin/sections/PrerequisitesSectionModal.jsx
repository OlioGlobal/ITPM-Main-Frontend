"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSection, updateSection } from "@/redux/slices/pageSlice";
import { toast } from "sonner";
import { X, Plus, Trash2 } from "lucide-react";

export default function PrerequisitesSectionModal({
  isOpen,
  onClose,
  pageId,
  section,
}) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      points: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  useEffect(() => {
    if (section?.data) {
      setValue("title", section.data.title || "");
      setValue("description", section.data.description || "");
      setValue("points", section.data.points?.map((p) => ({ value: p })) || []);
    }
  }, [section, setValue]);

  const onSubmit = async (formData) => {
    try {
      const sectionData = {
        title: formData.title,
        description: formData.description,
        points: formData.points.map((p) => p.value),
      };

      if (section) {
        await dispatch(
          updateSection({
            id: section._id,
            data: { data: sectionData },
          })
        ).unwrap();
        toast.success("Prerequisites section updated");
      } else {
        await dispatch(
          createSection({
            pageId,
            sectionData: {
              sectionType: "prerequisites",
              data: sectionData,
            },
          })
        ).unwrap();
        toast.success("Prerequisites section created");
      }

      onClose();
      reset();
    } catch (error) {
      toast.error(error || "Failed to save section");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {section ? "Edit" : "Add"} Prerequisites Section
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Description (Optional)
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter description"
            />
          </div>

          {/* Prerequisites Points */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-900">
                Prerequisites *
              </label>
              <button
                type="button"
                onClick={() => append({ value: "" })}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Point
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-3">
                  <input
                    {...register(`points.${index}.value`, {
                      required: "Point cannot be empty",
                    })}
                    placeholder="Enter prerequisite point"
                    className="flex-1 px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2.5 text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {fields.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-4 border border-dashed border-gray-300">
                  No prerequisites added yet. Click "Add Point" to start.
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : section ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
