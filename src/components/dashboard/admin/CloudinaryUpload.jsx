"use client";

import { useState } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "sonner";

export default function CloudinaryUpload({
  value,
  onChange,
  label = "Upload Image",
}) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const result = await uploadToCloudinary(file);
      onChange({
        publicId: result.publicId,
        url: result.url,
      });
      toast.success("Image uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload image");
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    onChange(null);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>

      {value?.url ? (
        <div className="relative group">
          <img
            src={value.url}
            alt="Uploaded"
            className="w-full h-40 object-cover border border-gray-300"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-red-600 text-white opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label
          className={`
            flex flex-col items-center justify-center w-full h-40 
            border-2 border-dashed border-gray-300 
            cursor-pointer hover:border-blue-500 hover:bg-blue-50
            transition-colors
            ${uploading ? "pointer-events-none opacity-50" : ""}
          `}
        >
          <div className="flex flex-col items-center justify-center py-6">
            {uploading ? (
              <>
                <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-2" />
                <p className="text-sm text-gray-600">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="w-10 h-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 font-medium">
                  Click to upload
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
              </>
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      )}
    </div>
  );
}
