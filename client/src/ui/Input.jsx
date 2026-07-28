import { cn } from "../utils/cn";

export default function Input({
  label,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <input
        {...props}
        className={cn(
          "w-full rounded-2xl border border-white/10",
          "bg-gray-50 dark:bg-[#111218]",
          "px-4 py-3",
          "text-white",
          "placeholder:text-gray-500",
          "outline-none",
          "transition-all duration-300",
          "focus:border-violet-500",
          "focus:ring-2 focus:ring-violet-500/30",
          className
        )}
      />

      {error && (
        <span className="text-sm text-red-400">
          {error}
        </span>
      )}
    </div>
  );
}