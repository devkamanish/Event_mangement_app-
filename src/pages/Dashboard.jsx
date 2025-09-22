import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../features/auth/authSlice";

export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(signout());
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const cardClasses =
    "p-6 bg-white rounded-2xl shadow hover:shadow-lg hover:scale-105 transform transition duration-200 cursor-pointer border border-gray-200";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          📊Event Manager Dashboard
        </h2>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 py-2 px-6 rounded-xl text-white font-semibold shadow"
        >
          Logout
        </button>
      </div>

      <div className="mb-10">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          🎟 User Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/schedule" className={cardClasses}>
            📅 Schedule
          </Link>
          <Link to="/announcements" className={cardClasses}>
            📢 Announcements
          </Link>
          <Link to="/event/register" className={cardClasses}>
            📝 Register for Event
          </Link>
          <Link to="/speakers" className={cardClasses}>
            🎤 Speakers
          </Link>
          <Link to="/networking" className={cardClasses}>
            🤝 Networking
          </Link>
          <Link to="/feedback" className={cardClasses}>
            🗳 Submit Feedback
          </Link>
          <Link to="/analytics" className={cardClasses}>
            📈 Analytics
          </Link>
          <Link to="/breakouts" className={cardClasses}>
            🧑‍🤝‍🧑 Breakout Sessions
          </Link>
          <Link to="/sessions/123" className={cardClasses}>
            📖 Session Example
          </Link>
          <Link to="/recordings" className={cardClasses}>
            🎥 Recordings
          </Link>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          🛠 Admin Features
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link to="/admin/announcements" className={cardClasses}>
            📢 Manage Announcements
          </Link>
          <Link to="/admin/speakers" className={cardClasses}>
            🎤 Manage Speakers
          </Link>
          <Link to="/admin/feedback" className={cardClasses}>
            🗳 Manage Feedback
          </Link>
          <Link to="/admin/breakouts" className={cardClasses}>
            🧑‍🤝‍🧑 Manage Breakouts
          </Link>
          <Link to="/add-recording" className={cardClasses}>
            🎥 Add Recording
          </Link>
        </div>
      </div>
    </div>
  );
}
