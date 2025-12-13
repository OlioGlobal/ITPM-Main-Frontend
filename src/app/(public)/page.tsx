import Image from "next/image";
import HeroSectionHome from "@/components/main/home/HerosectionHome";
import PlacementPartners from "@/components/main/home/PlacementPartners";
import ChampionSection from "@/components/main/home/ChampionSection";
import PracticalLearning from "@/components/main/home/PracticalLearning";
import Accreditations from "@/components/main/home/Accreditations";
import TeamSection from "@/components/main/home/TeamSection";
import CTASection from "@/components/main/home/CTASection";
import CategoryCoursesSection from "@/components/main/home/CategoryCoursesSection";
import { getHomeCategoriesWithFeatures } from "@/lib/publicApi";
import FloatingWordsBackground from "@/components/main/home/FloatingWordsBackground";
export default async function Home() {
  // Fetch categories with features on server side
  let categoriesData = { categories: [] };

  try {
    categoriesData = await getHomeCategoriesWithFeatures();
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    // Continue rendering with empty data
  }

  return (
    <div>
      <HeroSectionHome />
      <CategoryCoursesSection categories={categoriesData.categories} />
      <PlacementPartners center={true} style="rm" />
      <ChampionSection />
      <PracticalLearning />
      <Accreditations />
      <TeamSection />
      <CTASection />

      <FloatingWordsBackground>
        <div
          style={{
            padding: "2rem",
            textAlign: "center",
            color: "white",
          }}
        >
          <h1
            style={{
              fontSize: "3rem",
              marginTop: "20vh",
            }}
          >
            Welcome
          </h1>

          <p
            style={{
              fontSize: "1.5rem",
              marginTop: "1rem",
            }}
          >
            Your content goes here
          </p>
        </div>
      </FloatingWordsBackground>
    </div>
  );
}
