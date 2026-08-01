import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function Card({
  children,
  className = "",
  hover = true,
  darkOnly = false,
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-3xl",

        darkOnly
          ? "bg-[#171821] border-white/5 shadow-lg"
          : "bg-white dark:bg-[#171821] border-slate-200 dark:border-white/5 shadow-md dark:shadow-lg",

        "p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}