import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { motion } from "framer-motion";
import { PieChart as PieChartIcon } from "lucide-react";

import Card from "../../ui/Card";

const COLORS = [
  "#3B82F6",
  "#F59E0B",
  "#22C55E",
  "#EF4444",
  "#8B5CF6",
];

export default function StatusPieChart({ applications }) {
  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
    "Wishlist",
  ];

  const data = statuses.map((status) => ({
    name: status,
    value: applications.filter(
      (app) => app.status === status
    ).length,
  }));

  const totalApplications = applications.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div>

            <p className="text-sm font-medium text-violet-500 dark:text-violet-400">
              Analytics
            </p>

            <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              Status Distribution
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Overview of every application stage.
            </p>

          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg">
            <PieChartIcon className="h-7 w-7 text-white" />
          </div>

        </div>

        <div className="grid items-center gap-6 lg:grid-cols-2">

          {/* Chart */}

          <div className="h-[320px]">

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={70}
                  outerRadius={105}
                  paddingAngle={4}
                  animationDuration={1000}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={entry.name}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>

                <Tooltip
                  contentStyle={{
                    background:
                      document.documentElement.classList.contains("dark")
                        ? "#171821"
                        : "#ffffff",
                    border:
                      document.documentElement.classList.contains("dark")
                        ? "1px solid rgba(255,255,255,.08)"
                        : "1px solid #E5E7EB",
                    borderRadius: "16px",
                    color:
                      document.documentElement.classList.contains("dark")
                        ? "#ffffff"
                        : "#111827",
                    boxShadow: "0 10px 25px rgba(0,0,0,.12)",
                  }}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* Right Side */}

          <div className="space-y-5">

            <div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Applications
              </p>

              <h2 className="mt-2 text-5xl font-bold text-gray-900 dark:text-white">
                {totalApplications}
              </h2>

            </div>

            <div className="mt-8 space-y-3">

              {data.map((item, index) => (

                <div
                  key={item.name}
                  className="
                    flex items-center justify-between
                    rounded-2xl
                    border border-gray-200 dark:border-white/5
                    bg-gray-50 dark:bg-[#111218]
                    px-4 py-3
                    transition-colors
                  "
                >

                  <div className="flex items-center gap-3">

                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor: COLORS[index],
                      }}
                    />

                    <span className="font-medium text-gray-900 dark:text-white">
                      {item.name}
                    </span>

                  </div>

                  <span className="font-semibold text-gray-600 dark:text-gray-400">
                    {item.value}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

      </Card>

    </motion.div>
  );
}