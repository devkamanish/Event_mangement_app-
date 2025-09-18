// src/pages/AdminAnnouncements.jsx
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
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Send Announcement</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          className="w-full p-2 border rounded"
          placeholder="Enter announcement..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Announcement"}
        </button>
      </form>
    </div>
  );
};

export default AdminAnnouncements;
