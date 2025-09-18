// src/pages/Dashboard.jsx
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

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 py-2 px-4 rounded mb-6"
      >
        Logout
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          to="/schedule"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Schedule
        </Link>
        <Link
          to="/announcements"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Announcements
        </Link>
        <Link
          to="/event/register"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Register for Event
        </Link>
        <Link
          to="/admin/announcements"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Admin: Announcements
        </Link>
        <Link
          to="/speakers"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Speakers
        </Link>
        <Link
          to="/admin/speakers"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Admin: Speakers
        </Link>
        <Link
          to="/networking"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Networking
        </Link>
        <Link
          to="/feedback"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Submit Feedback
        </Link>
        <Link
          to="/admin/feedback"
          className="p-6 bg-white rounded shadow hover:bg-gray-100"
        >
          Admin: Feedback
        </Link>
        <Link to="/analytics" className="p-6 bg-white rounded shadow hover:bg-gray-100">
  Analytics
</Link>

      </div>
    </div>
  );
}
