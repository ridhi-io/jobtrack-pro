import { cn } from "../utils/cn";

export default function Badge({
  children,
  variant = "default",
}) {
  const variants = {
    default: "bg-gray-700 text-white",
    applied: "bg-blue-500/20 text-blue-400",
    interview: "bg-yellow-500/20 text-yellow-400",
    offer: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        variants[variant]
      )}
    >
      {children}
    </span>
  );
}