import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBreakout } from "../features/breakouts/breakoutSlice";

const AdminBreakouts = () => {
  const dispatch = useDispatch();
  const [topic, setTopic] = useState("");
  const [moderator, setModerator] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic || !moderator || !time) return;
    dispatch(addBreakout({ topic, moderator, time }));
    setTopic("");
    setModerator("");
    setTime("");
  };

  return (
    <div className="p-8 max-w-md mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 rounded-2xl shadow-2xl min-h-screen">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-purple-700 animate-pulse">
        Create Breakout Session
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          placeholder="Session Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 shadow-inner placeholder-purple-300"
        />
        <input
          type="text"
          placeholder="Moderator Name"
          value={moderator}
          onChange={(e) => setModerator(e.target.value)}
          className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 shadow-inner placeholder-purple-300"
        />
        <input
          type="text"
          placeholder="Time (e.g. 3:00 PM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all duration-300 shadow-inner placeholder-purple-300"
        />
        <button
          type="submit"
          className="w-full py-3 text-white font-bold rounded-2xl shadow-lg transform transition-transform duration-300 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 hover:scale-105"
        >
          Add Session
        </button>
      </form>
    </div>
  );
};

export default AdminBreakouts;
