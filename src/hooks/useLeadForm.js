import { useState } from "react";
import { useForm } from "react-hook-form";

export default function useLeadForm({ pageSlug = "default", onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      city: "",
      education: "",
      passoutYear: "",
      itpCenter: "",
    },
  });

  const educationOptions = [
    { label: "BTech / BE (CS/IT)", value: "BTech-BE-CS-IT" },
    {
      label: "BTech / BE (Mechanical/Electrical/E&T)",
      value: "BTech-BE-Mech-Elec-EET",
    },
    { label: "BCA / MCA", value: "BCA-MCA" },
    { label: "BSc / MSc (Any Stream)", value: "Bsc-Msc-Any-Stream" },
    { label: "Other Engineering Degree", value: "Other-Engineering-Degree" },
    { label: "Graduation (Any Stream)", value: "Graduation-Any-Stream" },
    {
      label: "Diploma / Undergraduate / 12th",
      value: "Diploma-Undergraduate-12th",
    },
  ];

  const itpCenters = ["Shivajinagar, Pune", "Akurdi, PCMC"];

  const passoutYears = ["2021", "2022", "2023", "2024", "2025"];

  const getTrafficSource = () => {
    if (typeof window === "undefined") return "direct";

    const urlParams = new URLSearchParams(window.location.search);

    if (urlParams.get("utm_source")) return urlParams.get("utm_source");
    if (urlParams.get("source")) return urlParams.get("source");

    return "direct";
  };

  const onSubmit = async (data) => {
    setLoading(true);

    const submissionData = {
      ...data,
      pageSlug,
      trafficSource: getTrafficSource(),
      fullUrl: typeof window !== "undefined" ? window.location.href : "",
      submittedAt: new Date().toISOString(),
    };

    // Log form data
    console.log("Form Submitted:", submissionData);

    // Optional: Send to API
    try {
      // Uncomment when API is ready
      // const response = await fetch("/api/leads", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(submissionData),
      // });
      // const result = await response.json();

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Analytics tracking
      if (typeof window !== "undefined" && window.dataLayer) {
        window.dataLayer.push({
          event: "Lead_Form_Submit",
          pageSlug,
          formData: submissionData,
        });
      }

      setSuccess(true);

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(submissionData);
      }

      // Reset form after 2 seconds
      setTimeout(() => {
        reset();
        setSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    success,
    formValues: watch(),
    educationOptions,
    itpCenters,
    passoutYears,
    reset,
  };
}
