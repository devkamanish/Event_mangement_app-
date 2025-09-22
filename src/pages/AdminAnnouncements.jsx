import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAnnouncement } from "../features/announcements/announcementSlice";

const AdminAnnouncements = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.announcements);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    dispatch(addAnnouncement(message));
    setMessage("");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 rounded-2xl shadow-2xl min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700 animate-pulse">
        Send Announcement
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <textarea
          className="w-full p-4 border-2 border-purple-300 rounded-2xl shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 resize-none h-32 placeholder-purple-300"
          placeholder="Enter announcement..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className={`w-full py-3 text-white font-bold rounded-2xl shadow-lg transform transition-transform duration-300 ${
            status === "loading"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 hover:scale-105"
          }`}
        >
          {status === "loading" ? "Sending..." : "Send Announcement"}
        </button>
      </form>
    </div>
  );
};

export default AdminAnnouncements;
