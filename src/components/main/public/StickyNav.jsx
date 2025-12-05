"use client";

import { useState, useEffect } from "react";

export default function StickyNav({ sections }) {
  const [activeSection, setActiveSection] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if nav should be sticky (after banner)
      const banner = document.getElementById("banner-section");
      const header = document.querySelector("header");

      if (banner && header) {
        const headerHeight = header.offsetHeight;
        const bannerBottom = banner.offsetTop + banner.offsetHeight;
        setIsSticky(window.scrollY > bannerBottom - headerHeight);
      }

      // Find active section
      const sectionElements = sections.map((section) => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      const scrollPosition = window.scrollY + 250; // Offset for better UX

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    const header = document.querySelector("header");

    if (element && header) {
      const headerHeight = header.offsetHeight;
      const navHeight = 60; // Approximate nav height
      const offset = headerHeight + navHeight + 20; // 20px extra spacing
      const elementPosition = element.offsetTop - offset;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav
      className={`bg-white  border-[#DEDEDE] hidden lg:block  transition-all duration-300 z-50 ${
        isSticky ? "fixed top-16 lg:top-28  left-0 right-0 " : "relative"
      }`}
    >
      <div className="">
        <div className="pad max">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 overflow-x-auto py-2 pt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`whitespace-nowrap text-[16px] font-medium pb-1 border-b-2 transition-colors ${
                  activeSection === section.id
                    ? "text-[#017D3E] border-[#017D3E]"
                    : "text-gray-600 border-transparent hover:text-gray-900"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>

          {/* Mobile Navigation - Horizontal Scroll */}
          <div className="md:hidden flex items-center gap-4 overflow-x-auto py-3 scrollbar-hide">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`whitespace-nowrap text-[16px] font-medium px-4 py-2 rounded-full transition-colors flex-shrink-0 ${
                  activeSection === section.id
                    ? "bg-[#017D3E] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
