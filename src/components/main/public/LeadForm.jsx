"use client";
import Image from "next/image";
import useLeadForm from "../../../hooks/useLeadForm";

export default function LeadForm({
  pageSlug = "default",
  formTitle = "Register For Free",
  formDescription = null,
  onSuccess,
}) {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    success,
    formValues,
    educationOptions,
    itpCenters,
    passoutYears,
  } = useLeadForm({ pageSlug, onSuccess });

  if (success) {
    return (
      <div className="flex items-center justify-center w-full">
        <div
          style={{ background: "#E5E8ED" }}
          className="p-6 rounded-[5px] shadow-md w-full"
        >
          <div className="flex flex-col items-center gap-3 text-center py-8">
            <div className="w-20 h-20 rounded-full bg-[#E5E8ED] flex items-center justify-center">
              <svg
                viewBox="0 0 48 48"
                width="48"
                height="48"
                aria-hidden="true"
                role="img"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="#D1FAE5"
                  strokeWidth="8"
                />
                <path
                  d="M14 25 L21 32 L34 18"
                  fill="none"
                  stroke="#16A34A"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-gray-900">
                Submission Successful
              </h4>
              <p className="text-sm text-gray-600">
                Your form has been submitted successfully.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full">
      <div
        style={{ background: "#F5F7F8" }}
        className="p-4 sm:p-6 rounded-[5px] shadow-md w-full backdrop-blur-[23.2px]"
      >
        {/* Header */}
        <div className="mb-5">
          <h2 className="text-[16px] leading-[100%] font-semibold text-[#143119]">
            {formTitle}
          </h2>
          <p className="text-[#0a1f14]">{formDescription}</p>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* First Row: Name and City */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border text-black border-[#B8D0C4] rounded-[5px] px-3 pt-5 pb-2 focus:outline-none focus:ring-1 focus:ring-green-600 peer"
                placeholder=" "
              />
              <label className="absolute text-[14px] text-gray-500 duration-300 transform -translate-y-3 scale-90 top-2 z-10 origin-[0] left-3 bg-[#F5F7F8] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:top-2 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:top-2 pointer-events-none">
                Enter Full Name
              </label>
              {errors.name && (
                <p className="text-red-600 text-[14px] mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* City Field */}
            <div className="relative">
              <input
                type="text"
                {...register("city", { required: "City is required" })}
                className="w-full border text-black border-[#B8D0C4] rounded-[5px] px-3 pt-5 pb-2 focus:outline-none focus:ring-1 focus:ring-green-600 peer"
                placeholder=" "
              />
              <label className="absolute text-[14px] text-gray-500 duration-300 transform -translate-y-3 scale-90 top-2 z-10 origin-[0] left-3 bg-[#F5F7F8] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:top-2 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:top-2 pointer-events-none">
                Enter City
              </label>
              {errors.city && (
                <p className="text-red-600 text-[14px] mt-1">
                  {errors.city.message}
                </p>
              )}
            </div>
          </div>

          {/* Second Row: Mobile and Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Mobile Field */}
            <div className="relative">
              <input
                type="text"
                maxLength={10}
                {...register("mobile", {
                  required: "Mobile number is required",
                  pattern: {
                    value: /^[6-9]\d{9}$/,
                    message: "Enter Valid Mobile Number",
                  },
                })}
                className="w-full border text-black border-[#B8D0C4] rounded-[5px] px-3 pt-5 pb-2 focus:outline-none focus:ring-1 focus:ring-green-600 peer"
                placeholder=" "
              />
              <label className="absolute text-[14px] text-gray-500 duration-300 transform -translate-y-3 scale-90 top-2 z-10 origin-[0] left-3 bg-[#F5F7F8] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:top-2 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:top-2 pointer-events-none">
                Enter Mobile
              </label>
              {errors.mobile && (
                <p className="text-red-600 text-[14px] mt-1">
                  {errors.mobile.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email is invalid",
                  },
                })}
                className="w-full border text-black border-[#B8D0C4] rounded-[5px] px-3 pt-5 pb-2 focus:outline-none focus:ring-1 focus:ring-green-600 peer"
                placeholder=" "
              />
              <label className="absolute text-[14px] text-gray-500 duration-300 transform -translate-y-3 scale-90 top-2 z-10 origin-[0] left-3 bg-[#F5F7F8] px-1 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:top-2 peer-focus:scale-90 peer-focus:-translate-y-3 peer-focus:top-2 pointer-events-none">
                Enter Email Address
              </label>
              {errors.email && (
                <p className="text-red-600 text-[14px] mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Education Qualification - Full Width */}
          <div className="relative">
            <select
              {...register("education", {
                required: "Education is required",
              })}
              className={`w-full border text-[14px] border-[#B8D0C4] rounded-[5px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-green-600 appearance-none ${
                formValues.education ? "text-black" : "text-gray-500"
              }`}
              style={{ background: "#F5F7F8" }}
            >
              <option value="">Education Qualification</option>
              {educationOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                className="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
            {errors.education && (
              <p className="text-red-600 text-[14px] mt-1">
                {errors.education.message}
              </p>
            )}
          </div>

          {/* Third Row: Passout Year and ITP Center */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Passout Year Dropdown */}
            <div className="relative">
              <select
                {...register("passoutYear", {
                  required: "Passout Year is required",
                })}
                className={`w-full border  text-[14px] border-[#B8D0C4] rounded-[5px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-green-600 appearance-none ${
                  formValues.passoutYear ? "text-black" : "text-gray-500"
                }`}
                style={{ background: "#F5F7F8" }}
              >
                <option value="">Passout Year</option>
                {passoutYears.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              {errors.passoutYear && (
                <p className="text-red-600 text-[14px] mt-1">
                  {errors.passoutYear.message}
                </p>
              )}
            </div>

            {/* ITP Center Dropdown */}
            <div className="relative">
              <select
                {...register("itpCenter", {
                  required: "ITP Center is required",
                })}
                className={`w-full border  text-[14px] border-[#B8D0C4] rounded-[5px] px-4 py-3 focus:outline-none focus:ring-1 focus:ring-green-600 appearance-none ${
                  formValues.itpCenter ? "text-black" : "text-gray-500"
                }`}
                style={{ background: "#F5F7F8" }}
              >
                <option value="">Select ITP Center</option>
                {itpCenters.map((center, index) => (
                  <option key={index} value={center}>
                    {center}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
              {errors.itpCenter && (
                <p className="text-red-600 text-[14px] mt-1">
                  {errors.itpCenter.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full text-[15px]  text-white sm:text-[14px] cursor-pointer bg-[#017D3E] hover:bg-[#076b39] font-medium py-3 rounded-[5px] transition-all duration-300 disabled:opacity-50"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Submitting...
                </div>
              ) : (
                "Register Now"
              )}
            </button>
            <div className="flex items-center font-medium gap-2 border-red-300 text-red-500 text-[12px] mt-2">
              <span>
                *Minimum eligibility is graduation. Final-year students may also
                apply.
              </span>
            </div>
          </div>
        </form>

        {/* Footer Info */}
        <div className="flex items-center rounded-md bg-white px-3 py-2 w-full mt-4">
          <div className="flex -space-x-3 flex-shrink-0">
            <Image
              src="/logo/student-1.png"
              alt="Student 1"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <Image
              src="/logo/student-2.png"
              alt="Student 2"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
            <Image
              src="/logo/student-3.png"
              alt="Student 3"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          </div>
          <span className="ml-4 text-[15px] font-semibold text-[#133522]">
            <span className="text-[#017D3E]">12000+</span> Students Have
            Registered...
          </span>
        </div>
        <div className="text-black text-center mt-2 font-inter italic text-[14px] leading-[161%]">
          Limited Seats.{" "}
          <span className="font-bold not-italic">Register now.</span>
        </div>
      </div>
    </div>
  );
}
