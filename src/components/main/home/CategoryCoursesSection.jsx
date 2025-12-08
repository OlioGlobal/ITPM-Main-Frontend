"use client";

import { useState } from "react";
import FeatureCard from "./FeatureCard";

export default function CategoryCoursesSection({ categories }) {
  const [activeTab, setActiveTab] = useState("all");

  if (!categories || categories.length === 0) {
    return null;
  }

  // Get all courses from all categories for "All Programs"
  const allCourses = categories.flatMap((cat) => cat.courses);

  // Get courses based on active tab
  const displayCourses =
    activeTab === "all"
      ? allCourses
      : categories.find((cat) => cat._id === activeTab)?.courses || [];

  return (
    <section className="rm ">
      <div className="bg-[#E9EDE5]">
        <div className="max   pad rm">
          {/* Header with Tabs */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-6">
            {/* Title */}
            <div>
              <h2 className="h2t">Explore Our Programs.</h2>
            </div>

            {/* View All Button - Desktop */}
            <button className="hidden lg:block btn-str border text-[#017D3E] hover:bg-[#017D3E] hover:text-white border-[#017D3E]">
              View All
            </button>
          </div>

          {/* Tabs - Text with Underline */}
          <div className="flex items-center gap-8 mb-6 overflow-x-auto pb-1 ">
            {/* All Programs Tab */}
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-1 text-[16px] cursor-pointer font-semibold whitespace-nowrap transition-colors relative ${
                activeTab === "all"
                  ? "text-[#2860EE] "
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Programs
              {activeTab === "all" && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2860EE]"></span>
              )}
            </button>

            {/* Category Tabs */}
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setActiveTab(category._id)}
                className={`pb-1  text-[16px]  cursor-pointer font-semibold whitespace-nowrap transition-colors relative ${
                  activeTab === category._id
                    ? "text-[#2860EE]"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                {category.name}
                {activeTab === category._id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2860EE]"></span>
                )}
              </button>
            ))}
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayCourses
              .slice(0, 8)
              .map((course) =>
                course.features.map((feature, featureIdx) => (
                  <FeatureCard
                    key={`${course.slug}-${featureIdx}`}
                    data={feature}
                    courseSlug={course.slug}
                    courseTitle={course.title}
                  />
                ))
              )}
          </div>

          {/* View All Button - Mobile */}
          <div className="flex justify-center mt-8 lg:hidden">
            <button className="btn-str border text-[#017D3E] hover:bg-[#017D3E] hover:text-white border-[#017D3E]">
              View All
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
