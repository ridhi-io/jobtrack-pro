import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";

import { motion } from "framer-motion";
import {
  CalendarDays,
  MapPin,
  BriefcaseBusiness,
  Clock3,
} from "lucide-react";

import Card from "../../ui/Card";

export default function InterviewCalendar({ applications }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const interviews = applications.filter(
    (app) => app.status === "Interview" && app.interviewDate
  );

  const hasInterview = (date) =>
    interviews.some((app) => {
      const d = new Date(app.interviewDate);

      return (
        d.getDate() === date.getDate() &&
        d.getMonth() === date.getMonth() &&
        d.getFullYear() === date.getFullYear()
      );
    });

  const selectedInterviews = interviews.filter((app) => {
    const d = new Date(app.interviewDate);

    return (
      d.getDate() === selectedDate.getDate() &&
      d.getMonth() === selectedDate.getMonth() &&
      d.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Calendar */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-violet-500 dark:text-violet-400">
                Schedule
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                Interview Calendar
              </h2>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-700 shadow-lg">
              <CalendarDays className="text-white" />
            </div>
          </div>

          <Calendar
            value={selectedDate}
            onChange={setSelectedDate}
            className="react-calendar-custom"
            tileContent={({ date, view }) =>
              view === "month" && hasInterview(date) ? (
                <div className="mt-1 flex justify-center">
                  <div className="h-2 w-2 rounded-full bg-violet-500" />
                </div>
              ) : null
            }
          />
        </Card>
      </motion.div>

      {/* Interview List */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Card>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-violet-500 dark:text-violet-400">
                Upcoming
              </p>

              <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                Interviews
              </h2>

              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {selectedDate.toLocaleDateString()}
              </p>
            </div>
          </div>

          {selectedInterviews.length === 0 ? (
            <div className="flex h-64 flex-col items-center justify-center">
              <CalendarDays
                size={60}
                className="mb-5 text-gray-400 dark:text-gray-600"
              />

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                No Interviews
              </h3>

              <p className="mt-2 text-center text-gray-600 dark:text-gray-400">
                You're free on this day.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {selectedInterviews.map((app) => (
                <motion.div
                  key={app._id}
                  whileHover={{ y: -3 }}
                  className="
                    rounded-2xl
                    border border-gray-200 dark:border-white/5
                    bg-gray-50 dark:bg-[#111218]
                    p-5
                    transition-all
                  "
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-700">
                      <BriefcaseBusiness className="text-white" />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {app.company}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-400">
                        {app.role}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Clock3 size={16} />

                      <span>
                        {new Date(app.interviewDate).toLocaleString()}
                      </span>
                    </div>

                    {app.location && (
                      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />

                        <span>{app.location}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
}