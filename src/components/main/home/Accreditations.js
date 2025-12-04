import Image from "next/image";

const accreditations = [
  {
    id: 1,
    logo: "/temp/AICTE.png",
    name: (
      <span>
        AICTE <br /> Certification
      </span>
    ),
  },
  {
    id: 2,
    logo: "/temp/AICTE.png",
    name: (
      <span>
        ISO <br /> Certification
      </span>
    ),
  },
  {
    id: 3,
    logo: "/temp/AICTE.png",
    name: (
      <span>
        NSDC <br /> Certification
      </span>
    ),
  },
  {
    id: 4,
    logo: "/temp/AICTE.png",
    name: (
      <span>
        Government <br /> Approved
      </span>
    ),
  },
  {
    id: 5,
    logo: "/temp/AICTE.png",
    name: (
      <span>
        Industry <br /> Partner
      </span>
    ),
  },
  {
    id: 6,
    logo: "/temp/AICTE.png",
    name: (
      <span>
        Quality <br /> Assured
      </span>
    ),
  },
];

const Accreditations = () => {
  return (
    <section className="rm bg-white">
      <div className="max-w-7xl mx-auto pad">
        {/* Header */}
        <h2 className="h3t text-center mb-10">Our Accreditations</h2>

        {/* Accreditation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {accreditations.map((accreditation) => (
            <div key={accreditation.id} className="flex flex-col items-center">
              {/* Logo Circle */}
              <div className=" h-32 w-32 md:w-40 md:h-40 rounded-full bg-[#E9EDE5] flex items-center justify-center mb-4 p-3">
                <Image
                  src={accreditation.logo}
                  alt={accreditation.name}
                  width={200}
                  height={200}
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
