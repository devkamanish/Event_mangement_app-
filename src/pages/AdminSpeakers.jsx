// src/pages/AdminSpeakers.jsx
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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Manage Speakers</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Name"
          className="border p-2 mr-2"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Topic"
          className="border p-2 mr-2"
          value={form.topic}
          onChange={(e) => setForm({ ...form, topic: e.target.value })}
        />
        <input
          type="text"
          placeholder="Bio"
          className="border p-2 mr-2"
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      {/* List */}
      {status === "loading" && <p>Loading...</p>}
      {speakers.map((sp) => (
        <div
          key={sp.id}
          className="flex justify-between items-center bg-gray-100 p-3 mb-2 rounded"
        >
          <div>
            <h3 className="font-bold">{sp.name}</h3>
            <p className="text-sm">{sp.topic}</p>
          </div>
          <div>
            <button
              onClick={() => {
                setForm({ name: sp.name, bio: sp.bio, topic: sp.topic });
                setEditId(sp.id);
              }}
              className="bg-yellow-500 text-white px-3 py-1 mr-2 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => dispatch(deleteSpeaker(sp.id))}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
