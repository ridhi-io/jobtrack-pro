import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

export default function DashboardHeader({ user }) {
  const navigate = useNavigate();

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        rounded-3xl
        border border-gray-200 dark:border-white/5
        bg-gradient-to-br
        from-white
        via-white
        to-slate-50
        dark:from-[#171821]
        dark:via-[#171821]
        dark:to-[#111218]
        shadow-md
        dark:shadow-none
        p-8
        transition-all duration-300
      "
    >
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

        <div>

          <p className="text-violet-500 dark:text-violet-400 font-medium">
            Internship Dashboard
          </p>

          <h1 className="mt-2 text-4xl font-bold text-gray-900 dark:text-white">
            {greeting},{" "}
            <span className="text-violet-500 dark:text-violet-400">
              {user?.name?.split(" ")[0]}
            </span>{" "}
            👋
          </h1>

          <p className="mt-4 max-w-xl leading-7 text-gray-600 dark:text-gray-400">
            Track every internship application, monitor interviews,
            and stay one step closer to your dream offer.
          </p>

        </div>

        <Button
          onClick={() => navigate("/add-job")}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Application
        </Button>

      </div>
    </motion.div>
  );
}