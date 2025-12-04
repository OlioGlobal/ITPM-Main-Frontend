export default function SkillsSection({ data }) {
  return (
    <div>
      {data.title && <h2 className="h2t-program mb-6">{data.title}</h2>}
      {data.description && (
        <p className="text-gray-700 mb-6">{data.description}</p>
      )}
      {data.skills && data.skills.length > 0 && (
        <div className="flex flex-wrap gap-2 md:gap-3">
          {data.skills.map((skill, idx) => (
            <span
              key={idx}
              className="inline-block px-5 py-2.5 bg-[#E9EDE5] text-[#6B6978] text-[16px] font-medium rounded-full border border-[#B8B8B8] hover:bg-[#017D3E] hover:text-white hover:border-[#017D3E] transition-all duration-300 cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
