"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { X, Plus, Trash2 } from "lucide-react";
import CloudinaryUpload from "@/components/dashboard/admin/CloudinaryUpload";
import { createSection, updateSection } from "@/redux/slices/pageSlice";
import { toast } from "sonner";

export default function LearningOutcomesModal({
  isOpen,
  onClose,
  pageId,
  section,
}) {
  const dispatch = useDispatch();

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    if (section?.data) {
      reset(section.data);
    } else {
      reset({
        image: null,
        title: "",
        description: "",
        points: [],
      });
    }
  }, [section, isOpen, reset]);

  const onSubmit = async (data) => {
    try {
      if (section) {
        // Update existing section
        await dispatch(
          updateSection({
            id: section._id,
            data: { data },
          })
        ).unwrap();
        toast.success("Section updated successfully");
      } else {
        // Create new section
        await dispatch(
          createSection({
            pageId,
            sectionData: {
              sectionType: "learning_outcomes",
              data,
            },
          })
        ).unwrap();
        toast.success("Section created successfully");
      }
      onClose();
    } catch (error) {
      toast.error(error || "Failed to save section");
    }
  };

  const addItem = () => {
    append({
      image: null,
      title: "",
      description: "",
      link: {
        text: "",
        url: "",
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        <div className="relative bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
            <h2 className="text-xl font-bold text-gray-900">
              What You Will Learn Section
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Section Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Section Title *
              </label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., What You Will Learn"
              />
              {errors.title && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Section Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Section Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief description about what students will learn"
              />
            </div>

            {/* Learning Items */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <label className="block text-sm font-medium text-gray-900">
                  Learning Items
                </label>
                <button
                  type="button"
                  onClick={addItem}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={16} />
                  Add Item
                </button>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500 mb-3">No learning items yet</p>
                  <button
                    type="button"
                    onClick={addItem}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Add your first item
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {fields.map((field, index) => (
                    <div
                      key={field.id}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      {/* Item Header */}
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-semibold text-gray-900">
                          Item {index + 1}
                        </h4>
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="space-y-4">
                        {/* Item Image */}
                        <CloudinaryUpload
                          label="Item Image *"
                          value={watch(`items.${index}.image`)}
                          onChange={(value) =>
                            setValue(`items.${index}.image`, value)
                          }
                        />

                        {/* Item Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Item Title *
                          </label>
                          <input
                            type="text"
                            {...register(`items.${index}.title`, {
                              required: "Title is required",
                            })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="e.g., Master React Fundamentals"
                          />
                          {errors.items?.[index]?.title && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.items[index].title.message}
                            </p>
                          )}
                        </div>

                        {/* Item Description */}
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Item Description *
                          </label>
                          <textarea
                            {...register(`items.${index}.description`, {
                              required: "Description is required",
                            })}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Describe what students will learn in this topic"
                          />
                          {errors.items?.[index]?.description && (
                            <p className="text-red-600 text-sm mt-1">
                              {errors.items[index].description.message}
                            </p>
                          )}
                        </div>

                        {/* Link Section */}
                        <div className="border-t pt-4">
                          <h5 className="text-sm font-medium text-gray-900 mb-3">
                            Call to Action (Optional)
                          </h5>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Link Text */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Link Text
                              </label>
                              <input
                                type="text"
                                {...register(`items.${index}.link.text`)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="e.g., Learn More"
                              />
                            </div>

                            {/* Link URL */}
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Link URL
                              </label>
                              <input
                                type="url"
                                {...register(`items.${index}.link.url`)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {section?._id ? "Update Section" : "Create Section"}{" "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
