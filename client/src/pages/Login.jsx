import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  BriefcaseBusiness,
  Eye,
  EyeOff,
  ArrowRight,
  BarChart3,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";
import { motion } from "framer-motion";

import api from "../services/api";
import Button from "../ui/Button";
import Card from "../ui/Card";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!formData.email || !formData.password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", formData);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#09090B] flex">
      {/* Left Side */}

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-[#111218] to-[#09090B]">
        <div className="absolute w-96 h-96 rounded-full bg-violet-700/20 blur-[120px] -top-20 -left-20" />

        <div className="absolute w-96 h-96 rounded-full bg-blue-700/20 blur-[120px] bottom-0 right-0" />

        <div className="relative z-10 flex flex-col justify-center px-20">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center">
              <BriefcaseBusiness className="text-white w-8 h-8" />
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white">
                JobTrack Pro
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Track every internship. Land your dream job.
              </p>
            </div>
          </div>

          <div className="space-y-8">
            <Feature
              icon={<BarChart3 />}
              title="Powerful Analytics"
              text="Visualize your internship journey with interactive charts."
            />

            <Feature
              icon={<CalendarDays />}
              title="Interview Tracking"
              text="Never miss an interview with the built-in calendar."
            />

            <Feature
              icon={<ShieldCheck />}
              title="Secure Workspace"
              text="Your data stays safe with secure authentication."
            />
          </div>
        </div>
      </div>

      {/* Right Side */}

      <div className="flex-1 flex items-center justify-center px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-md"
        >
          <Card hover={false}>
            <div className="mb-8">
              <p className="text-violet-400 font-semibold">
                Welcome Back 👋
              </p>

              <h2 className="text-3xl font-bold text-white mt-2">
                Sign in
              </h2>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Continue managing your internship applications.
              </p>
            </div>

            {error && (
              <div className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full h-12 rounded-2xl bg-gray-50 dark:bg-[#111218] border border-gray-200 dark:border-white/5 px-4 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={
                      showPassword ? "text" : "password"
                    }
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full h-12 rounded-2xl bg-gray-50 dark:bg-[#111218] border border-gray-200 dark:border-white/5 px-4 pr-12 text-white placeholder:text-gray-500 outline-none transition-all duration-300 focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition"
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12"
              >
                {loading ? (
                  "Signing In..."
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Sign In
                    <ArrowRight size={18} />
                  </div>
                )}
              </Button>
            </form>

            <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-violet-400 hover:text-violet-300 transition"
              >
                Create one
              </Link>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#171821] border border-gray-200 dark:border-white/5 flex items-center justify-center text-violet-400">
        {icon}
      </div>

      <div>
        <h3 className="text-white font-semibold">
          {title}
        </h3>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {text}
        </p>
      </div>
    </div>
  );
}

export default Login;