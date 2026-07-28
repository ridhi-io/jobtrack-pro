import { motion } from "framer-motion";

const filters = [
  "All",
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
  "Wishlist",
];

const colors = {
  All: "from-slate-500 to-slate-700",
  Applied: "from-blue-500 to-blue-700",
  Interview: "from-amber-500 to-orange-600",
  Offer: "from-green-500 to-green-700",
  Rejected: "from-red-500 to-red-700",
  Wishlist: "from-violet-500 to-purple-700",
};

export default function StatusFilter({
  statusFilter,
  setStatusFilter,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {filters.map((filter) => {

        const active = statusFilter === filter;

        return (
          <motion.button
            key={filter}
            whileTap={{ scale: 0.96 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.15 }}
            onClick={() => setStatusFilter(filter)}
            className={`
              px-5
              py-2.5
              rounded-2xl
              text-sm
              font-medium
              transition-all
              duration-300
              border

              ${
                active
                  ? `bg-gradient-to-r ${colors[filter]}
                     text-white
                     border-transparent
                     shadow-lg`
                  : `bg-white dark:bg-[#171821]
                     border-gray-200 dark:border-white/5
                     text-gray-500 dark:text-gray-400
                     hover:text-white
                     hover:border-violet-500/40
                     hover:bg-[#1B1C26]`
              }
            `}
          >
            {filter}
          </motion.button>
        );
      })}

    </div>
  );
}