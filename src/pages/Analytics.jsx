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
        data: events.map(
          (evt) => evt.attendeesCount || Math.floor(Math.random() * 100)
        ),
        backgroundColor: "rgba(136, 132, 216, 0.8)",
        borderRadius: 6,
      },
    ],
  };

  const feedbackData = {
    labels: events.map((evt) => evt.title),
    datasets: [
      {
        label: "Average Rating",
        data: events.map((evt) => {
          const eventFeedback = feedbacks.filter(
            (f) => f.session === evt.title
          );
          const avgRating =
            eventFeedback.reduce((acc, cur) => acc + Number(cur.rating), 0) /
            (eventFeedback.length || 1);
          return parseFloat(avgRating.toFixed(1));
        }),
        backgroundColor: [
          "#0088FE",
          "#00C49F",
          "#FFBB28",
          "#FF8042",
          "#AA336A",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-700 animate-pulse">
        Event Analytics Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-2xl p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-purple-300">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">
            Session Attendance
          </h3>
          <Bar
            data={attendanceData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "top" },
                tooltip: { enabled: true, mode: "index" },
              },
              animation: {
                duration: 1200,
                easing: "easeOutQuart",
              },
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: { color: "#5B21B6", font: { weight: "bold" } },
                },
                x: {
                  ticks: { color: "#5B21B6", font: { weight: "bold" } },
                },
              },
            }}
          />
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-6 transform transition-transform duration-500 hover:scale-105 hover:shadow-pink-300">
          <h3 className="text-xl font-semibold mb-4 text-pink-600">
            Average Feedback Rating
          </h3>
          <Pie
            data={feedbackData}
            options={{
              responsive: true,
              plugins: {
                legend: { position: "right", labels: { boxWidth: 20 } },
                tooltip: { enabled: true, mode: "nearest" },
              },
              animation: {
                animateScale: true,
                animateRotate: true,
                duration: 1200,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
