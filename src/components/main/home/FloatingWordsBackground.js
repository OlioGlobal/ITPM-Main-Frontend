"use client";
import React, { useEffect, useRef } from "react";

const FloatingWordsBackground = ({
  words = [
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
  ],
  children,
  gradient = "linear-gradient(183.99deg, #85C325 22.03%, #FFFFFF 96.74%)",
  textColor = "white",
  animationDuration = 12,
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear existing words
    const existingWords = container.querySelectorAll(".floating-word");
    existingWords.forEach((word) => word.remove());

    function shuffleArray(array) {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    }

    function createWord(word, position, delay) {
      const wordElement = document.createElement("div");
      // Chip styling with Tailwind classes
      wordElement.className =
        "floating-word text-base sm:text-lg md:text-xl lg:text-[18px] border border-[#AAAAAA] rounded-full px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 backdrop-blur-sm ";
      wordElement.textContent = word;
      wordElement.style.left = `${position}%`;
      wordElement.style.animationDelay = `${delay}s`;
      container.appendChild(wordElement);
    }

    function initializeWords() {
      // Create fixed positions that are evenly distributed
      const positions = [10, 25, 40, 55, 70, 85, 15, 60];

      // Create fixed delays that are evenly distributed
      const delays = [0, 2, 4, 6, 8, 10, 1, 5];

      // Shuffle both arrays to randomize
      const shuffledPositions = shuffleArray(positions);
      const shuffledDelays = shuffleArray(delays);

      // Assign each word a unique position and delay combination
      words.forEach((word, index) => {
        if (index < positions.length) {
          createWord(word, shuffledPositions[index], shuffledDelays[index]);
        }
      });
    }

    initializeWords();

    // Cleanup function
    return () => {
      const wordsToRemove = container.querySelectorAll(".floating-word");
      wordsToRemove.forEach((word) => word.remove());
    };
  }, [words]);

  return (
    <>
      <style>
        {`
          .floating-words-container {
            position: relative;
            width: 100%;
            min-height: 100vh;
            background: ${gradient};
            overflow: hidden;
          }

          .floating-word {
            position: absolute;
            top: 50%;
            font-weight: bold;
            color: ${textColor};
            white-space: nowrap;
            animation: riseAndFade ${animationDuration}s linear infinite;
            transform: translateY(calc(50vh + 300px));
            opacity: 0;
            font-family: 'Arial', sans-serif;
            will-change: transform, opacity;
            pointer-events: none;
            z-index: 1;
          }

          .floating-words-content {
            position: relative;
            z-index: 10;
          }

          @keyframes riseAndFade {
            0% {
              transform: translateY(calc(50vh + 300px));
              opacity: 0;
            }
            10% {
              opacity: 0.1;
            }
            15% {
              opacity: 0.2;
            }
            20% {
              opacity: 0.35;
            }
            25% {
              opacity: 0.5;
            }
            30% {
              opacity: 0.65;
            }
            35% {
              opacity: 0.8;
            }
            40% {
              opacity: 0.9;
            }
            45% {
              opacity: 0.95;
            }
            50% {
              opacity: 1;
            }
            55% {
              opacity: 0.95;
            }
            60% {
              opacity: 0.9;
            }
            65% {
              opacity: 0.8;
            }
            70% {
              opacity: 0.65;
            }
            75% {
              opacity: 0.5;
            }
            80% {
              opacity: 0.35;
            }
            85% {
              opacity: 0.2;
            }
            90% {
              opacity: 0.1;
            }
            100% {
              transform: translateY(calc(-50vh - 300px));
              opacity: 0;
            }
          }
        `}
      </style>

      <div ref={containerRef} className="floating-words-container">
        <div className="floating-words-content">{children}</div>
      </div>
    </>
  );
};

export default FloatingWordsBackground;
