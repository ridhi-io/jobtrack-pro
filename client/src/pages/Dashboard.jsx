import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import StatsCard from "../components/dashboard/StatsCard";
import SearchBar from "../components/dashboard/SearchBar";
import StatusFilter from "../components/dashboard/StatusFilter";
import JobTable from "../components/dashboard/JobTable";
import InterviewCalendar from "../components/dashboard/InterviewCalendar";

import StatusPieChart from "../components/charts/StatusPieChart";
import ApplicationsBarChart from "../components/charts/ApplicationsBarChart";

import API from "../services/api";

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await API.get("/applications");

      if (Array.isArray(res.data)) {
        setApplications(res.data);
      } else if (Array.isArray(res.data.applications)) {
        setApplications(res.data.applications);
      } else {
        setApplications([]);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load applications.");
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteApplication = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/applications/${id}`);

      setApplications((prev) =>
        prev.filter((app) => app._id !== id)
      );

      toast.success("Application deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete application.");
    }
  };

  const totalApplications = applications.length;

  const interviews = applications.filter(
    (app) => app.status === "Interview"
  ).length;

  const offers = applications.filter(
    (app) => app.status === "Offer"
  ).length;

  const rejected = applications.filter(
    (app) => app.status === "Rejected"
  ).length;

  const filteredApplications = applications.filter((app) => {
    const matchesSearch =
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.role.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "All" ||
      app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-8 overflow-auto">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              Welcome back, {user?.name} 👋
            </h1>

            <p className="text-gray-500 dark:text-gray-400 mt-2">
              Track your internship journey from one place.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Applications"
              value={totalApplications}
              color="blue"
            />

            <StatsCard
              title="Interviews"
              value={interviews}
              color="yellow"
            />

            <StatsCard
              title="Offers"
              value={offers}
              color="green"
            />

            <StatsCard
              title="Rejected"
              value={rejected}
              color="red"
            />
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-lg font-semibold text-gray-500 dark:text-gray-300">
                Loading dashboard...
              </div>
            </div>
          ) : (
            <>
              {/* Charts */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
                <StatusPieChart applications={applications} />

                <ApplicationsBarChart
                  applications={applications}
                />
              </div>

              {/* Calendar */}
              <InterviewCalendar
                applications={applications}
              />

              {/* Search & Filter */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 mb-8 transition-colors duration-300">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <SearchBar
                      searchTerm={searchTerm}
                      setSearchTerm={setSearchTerm}
                    />
                  </div>

                  <StatusFilter
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                  />
                </div>
              </div>

              {/* Table */}
              <JobTable
                applications={filteredApplications}
                onDelete={deleteApplication}
              />
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;