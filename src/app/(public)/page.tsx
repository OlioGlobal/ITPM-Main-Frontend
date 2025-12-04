import Image from "next/image";
import HeroSection from "@/components/main/home/Herosection";
import PlacementPartners from "@/components/main/home/PlacementPartners";
import ChampionSection from "@/components/main/home/ChampionSection";
import PracticalLearning from "@/components/main/home/PracticalLearning";
import Accreditations from "@/components/main/home/Accreditations";
import TeamSection from "@/components/main/home/TeamSection";
import CTASection from "@/components/main/home/CTASection";
export default function Home() {
  return (
    <div>
      <HeroSection />
      <PlacementPartners />
      <ChampionSection />
      <PracticalLearning />
      <Accreditations />
      <TeamSection />
      <CTASection />
    </div>
  );
}
