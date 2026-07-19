import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#FACC15",
  "#22C55E",
  "#EF4444",
  "#8B5CF6",
];

function StatusPieChart({ applications }) {
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

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 h-full transition-colors duration-300">

      <div className="mb-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Status Distribution
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          See how your applications are progressing.
        </p>
      </div>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>

          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            labelLine={false}
            animationDuration={900}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              borderRadius: "10px",
              color: "#fff",
            }}
          />

          <Legend />

        </PieChart>
      </ResponsiveContainer>

    </div>
  );
}

export default StatusPieChart;