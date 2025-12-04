import { Play, Sparkles, MessageCircle, Download, Award } from "lucide-react";

// Icon mapping
const iconMap = {
  play: Play,
  sparkles: Sparkles,
  message: MessageCircle,
  download: Download,
  award: Award,
};

export default function CourseInfoSection({ data }) {
  return (
    <div>
      {data.title && <h2 className="h2t-program mb-6">{data.title}</h2>}
      {data.description && <p className="para mb-6">{data.description}</p>}
      {data.features && data.features.length > 0 && (
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {data.features.map((feature, idx) => {
            const IconComponent = feature.icon?.url
              ? null
              : iconMap[feature.iconType] || Play;

            return (
              <div key={idx} className="flex items-start gap-4 min-w-0">
                {/* Icon */}
                <div className="flex-shrink-0 mt-0.5">
                  {feature.icon?.url ? (
                    <img
                      src={feature.icon.url}
                      alt=""
                      className="w-5 h-5 object-contain"
                    />
                  ) : IconComponent ? (
                    <IconComponent className="w-5 h-5 text-gray-600" />
                  ) : (
                    <Play className="w-5 h-5 text-gray-600" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  {feature.description && (
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
