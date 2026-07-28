import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  PlusCircle,
  CalendarDays,
  Settings,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Applications",
      path: "/dashboard",
      icon: BriefcaseBusiness,
    },
    {
      title: "Add Job",
      path: "/add-job",
      icon: PlusCircle,
    },
    {
      title: "Calendar",
      path: "/calendar",
      icon: CalendarDays,
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-[290px] min-h-screen bg-white dark:bg-[#111218] border-r border-gray-200 dark:border-white/5 flex flex-col justify-between p-6 transition-colors duration-300">
      <div>
        {/* Logo */}

        <div className="flex items-center gap-4 mb-12">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center shadow-xl">
            <BriefcaseBusiness className="text-white w-7 h-7" />
          </div>

          <div>
            <h1 className="text-gray-900 dark:text-white text-2xl font-bold">
              JobTrack
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Internship OS
            </p>
          </div>
        </div>

        {/* Navigation */}

        <div className="space-y-3">
          {menuItems.map((item) => {
            const ActiveIcon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link key={item.title} to={item.path}>
                <motion.div
                  whileHover={{ x: 5, scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className={`group flex items-center justify-between rounded-2xl px-5 py-4 transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-violet-600 to-purple-600 shadow-lg"
                      : "hover:bg-gray-100 dark:hover:bg-[#1A1B23]"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <ActiveIcon
                      className={`w-5 h-5 ${
                        active
                          ? "text-white"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-violet-500"
                      }`}
                    />

                    <span
                      className={`font-medium ${
                        active
                          ? "text-white"
                          : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {item.title}
                    </span>
                  </div>

                  <ChevronRight
                    className={`w-4 h-4 ${
                      active
                        ? "text-white"
                        : "text-gray-400 dark:text-gray-500"
                    }`}
                  />
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Weekly Goal */}

        <div className="mt-10 rounded-3xl border border-gray-200 dark:border-none bg-white dark:bg-gradient-to-br dark:from-violet-600 dark:to-indigo-700 shadow-sm dark:shadow-lg p-6 transition-colors duration-300">
          <p className="font-semibold text-gray-900 dark:text-white">
            Weekly Goal
          </p>

          <h2 className="text-4xl font-bold mt-3 text-violet-600 dark:text-white">
            3/5
          </h2>

          <p className="text-gray-500 dark:text-violet-100 text-sm mt-2">
            Applications submitted this week.
          </p>

          <div className="mt-6 w-full h-3 rounded-full bg-gray-200 dark:bg-white/20">
            <div className="w-3/5 h-full rounded-full bg-violet-600 dark:bg-white"></div>
          </div>
        </div>
      </div>

      {/* Bottom Card */}

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="rounded-3xl bg-white dark:bg-[#181922] border border-gray-200 dark:border-white/5 shadow-sm dark:shadow-none p-5 transition-colors duration-300"
      >
        <p className="text-gray-900 dark:text-white font-semibold">
          🚀 Stay Consistent
        </p>

        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 leading-6">
          Every internship application increases your chances.
          Small progress every day compounds into big results.
        </p>
      </motion.div>
    </aside>
  );
}