import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  BriefcaseBusiness,
  MapPin,
  DollarSign,
  Calendar,
  Link as LinkIcon,
  NotebookPen,
  Save,
  Loader2,
} from "lucide-react";

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
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-white dark:bg-[#09090B] px-6 py-10"
    >
      <div className="max-w-5xl mx-auto">

        {/* Back Button */}

        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition mb-8"
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        {/* Header */}

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-white">
            {isEditMode
              ? "Edit Application"
              : "Add New Application"}
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Track every internship opportunity in one
            beautiful dashboard.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="space-y-8">

            {/* ================= General Information ================= */}

            <div className="bg-white dark:bg-[#171821] border border-gray-200 dark:border-white/5 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-11 h-11 rounded-xl bg-violet-500/15 flex items-center justify-center">
                  <Building2
                    className="text-violet-400"
                    size={22}
                  />
                </div>

                <div>

                  <h2 className="text-xl font-semibold text-white">
                    General Information
                  </h2>

                  <p className="text-zinc-400 text-sm">
                    Basic details about the job.
                  </p>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Company */}

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Company *
                  </label>

                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                    placeholder="Google"
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  />

                </div>

                {/* Role */}

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Role *
                  </label>

                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    placeholder="Software Engineer Intern"
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  />

                </div>

                {/* Location */}

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Location
                  </label>

                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Bangalore"
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  />

                </div>

                {/* Status */}

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Status
                  </label>

                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
                  >
                    <option>Applied</option>
                    <option>Interview</option>
                    <option>Offer</option>
                    <option>Rejected</option>
                    <option>Wishlist</option>
                  </select>

                </div>

              </div>

            </div>
                        {/* ================= Application Details ================= */}

            <div className="bg-white dark:bg-[#171821] border border-gray-200 dark:border-white/5 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center">
                  <BriefcaseBusiness
                    className="text-blue-400"
                    size={22}
                  />
                </div>

                <div>

                  <h2 className="text-xl font-semibold text-white">
                    Application Details
                  </h2>

                  <p className="text-zinc-400 text-sm">
                    Track salary and important dates.
                  </p>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Salary
                  </label>

                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="₹12 LPA"
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  />

                </div>

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Application Date
                  </label>

                  <input
                    type="date"
                    name="applicationDate"
                    value={formData.applicationDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
                  />

                </div>

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Interview Date
                  </label>

                  <input
                    type="date"
                    name="interviewDate"
                    value={formData.interviewDate}
                    onChange={handleChange}
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-violet-500 transition"
                  />

                </div>

              </div>

            </div>

            {/* ================= Links ================= */}

            <div className="bg-white dark:bg-[#171821] border border-gray-200 dark:border-white/5 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-11 h-11 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                  <LinkIcon
                    className="text-cyan-400"
                    size={22}
                  />
                </div>

                <div>

                  <h2 className="text-xl font-semibold text-white">
                    Links
                  </h2>

                  <p className="text-zinc-400 text-sm">
                    Save useful URLs for quick access.
                  </p>

                </div>

              </div>

              <div className="space-y-6">

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Job URL
                  </label>

                  <input
                    type="url"
                    name="jobLink"
                    value={formData.jobLink}
                    onChange={handleChange}
                    placeholder="https://careers.company.com"
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  />

                </div>

                <div>

                  <label className="text-sm text-zinc-400 mb-2 block">
                    Resume URL
                  </label>

                  <input
                    type="url"
                    name="resumeLink"
                    value={formData.resumeLink}
                    onChange={handleChange}
                    placeholder="https://drive.google.com/..."
                    className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-3 text-white placeholder:text-zinc-500 focus:outline-none focus:border-violet-500 transition"
                  />

                </div>

              </div>

            </div>

            {/* ================= Notes ================= */}

            <div className="bg-white dark:bg-white dark:bg-[#171821] border border-gray-200 dark:border-white/5 rounded-3xl p-8">

              <div className="flex items-center gap-3 mb-8">

                <div className="w-11 h-11 rounded-xl bg-green-500/15 flex items-center justify-center">
                  <NotebookPen
                    className="text-green-400"
                    size={22}
                  />
                </div>

                <div>

                  <h2 className="text-xl font-semibold text-white">
                    Notes
                  </h2>

                  <p className="text-zinc-400 text-sm">
                    Interview tips, recruiter responses or reminders.
                  </p>

                </div>

              </div>

              <textarea
                rows={6}
                maxLength={500}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Write anything useful..."
                className="w-full rounded-2xl bg-gray-50 dark:bg-[#111218] border border-white/10 px-4 py-4 text-white placeholder:text-zinc-500 resize-none focus:outline-none focus:border-violet-500 transition"
              />

              <div className="mt-2 flex justify-end">
                <span className="text-sm text-zinc-500">
                  {formData.notes.length} / 500
                </span>
              </div>

            </div>

            {/* ================= Footer ================= */}

            <div className="flex flex-col sm:flex-row justify-end gap-4 pt-2">

              <button
                type="button"
                onClick={() => navigate("/dashboard")}
                className="px-6 py-3 rounded-2xl border border-white/10 bg-white dark:bg-[#171821] text-zinc-300 hover:bg-[#1d1e28] transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 rounded-2xl bg-violet-600 hover:bg-violet-500 disabled:opacity-60 disabled:cursor-not-allowed transition flex items-center justify-center gap-2 text-white font-semibold min-w-[220px]"
              >
                {loading ? (
                  <>
                    <Loader2
                      size={18}
                      className="animate-spin"
                    />
                    Saving Application...
                  </>
                ) : (
                  <>
                    <Save size={18} />

                    {isEditMode
                      ? "Update Application"
                      : "Save Application"}
                  </>
                )}
              </button>

            </div>

          </div>

        </form>

      </div>

    </motion.div>
  );
};

export default AddJob;