import Image from "next/image";
import Link from "next/link";

const CTASection = () => {
  return (
    <section className="bg-[#85C325] max-w-[1770px] mx-auto overflow-hidden">
      <div className="flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="w-full lg:w-1/2 p-8 md:p-12 lg:pl-[max(1rem,calc((93vw-1280px)/2))] ">
          <div className="mb-6 md:mb-10">
            <h2 className=" mb-3  h2t font-medium text-[#143119] leading-[115.99999999999999%]">
              Turn Your
              <br />
              Degree into a Job.
              <br />
              Guaranteed.
            </h2>
            <p className="para">
              Join India’s Leading IT Training & Placement Institute 100% Job
              Guarantee | 1200+ Hiring Partners
            </p>
          </div>
          <Link href="/apply" className="btn md:px-[40px]! md:py-5!">
            Apply Now
          </Link>
        </div>

        {/* Right Image - Hidden on mobile */}
        <div className="hidden md:flex w-full lg:w-1/2 relative h-[400px] justify-end">
          <Image
            src="/logo/cta2.png"
            alt="Career Success"
            fill
            className="object-contain object-right"
          />
        </div>
      </div>
    </section>
  );
};

export default CTASection;
