import Image from "next/image";
import Link from "next/link";

export default function LearningOutcomesSection({ data }) {
  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  return (
    <section className="">
      <div className="">
        {/* Section Header */}
        <div className="mb-8 ">
          {data.title && <h2 className="h2t-program mb-2">{data.title}</h2>}
          {data.description && (
            <p className="text-gray-700">{data.description}</p>
          )}
        </div>

        {/* Learning Items Grid */}
        <div className="space-y-4">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-[#E8E8E8] rounded-[15px] p-6 hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Icon/Image */}
                {item.image?.url && (
                  <div className="flex-shrink-0">
                    <div className="w-14 h-14 bg-gray-200 p-2 rounded-lg overflow-hidden relative shadow-sm">
                      <Image
                        src={item.image.url}
                        alt={item.title}
                        width={500}
                        height={500}
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0">
                  {/* Title */}
                  <h3 className="text-[18px] md:text-[24px] font-medium text-[#143119] mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#6B6978] text-[16px] leading-relaxed mb-2">
                    {item.description}
                  </p>

                  {/* Link */}
                  {item.link?.text && item.link?.url && (
                    <Link
                      href={item.link.url}
                      className="inline-flex items-center text-[#017D3E] font-semibold text-[16px] font-semibold hover:underline"
                    >
                      {item.link.text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
