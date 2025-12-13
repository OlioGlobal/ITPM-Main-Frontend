"use client";

import { useCallback, useEffect } from "react";
import { useState, useRef } from "react";

import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { testimonialsData } from "@/constants/testimonialsData";
import StatsSection from "./StatsSection";
import FloatingWordsBackground from "@/components/main/home/FloatingWordsBackground";

const HeroSectionHome = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      slidesToScroll: 1,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  return (
    <>
      <FloatingWordsBackground
        words={[
          "Job-Ready Professional",
          "100% Job Guarantee",
          "1200+ Hiring Partners",
          "12,000+ Students Placed",
          "35LPA Highest Salary",
          "Industry Recognized",
          "9M+ Students Joined",
          "Practical Learning",
          "Experienced Faculty",
          "Free Resources",
          "Live Projects",
          "Career Guidance",
          "Placement Support",
          "Mock Interviews",
          "Resume Building",
          "4.6 Ratings on Google",
          "98% Recommend us",
          "1K Google Reviews",
          "7K Facebook Reviews",
        ]}
        gradient="linear-gradient(183.99deg, #85C325 22.03%, #FFFFFF 62.74%)"
        textColor="rgba(255, 255, 255, 0.15)"
        animationDuration={15}
        fontSize={{
          mobile: "2rem",
          tablet: "3rem",
          desktop: "4rem",
        }}
      >
        <section className="relative min-h-screen pt-16 overflow-hidden">
          <div className="">
            {/* Hero Content */}
            <div className="text-center mb-16 pad">
              <h1 className="h1t general ">
                From Graduate to <br></br> Job-Ready Professional.
              </h1>

              <p className="para mt-5 mb-5 leading-[166%] font-semibold ">
                Join India's Leading IT Training & Placement Institute{" "}
                <br className="hidden md:block" /> 100% Job Guarantee | 1200+
                Hiring Partners | 12,000+ Students Placed
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center justify-center gap-4 flex-wrap">
                <button
                  style={{
                    borderColor: "var(--brand-green)",
                  }}
                  className="btn  border text-white hover:opacity-90 transition-opacity"
                >
                  Apply Now
                </button>
                <button
                  className="  btn-str border hover:bg-white/50 transition-colors"
                  style={{
                    borderColor: "var(--brand-green)",
                    color: "var(--brand-green)",
                  }}
                >
                  Download Brochure
                </button>
              </div>
            </div>

            {/* Testimonial Carousel */}
            <div className="relative  ">
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {testimonialsData.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="flex-[0_0_90%] mb-8 min-w-0 sm:flex-[0_0_85%] md:flex-[0_0_42%] lg:flex-[0_0_24%] px-3"
                    >
                      {testimonial.type === "text" ? (
                        <TextTestimonialCard data={testimonial} />
                      ) : (
                        <VideoTestimonialCard data={testimonial} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </FloatingWordsBackground>
      <StatsSection style="mt-12" />
    </>
  );
};

// Text Testimonial Card Component
const TextTestimonialCard = ({ data }) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg h-[455px] md:h-[450px] flex flex-col justify-between">
      {/* Review Text - Hidden Scrollbar */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          scrollbarWidth: "none" /* Firefox */,
          msOverflowStyle: "none" /* IE and Edge */,
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none; /* Chrome, Safari, Opera */
          }
        `}</style>
        <p className="text-[#6B6978] text-[16px] md:text-[18px] leading-relaxed">
          {data.review}
        </p>
      </div>

      {/* Student Info */}
      <div className="flex items-end gap-4 mt-6">
        {/* Left: Name, Role & Company Logo - 50% */}
        <div className="flex-[0_0_50%] flex flex-col justify-end gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h4
                className="font-semibold general text-[16px] "
                style={{ color: "var(--brand-dark)" }}
              >
                {data.name}
              </h4>
              {data.isVerified && (
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
            <p className="text-[14px] text-gray-600">{data.role}</p>
          </div>
          <div className="p-2 border flex justify-center border-[#DEDEDE] rounded-[15px]">
            <Image
              src={data.companyLogo}
              alt="Company Logo"
              width={100}
              height={50}
              className="object-contain"
            />
          </div>
        </div>

        {/* Right: Student Photo - 50% */}
        <div className="flex-[0_0_50%] flex justify-end items-end">
          <Image
            src={data.studentPhoto}
            alt={data.name}
            width={130}
            height={150}
            className="object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

// Video Testimonial Card Component
const VideoTestimonialCard = ({ data }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const percent =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(percent);
    }
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    if (videoRef.current) {
      videoRef.current.currentTime = percent * videoRef.current.duration;
    }
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg h-[455px] md:h-[450px]">
      {/* Video Container */}
      <div className="relative h-full bg-gray-200">
        <video
          ref={videoRef}
          src={data.videoUrl}
          className="w-full h-full object-cover"
          onClick={handlePauseVideo}
          onTimeUpdate={handleTimeUpdate}
          suppressHydrationWarning
        />

        {/* Top Info */}
        <div className="absolute top-4 left-4 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-500 p-0.5">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-purple-600 font-bold text-lg">
              {data.name.charAt(0)}
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-semibold text-white text-sm">{data.name}</h4>
              <svg
                className="w-4 h-4 text-green-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-xs text-white">{data.role}</p>
          </div>
        </div>

        {/* Play Button Overlay */}
        {!isPlaying && (
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={handlePlayVideo}
          >
            <div className="w-16 h-16 rounded-[10px] bg-[#FFFFFFC7] backdrop-blur-[28.3px] flex items-center justify-center hover:bg-white transition-colors">
              <svg
                className="w-8 h-8 text-gray-800 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
              </svg>
            </div>
          </div>
        )}

        {/* Caption */}
        {data.caption && (
          <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
            <p className="text-white text-sm font-medium bg-black/60 px-4 py-2 rounded-full whitespace-nowrap">
              {data.caption}
            </p>
          </div>
        )}

        {/* Video Controls */}
        <div className="absolute bottom-4 left-4 right-4 rounded-[10px] bg-[#FFFFFFC7] backdrop-blur-[28.3px]  px-4 py-3 flex items-center gap-3">
          <button onClick={isPlaying ? handlePauseVideo : handlePlayVideo}>
            {isPlaying ? (
              <svg
                className="w-5 h-5"
                style={{ color: "#000000" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                style={{ color: "#000000" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <button onClick={toggleMute}>
            {isMuted ? (
              <svg
                className="w-5 h-5"
                style={{ color: "#000000" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM12.293 7.293a1 1 0 011.414 0L15 8.586l1.293-1.293a1 1 0 111.414 1.414L16.414 10l1.293 1.293a1 1 0 01-1.414 1.414L15 11.414l-1.293 1.293a1 1 0 01-1.414-1.414L13.586 10l-1.293-1.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                style={{ color: "#000000" }}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
          <div
            className="flex-grow h-1 bg-gray-300 rounded-full overflow-hidden cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-[#2860EE] rounded-full transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSectionHome;
