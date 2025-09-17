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
        <Link to="#" className="p-6 bg-white rounded shadow">Schedule</Link>
        <Link to="#" className="p-6 bg-white rounded shadow">Speakers</Link>
        <Link to="#" className="p-6 bg-white rounded shadow">Networking</Link>
      </div>
    </div>
  );
}
