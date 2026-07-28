import { motion } from "framer-motion";
import { cn } from "../utils/cn";

export default function Card({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : {}}
      transition={{ duration: 0.2 }}
      className={cn(
        "rounded-3xl",
        "border-slate-200 dark:border-white/5",
        "bg-white dark:bg-[#171821]",
        "shadow-md dark:shadow-lg",
        "p-6",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
