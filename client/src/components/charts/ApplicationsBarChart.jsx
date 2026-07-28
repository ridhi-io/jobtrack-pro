import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from "recharts";

import { motion } from "framer-motion";
import Card from "../../ui/Card";
import { BarChart3 } from "lucide-react";

export default function ApplicationsBarChart({ applications }) {
  const dark = document.documentElement.classList.contains("dark");

  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
    "Wishlist",
  ];

  const colors = [
    "#3B82F6",
    "#F59E0B",
    "#22C55E",
    "#EF4444",
    "#8B5CF6",
  ];

  const data = statuses.map((status) => ({
    status,
    count: applications.filter(
      (app) => app.status === status
    ).length,
  }));

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
              Applications by Status
            </h2>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Distribution across every hiring stage.
            </p>

          </div>

          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg">
            <BarChart3 className="h-7 w-7 text-white" />
          </div>

        </div>

        <ResponsiveContainer width="100%" height={340}>

          <BarChart data={data}>

            <CartesianGrid
              vertical={false}
              strokeDasharray="5 5"
              stroke={dark ? "#2B2D3A" : "#E5E7EB"}
            />

            <XAxis
              dataKey="status"
              axisLine={false}
              tickLine={false}
              tick={{
                fill: dark ? "#9CA3AF" : "#4B5563",
                fontSize: 13,
              }}
            />

            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{
                fill: dark ? "#9CA3AF" : "#4B5563",
                fontSize: 13,
              }}
            />

            <Tooltip
              cursor={{
                fill: dark
                  ? "rgba(255,255,255,.04)"
                  : "rgba(0,0,0,.04)",
              }}
              contentStyle={{
                background: dark ? "#171821" : "#FFFFFF",
                color: dark ? "#FFFFFF" : "#111827",
                border: dark
                  ? "1px solid rgba(255,255,255,.08)"
                  : "1px solid #E5E7EB",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,.12)",
              }}
            />

            <Bar
              dataKey="count"
              radius={[12, 12, 0, 0]}
              animationDuration={1000}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.status}
                  fill={colors[index]}
                />
              ))}
            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </Card>

    </motion.div>
  );
}