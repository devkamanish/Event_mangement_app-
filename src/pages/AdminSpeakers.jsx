import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSpeakers,
  addSpeaker,
  updateSpeaker,
  deleteSpeaker,
} from "../features/speakers/speakersSlice";

export default function AdminSpeakers() {
  const dispatch = useDispatch();
  const { speakers, status } = useSelector((state) => state.speakers);

  const [form, setForm] = useState({ name: "", bio: "", topic: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    dispatch(fetchSpeakers());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      dispatch(updateSpeaker({ id: editId, ...form }));
      setEditId(null);
    } else {
      dispatch(addSpeaker(form));
    }
    setForm({ name: "", bio: "", topic: "" });
  };

  return (
    <div className="p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-700 animate-pulse">
        Manage Speakers
      </h2>

      <form className="mb-8 bg-white p-6 rounded-2xl shadow-2xl transform transition-transform duration-500 hover:scale-105" onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            className="border-2 border-purple-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 flex-1"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Topic"
            className="border-2 border-purple-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 flex-1"
            value={form.topic}
            onChange={(e) => setForm({ ...form, topic: e.target.value })}
          />
          <input
            type="text"
            placeholder="Bio"
            className="border-2 border-purple-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 flex-1"
            value={form.bio}
            onChange={(e) => setForm({ ...form, bio: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="w-full md:w-auto bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-2xl shadow-lg transform transition-transform duration-300 hover:scale-105"
        >
          {editId ? "Update Speaker" : "Add Speaker"}
        </button>
      </form>

      {status === "loading" && <p className="text-center text-purple-600 animate-pulse mb-4">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {speakers.map((sp) => (
          <div
            key={sp.id}
            className="bg-white rounded-2xl shadow-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center transform transition-transform duration-500 hover:scale-105 hover:shadow-purple-400"
          >
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-purple-700 text-lg">{sp.name}</h3>
              <p className="text-gray-700 font-semibold">{sp.topic}</p>
              <p className="text-gray-500 text-sm">{sp.bio}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setForm({ name: sp.name, bio: sp.bio, topic: sp.topic });
                  setEditId(sp.id);
                }}
                className="bg-yellow-500 text-white px-4 py-2 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                Edit
              </button>
              <button
                onClick={() => dispatch(deleteSpeaker(sp.id))}
                className="bg-red-500 text-white px-4 py-2 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
