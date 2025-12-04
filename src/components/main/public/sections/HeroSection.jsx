import Image from "next/image";

export default function HeroSection({ data }) {
  // Get background style with image on right (desktop only)
  const getBackgroundStyle = () => {
    if (data.background_image?.url) {
      return {
        backgroundImage: `url(${data.background_image.url}), linear-gradient(90deg, #E9EDE5 0%, #E9EDE5 100%) `,
        backgroundPosition: "center right, left center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundSize: "contain, cover",
      };
    }

    // Fallback to solid color
    return {
      backgroundColor: "#E9EDE5",
    };
  };

  // Mobile background style (no image)
  const getMobileBackgroundStyle = () => {
    return {
      backgroundColor: "#E9EDE5",
    };
  };

  return (
    <>
      {/* Mobile Version - No background image */}
      <section
        className="relative overflow-hidden lg:hidden"
        style={getMobileBackgroundStyle()}
      >
        <div className="rm max pad">
          <div className="space-y-6">
            {/* Title */}
            <div className="mb-6">
              {data.title && <h1 className="h1t-program mb-3">{data.title}</h1>}

              {/* Subtitle */}
              {data.subtitle && (
                <p className="para max-w-lg leading-[166%]">{data.subtitle}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-12">
              {data.apply_button?.text && (
                <button className="btn">{data.apply_button.text}</button>
              )}
              {data.brochure_button?.text && (
                <button className="border border-green-600 btn-str text-[#017D3E] font-medium hover:bg-green-50 transition-colors text-center">
                  {data.brochure_button.text}
                </button>
              )}
            </div>

            {/* Info Grid */}
            {data.info_grid && data.info_grid.length > 0 && (
              <div className="grid grid-cols-2 gap-4 divide-x divide-gray-300">
                {data.info_grid.map((item, idx) => (
                  <div
                    key={idx}
                    className={`space-y-1 ${idx > 0 ? "pl-4" : ""}`}
                  >
                    <div className="text-xs sm:text-sm text-gray-600 font-medium">
                      {item.title}
                    </div>
                    <div className="text-sm sm:text-base font-semibold text-gray-900">
                      {item.description}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Desktop Version - With background image */}
      <section className="relative overflow-hidden hidden lg:block">
        <div style={getBackgroundStyle()} className="">
          <div className="max-w-screen-2xl mx-auto">
            <div className="rm max pad">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div>
                  {/* Title */}
                  <div className="mb-6">
                    {data.title && (
                      <h1 className="h1t-program mb-3">{data.title}</h1>
                    )}

                    {/* Subtitle */}
                    {data.subtitle && (
                      <p className="para max-w-lg leading-[166%]">
                        {data.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-row gap-3 mb-12">
                    {data.apply_button?.text && (
                      <button className="btn">{data.apply_button.text}</button>
                    )}
                    {data.brochure_button?.text && (
                      <button className="border border-green-600 btn-str text-[#017D3E] font-medium hover:bg-green-50 transition-colors text-center">
                        {data.brochure_button.text}
                      </button>
                    )}
                  </div>

                  {/* Info Grid */}
                  {data.info_grid && data.info_grid.length > 0 && (
                    <div className="grid grid-cols-4 gap-2 max-w-xl">
                      {data.info_grid.map((item, idx) => (
                        <div
                          key={idx}
                          className={`space-y-1 relative ${
                            idx > 0 ? "pl-6" : ""
                          }`}
                        >
                          {/* Divider - only show after first item */}
                          {idx > 0 && (
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-12 bg-[#CFD3DA]"></div>
                          )}

                          <div className="text-sm text-gray-600 font-medium">
                            {item.title}
                          </div>
                          <div className="text-base font-semibold text-gray-900">
                            {item.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right Side - Empty to let background image show */}
                <div className="h-96">
                  {/* Empty div - background image will show here */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
