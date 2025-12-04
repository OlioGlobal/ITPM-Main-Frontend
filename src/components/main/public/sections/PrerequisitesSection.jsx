import { Check } from "lucide-react";

export default function PrerequisitesSection({ data }) {
  return (
    <div>
      {data.title && <h2 className="h2t-program mb-6">{data.title}</h2>}
      {data.description && <p className="para mb-6">{data.description}</p>}
      {data.points && data.points.length > 0 && (
        <ul className="space-y-4">
          {data.points.map((point, idx) => (
            <li key={idx} className="flex items-start gap-4">
              <div className="flex-shrink-0 w-7 h-7 rounded-full bg-[#017D3E] flex items-center justify-center mt-0.5">
                <Check className="w-4 h-4 text-white" strokeWidth={3} />
              </div>
              <span className="text-[#6B6978] text-[16px] md:text-[18px] leading-[160%]">
                {point}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
