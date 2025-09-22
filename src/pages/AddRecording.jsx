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
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96"
      >
        <h2 className="text-2xl mb-4 font-bold">Add Recording</h2>

        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="url"
          placeholder="Video URL (YouTube/Vimeo/embed)"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Session ID (optional)"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold"
        >
          {loading ? "Uploading..." : "Upload Recording"}
        </button>
      </form>
    </div>
  );
}
