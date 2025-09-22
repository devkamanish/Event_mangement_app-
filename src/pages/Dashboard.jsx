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
    "p-6 bg-white/80 backdrop-blur-md rounded-2xl shadow-md border border-gray-200 transition-transform transform hover:-translate-y-2 hover:shadow-xl hover:scale-105 hover:border-indigo-400 duration-300 ease-in-out flex items-center justify-center text-lg font-semibold text-gray-700";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50 to-purple-100 p-8">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight drop-shadow-sm">
          📊 Event Manager Dashboard
        </h2>

        <button
          onClick={handleLogout}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 py-2 px-6 rounded-xl text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
        >
          🚪 Logout
        </button>
      </div>

      <div className="mb-12">
        <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          🎟 User Features
          <span className="h-2 w-2 bg-indigo-500 rounded-full animate-ping"></span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
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
        <h3 className="text-2xl font-bold text-gray-700 mb-6 flex items-center gap-2">
          🛠 Admin Features
          <span className="h-2 w-2 bg-pink-500 rounded-full animate-ping"></span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <Link to="/admin/announcements" className={cardClasses}>
            📢 Manage Announcements
          </Link>
          <Link to="/admin/speakers" className={cardClasses}>
            🎤 Manage Speakers
          </Link>
          {/* <Link to="/admin/feedback" className={cardClasses}>
            🗳 Manage Feedback
          </Link> */}
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
