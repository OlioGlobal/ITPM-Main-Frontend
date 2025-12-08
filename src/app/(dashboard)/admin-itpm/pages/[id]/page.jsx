"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPageById,
  updateSection,
  deleteSection,
  clearCurrentPage,
} from "@/redux/slices/pageSlice";
import { toast } from "sonner";
import { ArrowLeft, Edit } from "lucide-react";
import SectionCard from "@/components/dashboard/admin/SectionCard";
import AddSectionDropdown from "@/components/dashboard/admin/AddSectionDropdown";
import PageFormModal from "@/components/dashboard/admin/PageFormModal";

// Section modals
import BannerSectionModal from "@/components/dashboard/admin/BannerSectionModal";
import DescriptionSectionModal from "@/components/dashboard/admin/DescriptionSectionModal";
import PrerequisitesSectionModal from "@/components/dashboard/admin/sections/PrerequisitesSectionModal";
import AccordionSectionModal from "@/components/dashboard/admin/sections/AccordionSectionModal";
import SkillsSectionModal from "@/components/dashboard/admin/sections/SkillsSectionModal";
import CourseInfoSectionModal from "@/components/dashboard/admin/sections/CourseInfoSectionModal";
import SimilarCoursesSectionModal from "@/components/dashboard/admin/sections/SimilarCoursesSectionModal";
import MainCtaSectionModal from "@/components/dashboard/admin/sections/MainCtaSectionModal";
import CourseCtaSectionModal from "@/components/dashboard/admin/sections/CourseCtaSectionModal";
import FeatureCardModal from "@/components/dashboard/admin/sections/FeatureCardModal";
export default function PageBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentPage, currentSections, loading } = useSelector(
    (state) => state.pages
  );

  const [isPageModalOpen, setIsPageModalOpen] = useState(false);
  const [sectionModal, setSectionModal] = useState({
    isOpen: false,
    type: null,
    section: null,
  });

  useEffect(() => {
    if (params.id) {
      dispatch(fetchPageById(params.id));
    }

    return () => {
      dispatch(clearCurrentPage());
    };
  }, [params.id, dispatch]);

  const handleAddSection = (type) => {
    setSectionModal({ isOpen: true, type, section: null });
  };

  const handleEditSection = (section) => {
    setSectionModal({ isOpen: true, type: section.sectionType, section });
  };

  const handleDeleteSection = async (section) => {
    if (window.confirm("Are you sure you want to delete this section?")) {
      try {
        await dispatch(deleteSection(section._id)).unwrap();
        toast.success("Section deleted successfully");
      } catch (error) {
        toast.error(error || "Failed to delete section");
      }
    }
  };

  const handleToggleActive = async (section) => {
    try {
      await dispatch(
        updateSection({
          id: section._id,
          data: { isActive: !section.isActive },
        })
      ).unwrap();
      toast.success(
        `Section ${section.isActive ? "deactivated" : "activated"}`
      );
    } catch (error) {
      toast.error(error || "Failed to update section");
    }
  };

  const closeSectionModal = () => {
    setSectionModal({ isOpen: false, type: null, section: null });
  };

  if (loading && !currentPage) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!currentPage) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Page not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/admin-itpm")}
            className="p-2 text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {currentPage.title}
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              /{currentPage.slug} • {currentPage.status}
              {currentPage.categoryId && ` • ${currentPage.categoryId.name}`}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsPageModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <Edit size={18} />
          Edit Page Info
        </button>
      </div>

      {/* Sections Header */}
      <div className="flex items-center justify-between bg-white border border-gray-200 p-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Page Sections</h2>
          <p className="text-sm text-gray-600 mt-0.5">
            {currentSections.length} section
            {currentSections.length !== 1 ? "s" : ""}
          </p>
        </div>
        <AddSectionDropdown onSelect={handleAddSection} />
      </div>

      {/* Sections List */}
      {currentSections.length === 0 ? (
        <div className="bg-white border border-gray-200 p-12 text-center">
          <p className="text-gray-600 mb-4">
            No sections yet. Add your first section to get started.
          </p>
          <AddSectionDropdown onSelect={handleAddSection} />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {currentSections.map((section) => (
            <SectionCard
              key={section._id}
              section={section}
              onEdit={handleEditSection}
              onDelete={handleDeleteSection}
              onToggleActive={handleToggleActive}
            />
          ))}
        </div>
      )}

      {/* Page Edit Modal */}
      <PageFormModal
        isOpen={isPageModalOpen}
        onClose={() => setIsPageModalOpen(false)}
        page={currentPage}
      />

      {/* Section Modals */}
      {sectionModal.isOpen && sectionModal.type === "banner" && (
        <BannerSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "description" && (
        <DescriptionSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "prerequisites" && (
        <PrerequisitesSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "accordion" && (
        <AccordionSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "skills" && (
        <SkillsSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "course_info" && (
        <CourseInfoSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "similar_courses" && (
        <SimilarCoursesSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "main_cta" && (
        <MainCtaSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "course_cta" && (
        <CourseCtaSectionModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}

      {sectionModal.isOpen && sectionModal.type === "feature_card" && (
        <FeatureCardModal
          isOpen={sectionModal.isOpen}
          onClose={closeSectionModal}
          pageId={params.id}
          section={sectionModal.section}
        />
      )}
    </div>
  );
}
