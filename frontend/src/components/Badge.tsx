import { Sparkles } from "lucide-react";

type BadgeProps = {
  text: string;
};

function Badge({ text }: BadgeProps) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-5 py-2 shadow-sm">
      <Sparkles className="text-blue-600" size={18} />

      <span className="font-medium text-blue-700">
        {text}
      </span>
    </div>
  );
}

export default Badge;