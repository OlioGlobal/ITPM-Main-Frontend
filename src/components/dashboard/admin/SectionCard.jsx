"use client";

import { Edit, Trash2, GripVertical, Eye, EyeOff } from "lucide-react";
import { SECTION_LABELS, SECTION_COLORS } from "@/constants/sectionTypes";

export default function SectionCard({
  section,
  onEdit,
  onDelete,
  onToggleActive,
  dragHandleProps,
}) {
  const getPreviewContent = () => {
    const data = section.data;

    switch (section.sectionType) {
      case "banner":
        return data.title || "No title";
      case "description":
        return data.title || "No title";
      case "prerequisites":
        return `${data.points?.length || 0} prerequisites`;
      case "accordion":
        return `${data.items?.length || 0} items`;
      case "skills":
        return `${data.skills?.length || 0} skills`;
      case "course_info":
        return `${data.features?.length || 0} features`;
      case "similar_courses":
        return `${data.courses?.length || 0} courses`;
      default:
        return "No content";
    }
  };

  return (
    <div
      className={`
        bg-white border border-gray-200 p-4 
        flex items-center gap-4
        transition-shadow hover:shadow-md
        ${!section.isActive ? "opacity-60" : ""}
      `}
    >
      {/* Drag Handle */}
      <div
        {...dragHandleProps}
        className="cursor-grab active:cursor-grabbing text-gray-400"
      >
        <GripVertical size={20} />
      </div>

      {/* Section Badge */}
      <div
        className={`px-3 py-1 text-xs font-semibold ${
          SECTION_COLORS[section.sectionType]
        }`}
      >
        {SECTION_LABELS[section.sectionType]}
      </div>

      {/* Content Preview */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {getPreviewContent()}
        </p>
        <p className="text-xs text-gray-500">Order: {section.sectionOrder}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Toggle Active */}
        <button
          onClick={() => onToggleActive(section)}
          className={`p-2 transition-colors ${
            section.isActive
              ? "text-green-600 hover:bg-green-50"
              : "text-gray-400 hover:bg-gray-50"
          }`}
          title={section.isActive ? "Active" : "Inactive"}
        >
          {section.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>

        {/* Edit */}
        <button
          onClick={() => onEdit(section)}
          className="p-2 text-blue-600 hover:bg-blue-50 transition-colors"
          title="Edit"
        >
          <Edit size={18} />
        </button>

        {/* Delete */}
        <button
          onClick={() => onDelete(section)}
          className="p-2 text-red-600 hover:bg-red-50 transition-colors"
          title="Delete"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
