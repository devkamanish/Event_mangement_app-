import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addRecording } from "../features/recordings/recordingsSlice";
import { useNavigate } from "react-router-dom";

export default function AddRecording() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [sessionId, setSessionId] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(
        addRecording({ title, description, videoUrl, sessionId })
      ).unwrap();

      setTitle("");
      setDescription("");
      setVideoUrl("");
      setSessionId("");
      navigate("/recordings");
    } catch (err) {
      console.error("Error adding recording:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-yellow-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-96 transform transition-transform duration-500 hover:scale-105"
      >
        <h2 className="text-3xl mb-6 font-extrabold text-center text-purple-400 animate-pulse">
          Add Recording
        </h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-300 resize-none h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="url"
          placeholder="Video URL (YouTube/Vimeo/embed)"
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-300"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Session ID (optional)"
          className="w-full p-3 mb-4 rounded-xl bg-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-300 placeholder-gray-300"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 font-bold rounded-2xl shadow-lg transform transition-transform duration-300 ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 hover:scale-105"
          }`}
        >
          {loading ? "Uploading..." : "Upload Recording"}
        </button>
      </form>
    </div>
  );
}
