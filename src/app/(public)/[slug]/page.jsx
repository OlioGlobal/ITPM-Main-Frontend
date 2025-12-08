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
import MainCtaSection from "@/components/main/home/CTASection";
import TeamSection from "@/components/main/home/TeamSection";
import PlacementPartners from "@/components/main/home/PlacementPartners";
import TestimonialsSection from "@/components/main/public/sections/TestimonialsSection";
import { testimonialsData2 } from "@/constants/testimonialsData";
import LeadForm from "@/components/main/public/LeadForm";
import StickyNav from "@/components/main/public/StickyNav";

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

// Section label mapping
const sectionLabels = {
  description: "Overview",
  accordion: "Modules",
  skills: "Skills",
  prerequisites: "Requirements",
  course_info: "Course Info",
  course_cta: "Enroll",
};

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

    case "main_cta":
      return <MainCtaSection key={section._id} data={section.data} />;

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
  const mainCtaSection = sections.find((s) => s.sectionType === "main_cta");

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
    (s) =>
      !isLeftColumnSection(s.sectionType) &&
      s.sectionType !== "banner" &&
      s.sectionType !== "main_cta"
  );

  // Create nav sections array
  const navSections = leftSections.map((section) => ({
    id: `section-${section.sectionType}`,
    label: sectionLabels[section.sectionType] || section.sectionType,
  }));

  // Add fixed sections to nav
  const allNavSections = [
    ...navSections,
    { id: "testimonials-section", label: "Testimonials" },
    { id: "placements-section", label: "Placements" },
  ];

  return (
    <main className="min-h-screen">
      {/* Hidden title for SEO */}
      <h1 className="sr-only">{page.title}</h1>

      {/* Banner Section - Full Width */}
      <div id="banner-section">
        {bannerSection && renderSectionContent(bannerSection)}
      </div>

      <StickyNav sections={allNavSections} />

      <StatsSection style="my-10" />

      {/* Two Column Layout - Flexbox with Sticky */}
      {leftSections.length > 0 && (
        <section className="max pad">
          <div className="">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
              {/* Left Column - 65% */}
              <div className="w-full lg:flex-[0_0_65%] min-w-0">
                <div className="space-y-14">
                  {leftSections.map((section) => (
                    <div
                      key={section._id}
                      id={`section-${section.sectionType}`}
                      className="scroll-mt-40 lg:scroll-mt-44"
                    >
                      {renderSectionContent(section)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column - 35% Sticky */}
              <div className="w-full lg:flex-[0_0_35%] min-w-0 hidden md:block">
                <div className="sticky top-42">
                  <LeadForm pageSlug={resolvedParams.slug} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      <div id="testimonials-section" className="scroll-mt-40 lg:scroll-mt-44">
        <TestimonialsSection
          testimonials={testimonialsData2}
          title="Practical Learning. Experienced Faculty."
        />
      </div>

      {/* Placement Partners Section */}
      <div id="placements-section" className="scroll-mt-40 lg:scroll-mt-44">
        <PlacementPartners />
      </div>

      {/* Team Section */}
      <TeamSection style="h2t-program mb-3" />

      {/* Main CTA Section - From Backend */}
      {mainCtaSection && renderSectionContent(mainCtaSection)}

      {/* Other Sections - Full Width */}
      {otherSections.map((section) => renderSectionContent(section))}
    </main>
  );
}
