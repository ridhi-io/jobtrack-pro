import { useNavigate } from "react-router-dom";
import {
  Building2,
  MapPin,
  Calendar,
  Pencil,
  Trash2,
} from "lucide-react";

function JobTable({ applications, onDelete }) {
  const navigate = useNavigate();

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300";

      case "Interview":
        return "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300";

      case "Offer":
        return "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300";

      case "Rejected":
        return "bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300";

      case "Wishlist":
        return "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300";

      default:
        return "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 mt-8 overflow-hidden transition-colors duration-300">

      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-white dark:from-gray-800 dark:to-gray-900">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Job Applications
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage and track all your internship applications.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Company
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Applied On
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                Location
              </th>

              <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-12 text-gray-500 dark:text-gray-400"
                >
                  No job applications found.
                </td>
              </tr>
            ) : (
              applications.map((app) => (
                <tr
                  key={app._id}
                  className="border-b border-gray-200 dark:border-gray-700 last:border-none hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {/* Company */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-lg">
                        <Building2
                          size={18}
                          className="text-blue-600 dark:text-blue-300"
                        />
                      </div>

                      <span className="font-semibold text-gray-800 dark:text-white">
                        {app.company}
                      </span>
                    </div>
                  </td>

                  {/* Role */}
                  <td className="px-6 py-5">
                    <span className="text-gray-700 dark:text-gray-300">
                      {app.role}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-5">
                    <span
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </td>

                  {/* Applied Date */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Calendar size={16} />

                      <span>
                        {app.applicationDate
                          ? new Date(app.applicationDate).toLocaleDateString()
                          : "-"}
                      </span>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin size={16} />

                      <span>{app.location || "-"}</span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5">
                    <div className="flex justify-center gap-3">

                      <button
                        onClick={() =>
                          navigate(`/edit-job/${app._id}`)
                        }
                        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition shadow"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        onClick={() => onDelete(app._id)}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow"
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>

                    </div>
                  </td>

                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default JobTable;