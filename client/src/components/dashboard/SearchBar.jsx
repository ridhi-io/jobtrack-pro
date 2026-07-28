import { Search, X } from "lucide-react";
import { motion } from "framer-motion";

export default function SearchBar({
  searchTerm,
  setSearchTerm,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative w-full"
    >
      {/* Search Icon */}
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      {/* Input */}
      <input
        type="text"
        placeholder="Search company, role..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="
          w-full
          h-12
          rounded-2xl
          bg-white dark:bg-[#171821]
          border
          border-gray-200 dark:border-white/5
          pl-11
          pr-11
          text-white
          placeholder:text-gray-500
          outline-none
          transition-all
          duration-300
          focus:border-violet-500
          focus:ring-4
          focus:ring-violet-500/10
        "
      />

      {/* Clear Button */}
      {searchTerm && (
        <button
          onClick={() => setSearchTerm("")}
          className="
            absolute
            right-3
            top-1/2
            -translate-y-1/2
            w-8
            h-8
            rounded-full
            hover:bg-white/5
            transition
            flex
            items-center
            justify-center
          "
        >
          <X
            size={16}
            className="text-gray-500 dark:text-gray-400 hover:text-white"
          />
        </button>
      )}
    </motion.div>
  );
}