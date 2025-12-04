"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSection, updateSection } from "@/redux/slices/pageSlice";
import { toast } from "sonner";
import { X, Plus, Trash2 } from "lucide-react";
import CloudinaryUpload from "@/components/dashboard/admin/CloudinaryUpload";

export default function SimilarCoursesSectionModal({
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
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      courses: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "courses",
  });

  useEffect(() => {
    if (section?.data) {
      setValue("title", section.data.title || "");
      setValue("description", section.data.description || "");
      setValue("courses", section.data.courses || []);
    }
  }, [section, setValue]);

  const onSubmit = async (formData) => {
    try {
      const sectionData = {
        title: formData.title,
        description: formData.description,
        courses: formData.courses,
      };

      if (section) {
        await dispatch(
          updateSection({
            id: section._id,
            data: { data: sectionData },
          })
        ).unwrap();
        toast.success("Similar courses section updated");
      } else {
        await dispatch(
          createSection({
            pageId,
            sectionData: {
              sectionType: "similar_courses",
              data: sectionData,
            },
          })
        ).unwrap();
        toast.success("Similar courses section created");
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
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {section ? "Edit" : "Add"} Similar Courses Section
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

          {/* Courses */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-900">
                Courses *
              </label>
              <button
                type="button"
                onClick={() =>
                  append({ icon: null, title: "", description: "", link: "" })
                }
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Course
              </button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 border border-gray-200 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">
                      Course {index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="p-1.5 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="space-y-3">
                    <CloudinaryUpload
                      label="Course Icon"
                      value={watch(`courses.${index}.icon`)}
                      onChange={(value) =>
                        setValue(`courses.${index}.icon`, value)
                      }
                    />

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Course Title *
                      </label>
                      <input
                        {...register(`courses.${index}.title`, {
                          required: "Title is required",
                        })}
                        placeholder="Enter course title"
                        className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Course Description
                      </label>
                      <textarea
                        {...register(`courses.${index}.description`)}
                        rows={2}
                        placeholder="Enter course description"
                        className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Page Link *
                      </label>
                      <input
                        {...register(`courses.${index}.link`, {
                          required: "Link is required",
                        })}
                        placeholder="/course-slug or full URL"
                        className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {fields.length === 0 && (
                <p className="text-sm text-gray-500 text-center py-6 border border-dashed border-gray-300">
                  No courses added yet. Click "Add Course" to start.
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
