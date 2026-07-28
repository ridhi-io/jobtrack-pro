import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import Button from "../../ui/Button";

import {
  BriefcaseBusiness,
  Search,
  Bell,
  Sun,
  Moon,
  LogOut,
  Plus,
} from "lucide-react";

export default function Navbar() {
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200 dark:border-white/5 bg-white dark:bg-[#09090B] transition-colors duration-300">
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-700 flex items-center justify-center shadow-lg">
          <BriefcaseBusiness className="text-white w-7 h-7" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {greeting}{" "}
            <span className="text-violet-500">
              {user?.name?.split(" ")[0]}
            </span>{" "}
            👋
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            {today}
          </p>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="hidden lg:flex items-center gap-3 bg-gray-50 dark:bg-[#171821] border border-gray-200 dark:border-white/5 rounded-2xl px-4 py-3 w-72 transition-colors"
        >
          <Search className="text-gray-500 w-5 h-5" />

          <input
            placeholder="Search companies..."
            className="bg-transparent outline-none text-gray-900 dark:text-white placeholder:text-gray-500 flex-1"
          />
        </motion.div>

        {/* Notification */}
        <button
          className="
          w-12 h-12
          rounded-2xl
          bg-white dark:bg-[#171821]
          border border-gray-200 dark:border-white/5
          shadow-sm dark:shadow-none
          flex items-center justify-center
          hover:border-violet-500
          transition
        "
        >
          <Bell className="text-gray-700 dark:text-gray-300 w-5 h-5" />
        </button>

        {/* Theme */}
        <button
          onClick={toggleTheme}
          className="
          w-12 h-12
          rounded-2xl
          bg-white dark:bg-[#171821]
          border border-gray-200 dark:border-white/5
          shadow-sm dark:shadow-none
          flex items-center justify-center
          hover:border-violet-500
          transition
        "
        >
          {darkMode ? (
            <Sun className="text-yellow-400 w-5 h-5" />
          ) : (
            <Moon className="text-gray-700 w-5 h-5" />
          )}
        </button>

        {/* Add Job */}
        <Button
          onClick={() => navigate("/add-job")}
          className="flex items-center gap-2"
        >
          <Plus size={18} />
          Add Job
        </Button>

        {/* User */}
        <div
          className="
          flex items-center gap-3
          rounded-2xl
          bg-white dark:bg-[#171821]
          border border-gray-200 dark:border-white/5
          shadow-sm dark:shadow-none
          px-3 py-2
        "
        >
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center text-white font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden xl:block">
            <p className="text-gray-900 dark:text-white font-medium">
              {user?.name}
            </p>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="
          w-12 h-12
          rounded-2xl
          bg-red-50 dark:bg-red-500/20
          border border-red-200 dark:border-red-500/20
          flex items-center justify-center
          hover:bg-red-500
          hover:text-white
          transition
        "
        >
          <LogOut className="text-red-500 dark:text-red-400 w-5 h-5" />
        </button>
      </div>
    </header>
  );
}