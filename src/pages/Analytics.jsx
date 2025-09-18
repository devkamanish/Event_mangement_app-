
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchFeedback } from "../features/feedback/feedbackSlice";
import { fetchEvents } from "../features/events/eventsSlice"; 
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const Analytics = () => {
  const dispatch = useDispatch();
  const { list: feedbacks } = useSelector((state) => state.feedback);
  const { list: events } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchFeedback());
    dispatch(fetchEvents());
  }, [dispatch]);


  const attendanceData = events.map((evt) => ({
    name: evt.title,
    attendees: evt.attendeesCount || Math.floor(Math.random() * 100),
  }));

  const feedbackData = events.map((evt) => {
    const eventFeedback = feedbacks.filter((f) => f.session === evt.title);
    const avgRating =
      eventFeedback.reduce((acc, cur) => acc + Number(cur.rating), 0) /
        (eventFeedback.length || 1);
    return { name: evt.title, rating: parseFloat(avgRating.toFixed(1)) };
  });

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Event Analytics Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Session Attendance</h3>
          <BarChart
            width={500}
            height={300}
            data={attendanceData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="attendees" fill="#8884d8" />
          </BarChart>
        </div>

        {/* Feedback Pie Chart */}
        <div className="bg-white p-6 rounded shadow">
          <h3 className="text-xl font-semibold mb-4">Average Feedback Rating</h3>
          <PieChart width={500} height={300}>
            <Pie
              data={feedbackData}
              dataKey="rating"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {feedbackData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
