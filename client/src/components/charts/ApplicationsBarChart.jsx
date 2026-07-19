import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function ApplicationsBarChart({ applications }) {
  const statuses = [
    "Applied",
    "Interview",
    "Offer",
    "Rejected",
    "Wishlist",
  ];

  const data = statuses.map((status) => ({
    status,
    count: applications.filter(
      (app) => app.status === status
    ).length,
  }));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full transition-colors duration-300">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Status Overview
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Compare applications across all stages.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#374151"
          />

          <XAxis
            dataKey="status"
            stroke="#9CA3AF"
          />

          <YAxis
            allowDecimals={false}
            stroke="#9CA3AF"
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
          />

          <Bar
            dataKey="count"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
            animationDuration={900}
          />

        </BarChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ApplicationsBarChart;