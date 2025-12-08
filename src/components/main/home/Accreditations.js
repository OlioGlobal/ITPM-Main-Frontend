import Image from "next/image";

const accreditations = [
  {
    id: 1,
    logo: "/logo/aicte.png",
    name: (
      <span>
        All India Council <br /> for Technical <br /> Education
      </span>
    ),
  },
  {
    id: 2,
    logo: "/logo/nsdc-logo.png",
    name: (
      <span>
        National Skill <br /> Development Corporation (NSDC)
      </span>
    ),
  },
  {
    id: 3,
    logo: "/logo/aictsd-logo.png",
    name: (
      <span>
        All India Council <br /> for Technical Skill Development
      </span>
    ),
  },
  {
    id: 4,
    logo: "/logo/skill-india-logo.png",
    name: (
      <span>
        National Skills Development Mission <br /> of India
      </span>
    ),
  },
  {
    id: 5,
    logo: "/logo/iso.png",
    name: (
      <span>
        International <br /> Organization <br /> for Standardization
      </span>
    ),
  },
];

const Accreditations = () => {
  return (
    <section className="rm max bg-white">
      <div className="max-w-7xl mx-auto pad">
        {/* Header */}
        <h2 className="h3t text-center mb-10">Our Accreditations</h2>

        {/* Accreditation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {accreditations.map((accreditation) => (
            <div key={accreditation.id} className="flex flex-col items-center">
              {/* Logo Circle */}
              <div className=" h-32 w-32 md:w-36 md:h-36 rounded-full bg-[#E9EDE5] flex items-center justify-center mb-4 p-3">
                <Image
                  src={accreditation.logo}
                  alt={accreditation.name}
                  width={180}
                  height={180}
                  className="object-contain"
                />
              </div>

              {/* Name */}
              <p className="text-[16px] font-normal text-[#6B6978] text-center">
                {accreditation.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Accreditations;
