"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

// const logos = [
//   "/logo/LOGO.png",
//   "/logo/LOGO.png",
//   "/logo/LOGO.png",
//   "/logo/LOGO.png",
//   "/logo/LOGO.png",
//   "/logo/LOGO.png",
//   "/logo/LOGO.png",
//   "/logo/LOGO.png",
// ];

const Toplogos = [
  "/company/ADP-3.webp",
  "/company/Allscripts.webp",
  "/company/AMSoft-Group-1.webp",
  "/company/ATOS-2.webp",
  "/company/AVALARA-1-1.webp",
  "/company/Calsoft-1.webp",
  "/company/CAPITA-1.webp",
  "/company/Emerson-2.webp",
  "/company/Enzigma-1.webp",
  "/company/Figmd.webp",
  "/company/IBM-1.webp",
  "/company/KPIT-1.webp",
  "/company/Maxxton.webp",
  "/company/Mphasis.webp",
  "/company/Opus-1.webp",
  "/company/Simplify-healthcare.webp",
  "/company/Softenger-1.webp",
  "/company/Sterlite-1.webp",
  "/company/Tech-Mahindra-1.webp",
  "/company/Vodafone-1.webp",
  "/company/Vyomlabs-1.webp",
  "/company/wns.webp",
  "/company/Zensoft-2.webp",
  "/company/Zenssar-1.webp",
];

const bottomLogos = [
  "/company/Zenssar-1.webp",
  "/company/Zensoft-2.webp",
  "/company/wns.webp",
  "/company/Vyomlabs-1.webp",
  "/company/Vodafone-1.webp",
  "/company/Tech-Mahindra-1.webp",
  "/company/Sterlite-1.webp",
  "/company/Softenger-1.webp",
  "/company/Simplify-healthcare.webp",
  "/company/Opus-1.webp",
  "/company/Mphasis.webp",
  "/company/Maxxton.webp",
  "/company/KPIT-1.webp",
  "/company/IBM-1.webp",
  "/company/Figmd.webp",
  "/company/Enzigma-1.webp",
  "/company/Emerson-2.webp",
  "/company/CAPITA-1.webp",
  "/company/Calsoft-1.webp",
  "/company/AVALARA-1-1.webp",
  "/company/ATOS-2.webp",
  "/company/AMSoft-Group-1.webp",
  "/company/Allscripts.webp",
  "/company/ADP-3.webp",
];

const PlacementPartners = ({ center = false, style = "" }) => {
  const [emblaRef1] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 2, stopOnInteraction: false })]
  );

  const [emblaRef2] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [
      AutoScroll({
        playOnInit: true,
        speed: 2,
        stopOnInteraction: false,
        direction: "backward",
      }),
    ]
  );

  return (
    <section className={`${style} overflow-hidden`}>
      <div className="max-w-[1700px] mx-auto">
        <h2
          className={`${
            center ? "text-center" : "text-start max pad"
          } h3t mb-6 md:mb-8`}
        >
          Our Placement Partners
        </h2>

        {/* First Row - Left to Right */}
        <div className="overflow-hidden " ref={emblaRef1}>
          <div className="flex ">
            {[...Toplogos, ...Toplogos, ...Toplogos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 mr-16">
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  width={150}
                  height={150}
                  className="object-contain   transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="overflow-hidden" ref={emblaRef2}>
          <div className="flex">
            {[...bottomLogos, ...bottomLogos, ...bottomLogos].map(
              (logo, index) => (
                <div key={index} className="flex-shrink-0 mr-16">
                  <Image
                    src={logo}
                    alt={`Partner ${index + 1}`}
                    width={150}
                    height={150}
                    className="object-contain  transition-all"
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementPartners;
