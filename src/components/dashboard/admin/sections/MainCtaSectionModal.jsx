"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSection, updateSection } from "@/redux/slices/pageSlice";
import { toast } from "sonner";
import { X } from "lucide-react";
import CloudinaryUpload from "@/components/dashboard/admin/CloudinaryUpload";

export default function MainCtaSectionModal({
  isOpen,
  onClose,
  pageId,
  section,
}) {
  const dispatch = useDispatch();
  const [backgroundType, setBackgroundType] = useState("gradient");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      primaryButtonText: "Get Started",
      primaryButtonLink: "",
      secondaryButtonText: "Learn More",
      secondaryButtonLink: "",
      backgroundType: "gradient",
      backgroundValue: "",
      backgroundImage: null,
    },
  });

  useEffect(() => {
    if (section?.data) {
      const data = section.data;
      setBackgroundType(data.backgroundType || "gradient");
      setValue("title", data.title || "");
      setValue("description", data.description || "");
      setValue("primaryButtonText", data.primaryButton?.text || "Get Started");
      setValue("primaryButtonLink", data.primaryButton?.link || "");
      setValue(
        "secondaryButtonText",
        data.secondaryButton?.text || "Learn More"
      );
      setValue("secondaryButtonLink", data.secondaryButton?.link || "");
      setValue("backgroundType", data.backgroundType || "gradient");
      setValue("backgroundValue", data.backgroundValue || "");
      setValue("backgroundImage", data.backgroundImage || null);
    }
  }, [section, setValue]);

  const watchBackgroundType = watch("backgroundType");

  useEffect(() => {
    setBackgroundType(watchBackgroundType);
  }, [watchBackgroundType]);

  const onSubmit = async (formData) => {
    try {
      const sectionData = {
        title: formData.title,
        description: formData.description,
        primaryButton: {
          text: formData.primaryButtonText,
          link: formData.primaryButtonLink,
        },
        secondaryButton: {
          text: formData.secondaryButtonText,
          link: formData.secondaryButtonLink,
        },
        backgroundType: formData.backgroundType,
        backgroundValue: formData.backgroundValue,
        backgroundImage: formData.backgroundImage,
      };

      if (section) {
        await dispatch(
          updateSection({
            id: section._id,
            data: { data: sectionData },
          })
        ).unwrap();
        toast.success("Main CTA section updated");
      } else {
        await dispatch(
          createSection({
            pageId,
            sectionData: {
              sectionType: "main_cta",
              data: sectionData,
            },
          })
        ).unwrap();
        toast.success("Main CTA section created");
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
            {section ? "Edit" : "Add"} Main CTA Section
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
          {/* Background Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Background Type
            </label>
            <div className="flex gap-4">
              {["gradient", "solid", "image"].map((type) => (
                <label
                  key={type}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={type}
                    {...register("backgroundType")}
                    className="w-4 h-4 text-blue-600"
                  />
                  <span className="text-sm text-gray-700 capitalize">
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Background Value */}
          {backgroundType !== "image" ? (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                {backgroundType === "gradient"
                  ? "Gradient CSS"
                  : "Background Color"}
              </label>
              <input
                type="text"
                {...register("backgroundValue")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  backgroundType === "gradient"
                    ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    : "#1e40af"
                }
              />
            </div>
          ) : (
            <CloudinaryUpload
              label="Background Image"
              value={watch("backgroundImage")}
              onChange={(value) => setValue("backgroundImage", value)}
            />
          )}

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Title *
            </label>
            <input
              type="text"
              {...register("title", { required: "Title is required" })}
              className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ready to Transform Your Career?"
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
              placeholder="Join thousands of students who have already started their journey"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Primary Button Text *
              </label>
              <input
                type="text"
                {...register("primaryButtonText", {
                  required: "Button text is required",
                })}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Primary Button Link *
              </label>
              <input
                type="text"
                {...register("primaryButtonLink", {
                  required: "Button link is required",
                })}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Secondary Button Text
              </label>
              <input
                type="text"
                {...register("secondaryButtonText")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Secondary Button Link
              </label>
              <input
                type="text"
                {...register("secondaryButtonLink")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
