import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRegistration } from "../features/events/eventSlice";

const RegisterEvent = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.events);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    ticketType: "general",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addRegistration(formData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-gray-900 to-black text-white px-4">
      <div className="w-full max-w-md bg-gray-800 bg-opacity-90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-700 relative overflow-hidden">
        
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-500/10 to-yellow-400/20 blur-3xl"></div>

        
        <h2 className="text-3xl font-extrabold text-center mb-6 relative z-10">
          🎟 Event Registration
        </h2>

        
        {status === "loading" && (
          <p className="text-yellow-400 text-center animate-pulse mb-4 relative z-10">
            ⏳ Registering...
          </p>
        )}
        {status === "succeeded" && (
          <p className="text-green-400 text-center mb-4 relative z-10">
            ✅ Registration successful!
          </p>
        )}
        {status === "failed" && (
          <p className="text-red-400 text-center mb-4 relative z-10">
            ❌ {error}
          </p>
        )}

        
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition"
            onChange={handleChange}
            required
          />

          <select
            name="ticketType"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-purple-500 outline-none transition"
            onChange={handleChange}
          >
            <option value="general">🎫 General Admission</option>
            <option value="vip">🌟 VIP</option>
          </select>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 py-3 rounded-lg font-semibold shadow-lg transition transform hover:scale-105"
            disabled={status === "loading"}
          >
            {status === "loading" ? "Registering..." : "Register"}
          </button>
        </form>

        {status === "succeeded" && (
          <p className="mt-4 text-center text-green-400 font-medium relative z-10">
            🎉 You’re in! Get ready for the event.
          </p>
        )}
      </div>
    </div>
  );
};

export default RegisterEvent;
