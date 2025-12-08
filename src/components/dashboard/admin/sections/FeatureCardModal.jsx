"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSection, updateSection } from "@/redux/slices/pageSlice";
import { toast } from "sonner";
import { X, Plus, Trash2 } from "lucide-react";
import CloudinaryUpload from "@/components/dashboard/admin/CloudinaryUpload";

export default function FeatureCardModal({ isOpen, onClose, pageId, section }) {
  const dispatch = useDispatch();
  const [saving, setSaving] = useState(false);

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
      image: null,
      title: "",
      description: "",
      points: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "points",
  });

  const imageValue = watch("image");

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

  const addPoint = () => {
    append({
      icon: null,
      text: "",
    });
  };

  const onSubmit = async (formData) => {
    if (!formData.image?.url) {
      toast.error("Please upload a feature image");
      return;
    }

    setSaving(true);

    try {
      if (section?._id) {
        // Update existing section
        await dispatch(
          updateSection({
            id: section._id,
            data: {
              sectionType: "feature_card",
              data: formData,
              isActive: section.isActive ?? true,
            },
          })
        ).unwrap();
        toast.success("Section updated successfully");
      } else {
        // Create new section
        await dispatch(
          createSection({
            pageId: pageId,
            sectionData: {
              sectionType: "feature_card",
              data: formData,
              isActive: true,
            },
          })
        ).unwrap();
        toast.success("Section created successfully");
      }

      onClose();
    } catch (error) {
      console.error("Section save error:", error);
      toast.error(error?.message || error || "Failed to save section");
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="fixed inset-0 bg-black/50" onClick={onClose} />

        <div className="relative bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold">Feature Card Section</h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
            {/* Main Image */}
            <CloudinaryUpload
              label="Feature Image *"
              value={imageValue}
              onChange={(value) => setValue("image", value)}
            />

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Title *</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter feature title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Description *
              </label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows={3}
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter feature description"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Points */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium">
                  Feature Points
                </label>
                <button
                  type="button"
                  onClick={addPoint}
                  className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus size={16} /> Add Point
                </button>
              </div>

              {fields.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed rounded-lg">
                  <p className="text-gray-500 text-sm mb-3">
                    No points added yet
                  </p>
                  <button
                    type="button"
                    onClick={addPoint}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Add your first point
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {fields.map((field, index) => {
                    const pointIcon = watch(`points.${index}.icon`);

                    return (
                      <div
                        key={field.id}
                        className="border rounded-lg p-4 bg-gray-50"
                      >
                        <div className="flex gap-3 items-start">
                          {/* Icon Upload */}
                          <div className="flex-shrink-0 w-24">
                            <CloudinaryUpload
                              label=""
                              value={pointIcon}
                              onChange={(value) =>
                                setValue(`points.${index}.icon`, value)
                              }
                            />
                          </div>

                          {/* Text Input */}
                          <div className="flex-1">
                            <input
                              type="text"
                              {...register(`points.${index}.text`, {
                                required: "Point text is required",
                              })}
                              placeholder="Enter point text"
                              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.points?.[index]?.text && (
                              <p className="text-red-500 text-xs mt-1">
                                {errors.points[index].text.message}
                              </p>
                            )}
                          </div>

                          {/* Remove Button */}
                          <button
                            type="button"
                            onClick={() => remove(index)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors mt-1"
                            title="Remove point"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 justify-end pt-4 border-t sticky bottom-0 bg-white">
              <button
                type="button"
                onClick={onClose}
                disabled={saving}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {saving
                  ? "Saving..."
                  : section?._id
                  ? "Update Section"
                  : "Create Section"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
