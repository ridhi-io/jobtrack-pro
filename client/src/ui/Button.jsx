import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:shadow-[0_0_20px_rgba(139,92,246,0.45)]",

    secondary:
      "bg-[#1A1B23] text-white border border-white/10 hover:bg-[#23242d]",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.03 } : {}}
      whileTap={!disabled ? { scale: 0.97 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "px-5 py-3 rounded-2xl font-medium transition-all duration-300",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.button>
  );
}