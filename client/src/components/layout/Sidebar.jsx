import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaPlusCircle,
  FaChartPie,
  FaBriefcase,
} from "react-icons/fa";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaHome />,
    },
    {
      name: "Add Job",
      path: "/add-job",
      icon: <FaPlusCircle />,
    },
  ];

  return (
    <aside className="w-72 min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col transition-colors duration-300">
      
      {/* Logo */}
      <div className="px-8 py-8 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-4 rounded-2xl shadow-lg">
            <FaBriefcase className="text-white text-2xl" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              JobTrack Pro
            </h1>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Internship Tracker
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-6 py-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-5">
          Main Menu
        </p>

        <div className="space-y-3">
          {menuItems.map((item) => {
            const active = location.pathname === item.path;

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 ${
                  active
                    ? "bg-blue-600 text-white shadow-lg"
                    : "text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                <span className="text-xl">{item.icon}</span>

                <span className="font-semibold">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Analytics Preview */}
        <div className="mt-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-6 text-white shadow-xl">
          <FaChartPie className="text-3xl mb-4" />

          <h3 className="text-lg font-bold">
            Analytics
          </h3>

          <p className="text-sm text-blue-100 mt-2">
            Charts and detailed insights are coming soon.
          </p>
        </div>
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl p-4 transition-colors">
          <p className="font-semibold text-gray-700 dark:text-white">
            🚀 Keep Applying
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Every application gets you one step closer to your dream job.
          </p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;