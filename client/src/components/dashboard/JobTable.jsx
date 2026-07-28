import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  Calendar,
  MapPin,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";

const statusStyles = {
  Applied: {
    bg: "bg-blue-500/10",
    text: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500",
  },
  Interview: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-600 dark:text-yellow-400",
    dot: "bg-yellow-500",
  },
  Offer: {
    bg: "bg-green-500/10",
    text: "text-green-600 dark:text-green-400",
    dot: "bg-green-500",
  },
  Rejected: {
    bg: "bg-red-500/10",
    text: "text-red-600 dark:text-red-400",
    dot: "bg-red-500",
  },
  Wishlist: {
    bg: "bg-violet-500/10",
    text: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500",
  },
};

function StatusBadge({ status }) {
  const style =
    statusStyles[status] || {
      bg: "bg-gray-200 dark:bg-zinc-700/30",
      text: "text-gray-700 dark:text-zinc-300",
      dot: "bg-gray-500",
    };

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium ${style.bg} ${style.text}`}
    >
      <span className={`h-2 w-2 rounded-full ${style.dot}`} />
      {status}
    </div>
  );
}

function EmptyState() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-violet-500/10">
        <Building2
          size={36}
          className="text-violet-500 dark:text-violet-400"
        />
      </div>

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        No Applications Yet
      </h2>

      <p className="mt-3 max-w-md text-gray-600 dark:text-gray-400">
        Start tracking your internship journey.
        Add your first application and monitor every
        interview, offer and rejection from one place.
      </p>

      <button
        onClick={() => navigate("/add-job")}
        className="
          mt-8
          flex items-center gap-2
          rounded-2xl
          bg-violet-600
          px-6 py-3
          font-semibold
          text-white
          shadow-lg shadow-violet-600/20
          transition-all
          hover:scale-105
          hover:bg-violet-500
        "
      >
        <Plus size={18} />
        Add First Application
      </button>
    </div>
  );
}
function JobTable({ applications, onDelete }) {
  const navigate = useNavigate();

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="mt-10 overflow-hidden rounded-3xl border border-gray-200 dark:border-white/5 bg-white dark:bg-[#171821] shadow-xl dark:shadow-none">

      {/* Header */}

      <div className="border-b border-gray-200 dark:border-white/5 bg-gradient-to-r from-violet-500/10 via-transparent to-transparent px-8 py-7">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Job Applications
            </h2>

            <p className="mt-1 text-gray-600 dark:text-gray-400">
              Track every application in one beautiful dashboard.
            </p>

          </div>

          <div className="hidden rounded-2xl bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 dark:bg-white/5 dark:text-gray-300 md:flex">
            {applications.length} Applications
          </div>

        </div>

      </div>

      {applications.length === 0 ? (
        <EmptyState />
      ) : (
        <>

          {/* Desktop Table */}

          <div className="hidden overflow-x-auto lg:block">

            <table className="w-full">

              <thead className="sticky top-0 bg-gray-50 dark:bg-[#1C1D27] border-b border-gray-200 dark:border-white/5">

                <tr>

                  <th className="px-8 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Company
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Role
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Status
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Applied
                  </th>

                  <th className="px-6 py-5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Location
                  </th>

                  <th className="px-8 py-5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {applications.map((app, index) => (

                  <motion.tr
                    key={app._id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.25,
                      delay: index * 0.04,
                    }}
                    whileHover={{ y: -1 }}
                    className="border-b border-gray-200 dark:border-white/5 transition-colors hover:bg-gray-50 dark:hover:bg-white/[0.03]"
                  >

                    {/* Company */}

                    <td className="px-8 py-6">

                      <div className="flex items-center gap-4">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 font-bold text-lg text-violet-500 dark:text-violet-400">
                          {app.company?.charAt(0).toUpperCase()}
                        </div>

                        <div>

                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {app.company}
                          </h3>

                          <p className="text-sm text-gray-500 dark:text-gray-500">
                            Company
                          </p>

                        </div>

                      </div>

                    </td>

                    {/* Role */}

                    <td className="px-6 py-6">

                      <span className="text-gray-700 dark:text-gray-300">
                        {app.role}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-6">
                      <StatusBadge status={app.status} />
                    </td>

                    {/* Applied Date */}

                    <td className="px-6 py-6">

                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">

                        <Calendar size={16} />

                        {formatDate(app.applicationDate)}

                      </div>

                    </td>

                    {/* Location */}

                    <td className="px-6 py-6">

                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">

                        <MapPin size={16} />

                        {app.location || "-"}

                      </div>

                    </td>

                    {/* Actions */}

                    <td className="px-8 py-6">

                      <div className="flex justify-end gap-2">

                        <button
                          onClick={() =>
                            navigate(`/edit-job/${app._id}`)
                          }
                          className="rounded-xl bg-gray-100 p-2.5 text-gray-700 transition-all hover:scale-105 hover:bg-violet-100 hover:text-violet-600 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-violet-500/20 dark:hover:text-violet-400"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          onClick={() => onDelete(app._id)}
                          className="rounded-xl bg-gray-100 p-2.5 text-gray-700 transition-all hover:scale-105 hover:bg-red-100 hover:text-red-600 dark:bg-white/5 dark:text-gray-300 dark:hover:bg-red-500/20 dark:hover:text-red-400"
                        >
                          <Trash2 size={18} />
                        </button>

                      </div>

                    </td>

                  </motion.tr>

                ))}
                              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

export default JobTable;
                