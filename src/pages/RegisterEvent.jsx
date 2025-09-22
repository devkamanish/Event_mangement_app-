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
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      {status === "loading" && (
        <p className="text-yellow-400">⏳ Registering...</p>
      )}
      {status === "succeeded" && (
        <p className="text-green-400">✅ Registration successful!</p>
      )}
      {status === "failed" && <p className="text-red-400">❌ {error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl mb-4 font-bold">Event Registration</h2>
        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={handleChange}
          required
        />

        <select
          name="ticketType"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          onChange={handleChange}
        >
          <option value="general">General Admission</option>
          <option value="vip">VIP</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Registering..." : "Register"}
        </button>

        {status === "succeeded" && (
          <p className="mt-3 text-green-400">✅ Registration successful!</p>
        )}
      </form>
    </div>
  );
};

export default RegisterEvent;
