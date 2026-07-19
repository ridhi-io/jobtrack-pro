import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../services/api";

const AddJob = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEditMode = Boolean(id);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    status: "Applied",
    applicationDate: "",
    interviewDate: "",
    jobLink: "",
    resumeLink: "",
    notes: "",
  });

  useEffect(() => {
    if (isEditMode) {
      fetchApplication();
    }
  }, [id]);

  const fetchApplication = async () => {
    try {
      setLoading(true);

      const res = await API.get(`/applications/${id}`);

      const job = res.data;

      setFormData({
        company: job.company || "",
        role: job.role || "",
        location: job.location || "",
        salary: job.salary || "",
        status: job.status || "Applied",
        applicationDate: job.applicationDate
          ? job.applicationDate.substring(0, 10)
          : "",
        interviewDate: job.interviewDate
          ? job.interviewDate.substring(0, 10)
          : "",
        jobLink: job.jobLink || "",
        resumeLink: job.resumeLink || "",
        notes: job.notes || "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Unable to load application.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (isEditMode) {
        await API.put(`/applications/${id}`, formData);
        toast.success("Application updated successfully!");
      } else {
        await API.post("/applications", formData);
        toast.success("Application added successfully!");
      }

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 flex justify-center items-center p-6 transition-colors duration-300">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl p-8 transition-colors duration-300">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
          {isEditMode ? "Edit Job Application" : "Add Job Application"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-5">
            {/* Company */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Company
              </label>

              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Role */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Role
              </label>

              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Location
              </label>

              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Salary */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Salary
              </label>

              <input
                type="text"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
                <option>Wishlist</option>
              </select>
            </div>

            {/* Application Date */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Application Date
              </label>

              <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Interview Date */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Interview Date
              </label>

              <input
                type="date"
                name="interviewDate"
                value={formData.interviewDate}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Job Link */}
            <div>
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Job Link
              </label>

              <input
                type="url"
                name="jobLink"
                value={formData.jobLink}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Resume Link */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Resume Link
              </label>

              <input
                type="url"
                name="resumeLink"
                value={formData.resumeLink}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                Notes
              </label>

              <textarea
                rows="4"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="px-6 py-3 rounded-xl bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-400 dark:hover:bg-gray-600 transition-all duration-300"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50 transition-all duration-300"
            >
              {loading
                ? "Saving..."
                : isEditMode
                ? "Update Application"
                : "Add Application"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddJob;