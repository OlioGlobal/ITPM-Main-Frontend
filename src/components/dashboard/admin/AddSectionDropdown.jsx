"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, ChevronDown } from "lucide-react";
import { SECTION_TYPES, SECTION_LABELS } from "@/constants/sectionTypes";

export default function AddSectionDropdown({ onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (type) => {
    onSelect(type);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
      >
        <Plus size={20} />
        Add Section
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg z-10">
          {Object.values(SECTION_TYPES).map((type) => (
            <button
              key={type}
              onClick={() => handleSelect(type)}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              {SECTION_LABELS[type]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
