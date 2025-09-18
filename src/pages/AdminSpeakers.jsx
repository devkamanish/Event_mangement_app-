// src/pages/AdminSpeakers.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addSpeaker } from "../features/speakers/speakersSlice";

const AdminSpeakers = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({ name: "", bio: "", topic: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addSpeaker(form));
    setForm({ name: "", bio: "", topic: "" });
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-4">Add New Speaker</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          name="name"
          placeholder="Speaker Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="topic"
          placeholder="Session Topic"
          value={form.topic}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Add Speaker</button>
      </form>
    </div>
  );
};

export default AdminSpeakers;
