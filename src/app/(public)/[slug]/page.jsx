import { notFound } from "next/navigation";
import { getPageBySlug } from "@/lib/publicApi";
import HeroSection from "@/components/main/public/sections/HeroSection";
import StatsSection from "@/components/main/home/StatsSection";
import DescriptionSection from "@/components/main/public/sections/DescriptionSection";
import ModulesSection from "@/components/main/public/sections/ModulesSection";
import SkillsSection from "@/components/main/public/sections/SkillsSection";
import CourseCtaSection from "@/components/main/public/sections/CourseCtaSection";
import PrerequisitesSection from "@/components/main/public/sections/PrerequisitesSection";
import CourseInfoSection from "@/components/main/public/sections/CourseInfoSection";
import TeamSection from "@/components/main/home/TeamSection";
import PlacementPartners from "@/components/main/home/PlacementPartners";
import CTASection from "@/components/main/home/CTASection";

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const resolvedParams = await params;

  try {
    const { page } = await getPageBySlug(resolvedParams.slug);

    return {
      title: page.metaTitle || page.title,
      description: page.metaDescription || "",
    };
  } catch (error) {
    return {
      title: "Page Not Found",
    };
  }
}

// Render section component (without wrapper - raw content only)
function renderSectionContent(section) {
  switch (section.sectionType) {
    case "banner":
      return <HeroSection key={section._id} data={section.data} />;

    case "description":
      return <DescriptionSection key={section._id} data={section.data} />;

    case "accordion":
      return <ModulesSection key={section._id} data={section.data} />;

    case "skills":
      return <SkillsSection key={section._id} data={section.data} />;

    case "course_cta":
      return <CourseCtaSection key={section._id} data={section.data} />;

    case "prerequisites":
      return <PrerequisitesSection key={section._id} data={section.data} />;

    case "course_info":
      return <CourseInfoSection key={section._id} data={section.data} />;

    default:
      return null;
  }
}

// Check if section should be in left column
function isLeftColumnSection(sectionType) {
  return (
    sectionType === "description" ||
    sectionType === "accordion" ||
    sectionType === "skills" ||
    sectionType === "course_cta" ||
    sectionType === "prerequisites" ||
    sectionType === "course_info"
  );
}

export default async function PublicPage({ params }) {
  const resolvedParams = await params;
  let pageData;

  try {
    pageData = await getPageBySlug(resolvedParams.slug);
  } catch (error) {
    notFound();
  }

  const { page, sections } = pageData;

  // Separate sections
  const bannerSection = sections.find((s) => s.sectionType === "banner");

  // Filter left sections and sort them in desired order
  const sectionOrder = [
    "description",
    "accordion",
    "skills",
    "course_cta",
    "prerequisites",
    "course_info",
  ];
  const leftSections = sections
    .filter((s) => isLeftColumnSection(s.sectionType))
    .sort((a, b) => {
      const indexA = sectionOrder.indexOf(a.sectionType);
      const indexB = sectionOrder.indexOf(b.sectionType);
      return indexA - indexB;
    });

  const otherSections = sections.filter(
    (s) => !isLeftColumnSection(s.sectionType) && s.sectionType !== "banner"
  );

  return (
    <main className="min-h-screen">
      {/* Hidden title for SEO */}
      <h1 className="sr-only">{page.title}</h1>

      {/* Banner Section - Full Width */}
      {bannerSection && renderSectionContent(bannerSection)}

      <StatsSection style="rm" />

      {/* Two Column Layout - Flexbox with Sticky */}
      {leftSections.length > 0 && (
        <section className="max pad">
          <div className="rm">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
              {/* Left Column - 60% */}
              <div className="w-full lg:flex-[0_0_60%] min-w-0">
                <div className="space-y-16">
                  {leftSections.map((section) => (
                    <div key={section._id}>{renderSectionContent(section)}</div>
                  ))}
                </div>
              </div>

              {/* Right Column - 40% Sticky */}
              <div className="w-full lg:flex-[0_0_40%] min-w-0">
                <div className="sticky top-24">
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-300 h-[150px] rounded-lg shadow-sm flex items-center justify-center">
                    <p className="text-gray-600 font-semibold">
                      Sticky Sidebar
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <PlacementPartners />
      <TeamSection />

      <CTASection />

      {/* Other Sections - Full Width */}
      {otherSections.map((section) => renderSectionContent(section))}
    </main>
  );
}
