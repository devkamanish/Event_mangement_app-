import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedback } from "../features/feedback/feedbackSlice";
import { fetchEvents } from "../features/events/eventsSlice";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Analytics = () => {
  const dispatch = useDispatch();
  const { feedbacks } = useSelector((state) => state.feedback);
  const { events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchFeedback());
    dispatch(fetchEvents());
  }, [dispatch]);

  const attendanceData = {
    labels: events.map((evt) => evt.title),
    datasets: [
      {
        label: "Attendees",
        data: events.map((evt) => evt.attendeesCount || Math.floor(Math.random() * 100)),
        backgroundColor: "#8884d8",
      },
    ],
  };

  const feedbackData = {
    labels: events.map((evt) => evt.title),
    datasets: [
      {
        label: "Average Rating",
        data: events.map((evt) => {
          const eventFeedback = feedbacks.filter((f) => f.session === evt.title);
          const avgRating =
            eventFeedback.reduce((acc, cur) => acc + Number(cur.rating), 0) /
            (eventFeedback.length || 1);
          return parseFloat(avgRating.toFixed(1));
        }),
        backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"],
      },
    ],
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Event Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Attendance Bar Chart */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Session Attendance</h3>
          <Bar data={attendanceData} options={{ responsive: true, plugins: { legend: { position: "top" } } }} />
        </div>

        {/* Feedback Pie Chart */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Average Feedback Rating</h3>
          <Pie data={feedbackData} options={{ responsive: true, plugins: { legend: { position: "right" } } }} />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
