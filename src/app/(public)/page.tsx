import Image from "next/image";
import HeroSectionHome from "@/components/main/home/HerosectionHome";
import PlacementPartners from "@/components/main/home/PlacementPartners";
import ChampionSection from "@/components/main/home/ChampionSection";
import PracticalLearning from "@/components/main/home/PracticalLearning";
import Accreditations from "@/components/main/home/Accreditations";
import TeamSection from "@/components/main/home/TeamSection";
import CTASection from "@/components/main/home/CTASection";
export default function Home() {
  return (
    <div>
      <HeroSectionHome />
      <PlacementPartners center={true} />
      <ChampionSection />
      <PracticalLearning />
      <Accreditations />
      <TeamSection />
      <CTASection />
    </div>
  );
}
