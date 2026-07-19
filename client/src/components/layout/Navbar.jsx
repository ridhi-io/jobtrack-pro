import {
  FaBriefcase,
  FaSignOutAlt,
  FaPlus,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
function Navbar() {
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

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 px-8 py-4 flex items-center justify-between transition-colors duration-300">
      
      {/* Left */}
      <div className="flex items-center gap-4">
        <div className="bg-blue-600 p-3 rounded-2xl shadow-md">
          <FaBriefcase className="text-white text-xl" />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {greeting}, {user?.name?.split(" ")[0]} 👋
          </h1>

          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {today}
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-yellow-400 hover:scale-105 transition"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        {/* Add Job */}
        <button
          onClick={() => navigate("/add-job")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl transition shadow-md"
        >
          <FaPlus />
          Add Job
        </button>

        {/* User */}
        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-xl transition-colors">
          <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div className="hidden md:block">
            <p className="font-semibold text-gray-800 dark:text-white">
              {user?.name}
            </p>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl transition shadow-md"
          title="Logout"
        >
          <FaSignOutAlt />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;