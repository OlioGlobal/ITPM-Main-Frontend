"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";

const floatingIcons = [
  { id: 1, icon: "/images/javascript-icon.png", label: "JavaScript" },
  { id: 2, icon: "/images/ai-icon.png", label: "AI" },
  { id: 3, icon: "/images/react-icon.png", label: "React" },
  { id: 4, icon: "/images/python-icon.png", label: "Python" },
  { id: 5, icon: "/images/nodejs-icon.png", label: "Node.js" },
];

const reviews = [
  {
    id: 1,
    platform: "Google",
    icon: "/logo/google.png",
    text: "98% Recommend us",
    totalReviews: "1K Google Reviews",
  },
  {
    id: 2,
    platform: "Facebook",
    icon: "/logo/facebook.png",
    text: "98% Recommend us",
    totalReviews: "7K Facebook Reviews",
  },
  {
    id: 3,
    platform: "Justdial",
    icon: "/logo/justdial.png",
    text: "98% Recommend us",
    totalReviews: "2.2K Justdial Reviews",
  },
  {
    id: 4,
    platform: "Google",
    icon: "/logo/google.png",
    text: "4.6 ⭐ on Google",
    totalReviews: "1K plus Reviews",
  },
];

const ChampionSection = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    AutoScroll({ playOnInit: true, speed: 2, stopOnInteraction: false }),
  ]);

  return (
    <section className="rm bg-[#E9EDE5] overflow-hidden">
      <div className="max pad ">
        <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-8">
          {/* Left Content */}
          <div className="w-full lg:w-[50%]">
            <h2 className="h2t">
              Be the <span className="text-[#017D3E]">Undisputed</span>
              <br />
              Champion of the IT
              <br />
              World.
            </h2>

            <p className="para-str text-[#6B6978] mt-4 mb-6">
              Committed to shaping tomorrow's workforce, iTpreneur is a leading
              IT training institute in Pune since 2014. With over 11,000+
              success stories, we equip individuals with the skills for thriving
              careers in tech and digital industries. Our holistic approach
              includes personalized career guidance, industry-aligned training,
              and dedicated recruitment support.
            </p>

            <button className="btn-str border border-[#2CBB45] text-[#2CBB45] hover:text-white hover:bg-[#2CBB45] transition-all">
              More About Us
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-[50%] flex justify-center lg:justify-end">
            <Image
              src="/temp/champ.png"
              alt="IT Champion"
              width={600}
              height={500}
              className="object-contain"
            />
          </div>
        </div>

        {/* Reviews Slider */}
        <div className="mt-10 lg:mt-16 overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {[...reviews, ...reviews, ...reviews].map((review, index) => (
              <div className="flex-shrink-0 mr-6 mb-2 " key={index}>
                <div className="bg-white border border-[#DEDEDE] rounded-[15px] p-4 backdrop-blur-[33%]  flex items-center gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <Image
                      src={review.icon}
                      alt={review.platform}
                      width={62}
                      height={62}
                      className="object-contain"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <h3 className="general  para font-medium">{review.text}</h3>
                    <p className="text-[16px] text-[#6B6978]">
                      {review.totalReviews}
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

export default ChampionSection;
