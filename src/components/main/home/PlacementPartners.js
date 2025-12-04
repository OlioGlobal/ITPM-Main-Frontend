"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const logos = [
  "/logo/LOGO.png",
  "/logo/LOGO.png",
  "/logo/LOGO.png",
  "/logo/LOGO.png",
  "/logo/LOGO.png",
  "/logo/LOGO.png",
  "/logo/LOGO.png",
  "/logo/LOGO.png",
];

const PlacementPartners = ({ center = false }) => {
  const [emblaRef1] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [AutoScroll({ playOnInit: true, speed: 5, stopOnInteraction: false })]
  );

  const [emblaRef2] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: true },
    [
      AutoScroll({
        playOnInit: true,
        speed: 5,
        stopOnInteraction: false,
        direction: "backward",
      }),
    ]
  );

  return (
    <section className="rm overflow-hidden">
      <div className="max-w-[1700px] mx-auto">
        <h2
          className={`${
            center ? "text-center" : "text-start max pad"
          } h3t  mb-14`}
        >
          Our Placement Partners
        </h2>

        {/* First Row - Left to Right */}
        <div className="overflow-hidden mb-10" ref={emblaRef1}>
          <div className="flex">
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 mr-16">
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  width={150}
                  height={150}
                  className="object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Second Row - Right to Left */}
        <div className="overflow-hidden" ref={emblaRef2}>
          <div className="flex">
            {[...logos, ...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0 mr-16">
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  width={150}
                  height={150}
                  className="object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacementPartners;
