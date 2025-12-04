import Image from "next/image";

export default function CourseCtaSection({ data }) {
  return (
    <div className="relative">
      <div className="bg-[#85C325] rounded-[15px] relative">
        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Content */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            {data.title && <h2 className="h2t-program">{data.title}</h2>}
            {data.description && (
              <p className="para mb-4 mt-3">{data.description}</p>
            )}
            {data.buttonText && (
              <button className="btn w-fit">{data.buttonText}</button>
            )}

            {/* Features */}
            {data.features && data.features.length > 0 && (
              <div className="mt-6 space-y-2">
                {data.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="text-green-900">✓</span>
                    <span className="text-gray-800 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Price & Discount */}
            {(data.price || data.discount) && (
              <div className="mt-6">
                {data.price && (
                  <div className="text-2xl font-bold text-gray-900">
                    {data.price}
                  </div>
                )}
                {data.discount && (
                  <div className="text-sm text-green-900 font-semibold">
                    {data.discount}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Image - Bottom aligned with top expansion */}
          <div className="relative hidden lg:block">
            {data.image?.url && (
              <div className="absolute bottom-0 right-0 w-full h-[110%]">
                <Image
                  src={data.image.url}
                  alt={data.title || "Course CTA"}
                  fill
                  className="object-contain object-right-bottom"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
