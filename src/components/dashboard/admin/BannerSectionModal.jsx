"use client";

import { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useDispatch } from "react-redux";
import { createSection, updateSection } from "@/redux/slices/pageSlice";
import { toast } from "sonner";
import { X, Plus, Trash2 } from "lucide-react";
import CloudinaryUpload from "@/components/dashboard/admin/CloudinaryUpload";

export default function BannerSectionModal({
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
    control,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      backgroundType: "gradient",
      backgroundValue: "",
      backgroundImage: null,
      title: "",
      subtitle: "",
      applyButtonText: "Apply Now",
      applyButtonLink: "",
      brochureButtonText: "Download Brochure",
      brochureButtonLink: "",
      infoGrid: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "infoGrid",
  });

  useEffect(() => {
    if (section?.data) {
      const data = section.data;
      setBackgroundType(data.background_type || "gradient");
      setValue("backgroundType", data.background_type || "gradient");
      setValue("backgroundValue", data.background_value || "");
      setValue("backgroundImage", data.background_image || null);
      setValue("title", data.title || "");
      setValue("subtitle", data.subtitle || "");
      setValue("applyButtonText", data.apply_button?.text || "Apply Now");
      setValue("applyButtonLink", data.apply_button?.link || "");
      setValue(
        "brochureButtonText",
        data.brochure_button?.text || "Download Brochure"
      );
      setValue("brochureButtonLink", data.brochure_button?.link || "");
      setValue("infoGrid", data.info_grid || []);
    }
  }, [section, setValue]);

  const watchBackgroundType = watch("backgroundType");

  useEffect(() => {
    setBackgroundType(watchBackgroundType);
  }, [watchBackgroundType]);

  const onSubmit = async (formData) => {
    try {
      const sectionData = {
        background_type: formData.backgroundType,
        background_value:
          formData.backgroundType === "image"
            ? formData.backgroundImage?.publicId
            : formData.backgroundValue,
        background_image: formData.backgroundImage,
        title: formData.title,
        subtitle: formData.subtitle,
        apply_button: {
          text: formData.applyButtonText,
          link: formData.applyButtonLink,
        },
        brochure_button: {
          text: formData.brochureButtonText,
          link: formData.brochureButtonLink,
        },
        info_grid: formData.infoGrid,
      };

      if (section) {
        await dispatch(
          updateSection({
            id: section._id,
            data: { data: sectionData },
          })
        ).unwrap();
        toast.success("Banner section updated");
      } else {
        await dispatch(
          createSection({
            pageId,
            sectionData: {
              sectionType: "banner",
              data: sectionData,
            },
          })
        ).unwrap();
        toast.success("Banner section created");
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
            {section ? "Edit" : "Add"} Banner Section
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
                  ? "Gradient Value"
                  : "Color Value"}
              </label>
              <input
                type="text"
                {...register("backgroundValue", {
                  required: "Background value is required",
                })}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder={
                  backgroundType === "gradient"
                    ? "linear-gradient(...)"
                    : "#ffffff"
                }
              />
              {errors.backgroundValue && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.backgroundValue.message}
                </p>
              )}
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
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Subtitle */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Subtitle
            </label>
            <textarea
              {...register("subtitle")}
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter subtitle"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Apply Button Text
              </label>
              <input
                type="text"
                {...register("applyButtonText")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Apply Button Link
              </label>
              <input
                type="text"
                {...register("applyButtonLink")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Brochure Button Text
              </label>
              <input
                type="text"
                {...register("brochureButtonText")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Brochure Button Link
              </label>
              <input
                type="text"
                {...register("brochureButtonLink")}
                className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Info Grid */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-sm font-medium text-gray-900">
                Info Grid Items
              </label>
              <button
                type="button"
                onClick={() => append({ title: "", description: "" })}
                className="flex items-center gap-2 px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                <Plus size={16} />
                Add Item
              </button>
            </div>

            <div className="space-y-3">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="flex gap-3 p-4 border border-gray-200 bg-gray-50"
                >
                  <div className="flex-1 space-y-3">
                    <input
                      {...register(`infoGrid.${index}.title`)}
                      placeholder="Title"
                      className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                    <input
                      {...register(`infoGrid.${index}.description`)}
                      placeholder="Description"
                      className="w-full px-4 py-2.5 border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="p-2 text-red-600 hover:bg-red-50 transition-colors self-start"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
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
