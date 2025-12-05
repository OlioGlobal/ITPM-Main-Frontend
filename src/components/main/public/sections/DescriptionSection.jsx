"use client";

import { useState } from "react";

export default function DescriptionSection({ data }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Split description into preview and full text
  const getPreviewText = (text) => {
    const words = text.split(" ");
    if (words.length <= 50) return text; // If less than 50 words, show all
    return words.slice(0, 50).join(" ") + "...";
  };

  const shouldShowReadMore =
    data.description && data.description.split(" ").length > 50;

  return (
    <section className="">
      <div className="">
        <div>
          {data.title && <h2 className="h2t-program mb-4">{data.title}</h2>}
          {data.description && (
            <div className="text-[16px] font-medium text-[#6B6978]  dm leading-[160%] ">
              <p className="whitespace-pre-line">
                {isExpanded
                  ? data.description
                  : getPreviewText(data.description)}
                {shouldShowReadMore && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-[#017D3E] pl-2 font-semibold  hover:underline inline-flex items-center gap-1"
                  >
                    {isExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
