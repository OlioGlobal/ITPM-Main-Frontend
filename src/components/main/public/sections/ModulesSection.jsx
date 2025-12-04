"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function ModulesSection({ data }) {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div>
      <div className="mb-8">
        {data.title && <h2 className="h2t-program mb-2">{data.title}</h2>}
        {data.description && (
          <p className="text-gray-700">{data.description}</p>
        )}
      </div>

      {data.items && data.items.length > 0 && (
        <div className="rounded-[15px] overflow-hidden border border-gray-200">
          {data.items.map((item, idx) => (
            <div
              key={idx}
              className={`transition-all duration-200 ${
                openIndex === idx ? "bg-[#E9EDE5]" : "bg-white hover:bg-gray-50"
              } ${idx !== 0 ? "border-t border-gray-200" : ""}`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full cursor-pointer flex items-center justify-between px-3 py-3 md:px-5 md:py-4 text-left group"
              >
                <span
                  className={`font-medium text-[16px] md:text-[18px] transition-colors ${
                    openIndex === idx
                      ? "text-[#017D3E] !font-bold"
                      : "text-[#6B6978] group-hover:text-[#017D3E]"
                  }`}
                >
                  {item.question}
                </span>
                {openIndex === idx ? (
                  <ChevronUp className="w-5 h-5 text-[#017D3E] flex-shrink-0 transition-transform" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 group-hover:text-[#017D3E] transition-colors" />
                )}
              </button>

              {/* Accordion Content */}
              {openIndex === idx && (
                <div className="px-5 pb-5 pt-2 space-y-2.5">
                  {/* Split answer by newlines to create list items */}
                  {item.answer.split("\n").map((line, lineIdx) => {
                    if (!line.trim()) return null;
                    return (
                      <div key={lineIdx} className="flex items-start gap-3">
                        <span className="text-gray-400 text-[16px] md:text-[18px] mt-0.5">
                          ▷
                        </span>
                        <span className="text-gray-600 text-[16px] md:text-[18px] leading-relaxed">
                          {line.trim()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
