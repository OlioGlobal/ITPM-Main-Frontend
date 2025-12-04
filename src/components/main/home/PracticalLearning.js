"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

const features = [
  {
    id: 1,
    image: "/temp/praticule.png",
    title: "Free Resources",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 2,
    image: "/temp/praticule.png",
    title: "Practical Workshops",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 3,
    image: "/temp/praticule.png",
    title: "Career Guidance",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 4,
    image: "/temp/praticule.png",
    title: "Placement Support",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 5,
    image: "/temp/praticule.png",
    title: "Live Projects",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 6,
    image: "/temp/praticule.png",
    title: "Industry Mentors",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 7,
    image: "/temp/praticule.png",
    title: "Mock Interviews",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 8,
    image: "/temp/praticule.png",
    title: "Resume Building",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 9,
    image: "/temp/praticule.png",
    title: "Soft Skills Training",
    description: "We have helped 100+ Non IT Students get placed.",
  },
  {
    id: 10,
    image: "/temp/praticule.png",
    title: "Certification Programs",
    description: "We have helped 100+ Non IT Students get placed.",
  },
];
const PracticalLearning = () => {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  return (
    <section className="rm">
      <div className="max pad">
        {/* Header */}
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="h2t mb-4">Practical Learning. Experienced Faculty.</h2>
          <p className=" para-str text-[#6B6978]">
            We have helped 100+ Non IT Students get placed.
          </p>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_23%]"
              >
                <div className="bg-white border border-[#DEDEDE] rounded-2xl overflow-hidden">
                  {/* Image */}
                  <div className="relative h-[280px] w-full">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <h3 className="para2 general text-center text-[#143119] ">
                      {feature.title}
                    </h3>
                    <p className="text-center text-[#6B6978] font-normal mt-2 ">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PracticalLearning;
