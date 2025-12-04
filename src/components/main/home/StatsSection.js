import Image from "next/image";

const statsData = [
  {
    id: 1,
    icon: "/logo/s11.png",
    title: "9M+ Students Joined",
    subtitle: "& we are still counting",
  },
  {
    id: 2,
    icon: "/logo/s11.png",
    title: "4.6 Ratings on Google",
    subtitle: "1K plus Reviews",
  },
  {
    id: 3,
    icon: "/logo/s11.png",
    title: "Industry Recognized",
    subtitle: "Certification",
  },
  {
    id: 4,
    icon: "/logo/s11.png",
    title: "100% Job Guarantee",
    subtitle: "Programs & Courses",
  },
  {
    id: 5,
    icon: "/logo/s11.png",
    title: "9M+ Students Joined",
    subtitle: "& we are still counting",
  },
  {
    id: 6,
    icon: "/logo/s11.png",
    title: "35LPA Highest Salary",
    subtitle: "1K plus Reviews",
  },
];

const StatsSection = ({ style = "" }) => {
  return (
    <section className={`${style}`}>
      <div className="max pad">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {statsData.map((stat) => (
            <div
              key={stat.id}
              className="flex bg-white backdrop-blur-[33px] items-center gap-4 p-4 md:p-6 rounded-[15px] border border-[#DEDEDE] hover:shadow-md transition-shadow"
            >
              {/* Icon */}
              <div className="flex-shrink-0 p-2 bg-[#F4F4F4] rounded-[15px]">
                <Image
                  src={stat.icon}
                  alt={stat.title}
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>

              {/* Content */}
              <div>
                <h3
                  className="general text-[18px] md:text-[24px] font-medium leading-[130%] mb-1 "
                  style={{ color: "var(--brand-dark)" }}
                >
                  {stat.title}
                </h3>
                <p className="text-[16px] text-[#6B6978] font-normal">
                  {stat.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
