import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";
function InterviewCalendar({ applications }) {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Interview applications only
  const interviews = applications.filter(
    (app) => app.status === "Interview" && app.interviewDate
  );

  // Check if a day has interviews
  const hasInterview = (date) => {
    return interviews.some((app) => {
      const interviewDate = new Date(app.interviewDate);

      return (
        interviewDate.getDate() === date.getDate() &&
        interviewDate.getMonth() === date.getMonth() &&
        interviewDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // Interviews on selected day
  const selectedInterviews = interviews.filter((app) => {
    const interviewDate = new Date(app.interviewDate);

    return (
      interviewDate.getDate() === selectedDate.getDate() &&
      interviewDate.getMonth() === selectedDate.getMonth() &&
      interviewDate.getFullYear() === selectedDate.getFullYear()
    );
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Calendar Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          📅 Interview Calendar
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-5">
          Click a highlighted date to view interviews.
        </p>

        <Calendar
          onChange={setSelectedDate}
          value={selectedDate}
          className="react-calendar-custom"
          tileContent={({ date, view }) =>
            view === "month" && hasInterview(date) ? (
              <div className="flex justify-center mt-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              </div>
            ) : null
          }
        />
      </div>

      {/* Interview List */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-3xl shadow-lg p-6 transition-colors duration-300">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
          🎯 Interviews
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mb-5">
          Scheduled for {selectedDate.toLocaleDateString()}
        </p>

        {selectedInterviews.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-60 text-center">
            <div className="text-6xl mb-3">📭</div>

            <p className="text-gray-500 dark:text-gray-400">
              No interviews scheduled.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedInterviews.map((app) => (
              <div
                key={app._id}
                className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                  {app.company}
                </h3>

                <p className="text-gray-600 dark:text-gray-300">
                  {app.role}
                </p>

                <p className="mt-2 text-blue-600 dark:text-blue-400 font-medium">
                  📅 {new Date(app.interviewDate).toLocaleString()}
                </p>

                {app.location && (
                  <p className="mt-1 text-gray-500 dark:text-gray-400">
                    📍 {app.location}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InterviewCalendar;