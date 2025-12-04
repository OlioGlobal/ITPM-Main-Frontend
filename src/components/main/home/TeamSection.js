"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

const teachers = [
  {
    id: 1,
    name: "Mr John Doe",
    designation: "Senior Instructor",
    linkedIn: "https://linkedin.com",
    image: "/temp/teacher.png",
    description:
      "We have helped 100+ Non IT Students get placed into high paying IT Jobs. With over 10 years of experience in software development and teaching, John specializes in full-stack development and has mentored hundreds of successful developers.",
  },
  {
    id: 2,
    name: "Ms Jane Smith",
    designation: "Lead Developer",
    linkedIn: "https://linkedin.com",
    image: "/temp/teacher.png",
    description:
      "We have helped 100+ Non IT Students get placed into high paying IT Jobs. Jane brings expertise in modern web technologies and has worked with top tech companies before joining our faculty.",
  },
  {
    id: 3,
    name: "Mr David Wilson",
    designation: "Tech Mentor",
    linkedIn: "https://linkedin.com",
    image: "/temp/teacher.png",
    description:
      "We have helped 100+ Non IT Students get placed into high paying IT Jobs. David focuses on career development and technical skills enhancement for aspiring developers.",
  },
  {
    id: 4,
    name: "Ms Sarah Brown",
    designation: "Career Coach",
    linkedIn: "https://linkedin.com",
    image: "/temp/teacher.png",
    description:
      "We have helped 100+ Non IT Students get placed into high paying IT Jobs. Sarah specializes in interview preparation and career guidance for tech professionals.",
  },
  {
    id: 5,
    name: "Mr Mike Johnson",
    designation: "Technical Lead",
    linkedIn: "https://linkedin.com",
    image: "/temp/teacher.png",
    description:
      "We have helped 100+ Non IT Students get placed into high paying IT Jobs. Mike has extensive experience in system architecture and leads our advanced technical training programs.",
  },
];

const TeamSection = () => {
  const [expandedCards, setExpandedCards] = useState({});

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      slidesToScroll: 1,
    },
    [
      Autoplay({
        delay: 3000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ]
  );

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const toggleReadMore = (id) => {
    setExpandedCards((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="rm bg-white overflow-hidden">
      <div className="max pad">
        {/* Header */}
        <div className="flex flex-col items-start md:flex-row gap-3 md:justify-between md:items-center mb-8 md:mb-12">
          <div>
            <h2 className="h2t mb-2">A Team of Renowned Teachers & Faculty</h2>
            <p className="para-str text-[#6B6978]">
              We have helped 100+ Non IT Students get placed into high paying IT
              Jobs.
            </p>
          </div>
          <button className="btn-str border font-semibold border-[#017D3E] text-[#017D3E] hover:bg-[#017D3E] hover:text-white transition-all">
            View All
          </button>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {[...teachers, ...teachers, ...teachers].map((teacher, index) => (
                <div
                  key={`${teacher.id}-${index}`}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_48%] md:flex-[0_0_32%] lg:flex-[0_0_23%]"
                >
                  <div className="bg-[#E9EDE55C] border border-[#DEDEDE] rounded-2xl p-3 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    {/* Image */}
                    <div className="relative h-[280px] rounded-2xl w-full overflow-hidden">
                      <Image
                        src={teacher.image}
                        alt={teacher.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-2 py-4">
                      <div className="flex items-center mb-2 justify-between">
                        <div className="flex flex-col">
                          <h3 className="text-[18px] general md:text-[20px] leading-[115.99999999999999%] font-medium text-[#143119]">
                            {teacher.name}
                          </h3>
                          <p className="para-str text-[#143119] dm">
                            {teacher.designation}
                          </p>
                        </div>
                        <Link
                          href={teacher.linkedIn}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 rounded-full bg-[#017D3E] flex items-center justify-center hover:bg-[#004182] transition-colors flex-shrink-0"
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                          </svg>
                        </Link>
                      </div>

                      <p className="text-[16px] leading-[136%] text-[#6B6978]">
                        {expandedCards[`${teacher.id}-${index}`]
                          ? teacher.description
                          : `${teacher.description.slice(0, 80)}...`}{" "}
                        <button
                          onClick={() =>
                            toggleReadMore(`${teacher.id}-${index}`)
                          }
                          className="text-[#017D3E] font-medium hover:underline focus:outline-none"
                        >
                          {expandedCards[`${teacher.id}-${index}`]
                            ? "Read Less"
                            : "Read More"}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-[#017D3E] text-white flex items-center justify-center shadow-lg hover:bg-[#017D3E]/90 cursor-pointer transition-all z-10"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
