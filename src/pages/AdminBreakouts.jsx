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
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Breakout Session</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          placeholder="Session Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Moderator Name"
          value={moderator}
          onChange={(e) => setModerator(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Time (e.g. 3:00 PM)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
    </div>
  );
};

export default AdminBreakouts;
