import Image from "next/image";
import Link from "next/link";

// Default data when component is used without backend data
const defaultData = {
  title: "Turn Your\nDegree into a Job.\nGuaranteed.",
  description:
    "Join India's Leading IT Training & Placement Institute 100% Job Guarantee | 1200+ Hiring Partners",
  primaryButton: {
    text: "Apply Now",
    link: "/apply",
  },
  secondaryButton: null,
  backgroundImage: {
    url: "/logo/cta2.png",
    publicId: "cta-default",
  },
};

export default function MainCtaSection({ data = defaultData }) {
  // Merge provided data with defaults
  const ctaData = {
    title: data?.title || defaultData.title,
    description: data?.description || defaultData.description,
    primaryButton: data?.primaryButton || defaultData.primaryButton,
    secondaryButton: data?.secondaryButton || defaultData.secondaryButton,
    backgroundImage: data?.backgroundImage || defaultData.backgroundImage,
  };

  return (
    <section className="bg-[#85C325] w-full overflow-hidden relative">
      {/* Background Image - Full width, aligned right */}
      {ctaData.backgroundImage?.url && (
        <div className="absolute inset-0 max-w-[1580px] mx-auto">
          <div className="relative w-full h-full">
            <Image
              src={ctaData.backgroundImage.url}
              alt={ctaData.title || "CTA Background"}
              fill
              className="object-contain object-right hidden md:block"
            />
          </div>
        </div>
      )}

      {/* Content Container - Max width 2xl */}
      <div className="relative mx-auto">
        <div className="md:rm max pad">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center py-12 md:py-16">
            {/* Left Content */}
            <div>
              <div className="mb-6 md:mb-10">
                {ctaData.title && (
                  <h2 className="mb-3 h2t font-medium text-[#143119] leading-[116%]">
                    {ctaData.title.split("\n").map((line, index) => (
                      <span key={index}>
                        {line}
                        {index < ctaData.title.split("\n").length - 1 && <br />}
                      </span>
                    ))}
                  </h2>
                )}
                {ctaData.description && (
                  <p className="para text-gray-800">{ctaData.description}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex   sm:flex-row gap-3 w-fit">
                {ctaData.primaryButton?.text && (
                  <Link
                    href={ctaData.primaryButton.link || "#"}
                    className="btn inline-block text-center"
                  >
                    {ctaData.primaryButton.text}
                  </Link>
                )}
                {ctaData.secondaryButton?.text && (
                  <Link
                    href={ctaData.secondaryButton.link || "#"}
                    className="btn-str inline-block text-center border border-[#143119] text-[#143119] hover:bg-white/20 transition-colors"
                  >
                    {ctaData.secondaryButton.text}
                  </Link>
                )}
              </div>
            </div>

            {/* Right Side - Empty for background image */}
            <div className="hidden lg:block"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
