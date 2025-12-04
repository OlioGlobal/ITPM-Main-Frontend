"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSection, updateSection } from "@/redux/slices/pageSlice";
import { toast } from "sonner";
import { X, Plus, Trash2 } from "lucide-react";
import CloudinaryUpload from "@/components/dashboard/admin/CloudinaryUpload";

export default function CourseCtaSectionModal({
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
      buttonText: "Enroll Now",
      buttonLink: "",
      features: [],
      price: "",
      discount: "",
      image: null,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "features",
  });

  useEffect(() => {
    if (section?.data) {
      const data = section.data;
      setValue("title", data.title || "");
      setValue("description", data.description || "");
      setValue("buttonText", data.buttonText || "Enroll Now");
      setValue("buttonLink", data.buttonLink || "");
      setValue("features", data.features?.map((f) => ({ value: f })) || []);
      setValue("price", data.price || "");
      setValue("discount", data.discount || "");
      setValue("image", data.image || null);
    }
  }, [section, setValue]);

  const onSubmit = async (formData) => {
    try {
      const sectionData = {
        title: formData.title,
        description: formData.description,
        buttonText: formData.buttonText,
        buttonLink: formData.buttonLink,
        features: formData.features.map((f) => f.value),
        price: formData.price,
        discount: formData.discount,
        image: formData.image,
      };

      if (section) {
        await dispatch(
          updateSection({
            id: section._id,
            data: { data: sectionData },
          })
        ).unwrap();
        toast.success("Course CTA section updated");
      } else {
        await dispatch(
          createSection({
            pageId,
            sectionData: {
              sectionType: "course_cta",
              data: sectionData,
            },
          })
        ).unwrap();
        toast.success("Course CTA section created");
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
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-900">
            {section ? "Edit" : "Add"} Course CTA Section
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
          {/* Image */}
          <CloudinaryUpload
            label="Course Image"
            value={watch("image")}
            onChange={(value) => setValue("image", value)}
          />

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enroll in This Course Today"
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
              Description
            </label>
            <textarea
              {...register("description")}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Limited seats available for the next batch"
            />
          </div>

          {/* Button */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Button Text *
              </label>
              <input
                type="text"
                {...register("buttonText", {
                  required: "Button text is required",
                })}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Button Link *
              </label>
              <input
                type="text"
                {...register("buttonLink", {
                  required: "Button link is required",
                })}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Features */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-900">
                Features
              </label>
              <button
                type="button"
                onClick={() => append({ value: "" })}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Feature
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-3">
                  <input
                    {...register(`features.${index}.value`)}
                    placeholder="e.g., Lifetime Access"
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
                  No features added yet. Click "Add Feature" to start.
                </p>
              )}
            </div>
          </div>

          {/* Price & Discount */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Price
              </label>
              <input
                type="text"
                {...register("price")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="₹49,999"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Discount
              </label>
              <input
                type="text"
                {...register("discount")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Save 30%"
              />
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
