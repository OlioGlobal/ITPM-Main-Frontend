import Image from "next/image";
import Link from "next/link";

export default function FeatureCard({ data, courseSlug, courseTitle }) {
  return (
    <Link
      href={`/${courseSlug}`}
      className="group bg-white rounded-[15px] border-[#DEDEDE] border p-[15px] overflow-hidden  hover:shadow-sm transition-all duration-300 flex flex-col h-full"
    >
      {/* Feature Image */}
      <div className="relative rounded-xl h-44 bg-gradient-to-br from-[#5B6BC4] to-[#7B8AD4] flex items-center justify-center p-8">
        {data.image?.url ? (
          <Image
            src={data.image.url}
            alt={data.title}
            fill
            className="object-cover"
          />
        ) : (
          // Placeholder Grid Icon
          <div className="w-full h-full flex items-center justify-center">
            <svg
              className="w-24 h-24 text-white opacity-90"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              <rect x="10" y="10" width="25" height="25" rx="4" />
              <rect x="40" y="10" width="20" height="20" rx="4" />
              <rect x="65" y="10" width="25" height="25" rx="4" />
              <rect x="10" y="40" width="35" height="35" rx="4" />
              <rect x="50" y="40" width="40" height="40" rx="4" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="py-3 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-[16px] font-normal text-[#143119] mb-1 leading-tight">
          {data.title}
        </h3>

        {/* Subtitle/Description */}
        {data.description && (
          <p className="text-[13px] font-medium text-[#6B6978] mb-4">
            {data.description}
          </p>
        )}

        {/* Feature Points */}
        {data.points && data.points.length > 0 && (
          <div className="space-y-2.5 mt-auto">
            {data.points.slice(0, 2).map((point, idx) => (
              <div key={idx} className="flex items-center gap-2.5">
                {/* Icon or Circle */}
                {point.icon?.url ? (
                  <div className="flex-shrink-0 w-4 h-4 relative">
                    <Image
                      src={point.icon.url}
                      alt=""
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex-shrink-0 w-4 h-4 rounded-full border-2 border-gray-400"></div>
                )}

                {/* Text */}
                <span className="text-[15px] text-gray-700 leading-tight">
                  {point.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
