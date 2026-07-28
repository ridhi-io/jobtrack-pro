import { motion } from "framer-motion";
import Card from "../../ui/Card";
import {
  BriefcaseBusiness,
  CalendarClock,
  Trophy,
  XCircle,
  TrendingUp,
} from "lucide-react";

export default function StatsCard({ title, value, color }) {
  const styles = {
    blue: {
      gradient: "from-blue-500 to-cyan-500",
      icon: BriefcaseBusiness,
      text: "text-blue-400",
      trend: "+12%",
    },

    yellow: {
      gradient: "from-yellow-500 to-orange-500",
      icon: CalendarClock,
      text: "text-yellow-400",
      trend: "+8%",
    },

    green: {
      gradient: "from-green-500 to-emerald-500",
      icon: Trophy,
      text: "text-green-400",
      trend: "+18%",
    },

    red: {
      gradient: "from-red-500 to-pink-500",
      icon: XCircle,
      text: "text-red-400",
      trend: "-4%",
    },
  };

  const current = styles[color] || styles.blue;
  const Icon = current.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <Card className="relative overflow-hidden">

        {/* Glow */}

        <div
          className={`absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gradient-to-br ${current.gradient} opacity-10 blur-3xl`}
        />

        <div className="flex items-start justify-between">

          <div>

            <p className="text-sm text-gray-500 dark:text-gray-400">
              {title}
            </p>

            <h2 className="mt-3 text-5xl font-bold text-white">
              {value}
            </h2>

            <div className="mt-5 flex items-center gap-2">

              <TrendingUp
                className={`h-4 w-4 ${current.text}`}
              />

              <span
                className={`text-sm font-semibold ${current.text}`}
              >
                {current.trend}
              </span>

              <span className="text-sm text-gray-500">
                this week
              </span>

            </div>

          </div>

          <div
            className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${current.gradient} shadow-xl`}
          >
            <Icon className="h-8 w-8 text-white" />
          </div>

        </div>

      </Card>
    </motion.div>
  );
}