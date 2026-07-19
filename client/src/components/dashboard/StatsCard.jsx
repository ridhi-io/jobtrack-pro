import {
  Briefcase,
  CalendarClock,
  Trophy,
  XCircle,
} from "lucide-react";

function StatsCard({ title, value, color }) {
  const styles = {
    blue: {
      bg: "bg-blue-50 dark:bg-blue-950/40",
      iconBg: "bg-blue-500",
      text: "text-blue-600 dark:text-blue-400",
      icon: <Briefcase size={24} />,
    },

    yellow: {
      bg: "bg-yellow-50 dark:bg-yellow-950/40",
      iconBg: "bg-yellow-500",
      text: "text-yellow-600 dark:text-yellow-400",
      icon: <CalendarClock size={24} />,
    },

    green: {
      bg: "bg-green-50 dark:bg-green-950/40",
      iconBg: "bg-green-500",
      text: "text-green-600 dark:text-green-400",
      icon: <Trophy size={24} />,
    },

    red: {
      bg: "bg-red-50 dark:bg-red-950/40",
      iconBg: "bg-red-500",
      text: "text-red-600 dark:text-red-400",
      icon: <XCircle size={24} />,
    },
  };

  const currentStyle = styles[color] || styles.blue;

  return (
    <div
      className={`
        ${currentStyle.bg}
        rounded-2xl
        p-6
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-1
        transition-all
        duration-300
        border
        border-gray-100
        dark:border-gray-700
      `}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
            {title}
          </p>

          <h2 className={`text-4xl font-bold mt-3 ${currentStyle.text}`}>
            {value}
          </h2>

          <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
            Live Count
          </p>
        </div>

        <div
          className={`
            ${currentStyle.iconBg}
            w-14
            h-14
            rounded-xl
            flex
            items-center
            justify-center
            text-white
            shadow-lg
          `}
        >
          {currentStyle.icon}
        </div>
      </div>
    </div>
  );
}

export default StatsCard;