import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecordings } from "../features/recordings/recordingsSlice";

export default function RecordingsLibrary() {
  const dispatch = useDispatch();
  const { recordings, status } = useSelector((state) => state.recordings);

  useEffect(() => {
    dispatch(fetchRecordings());
  }, [dispatch]);

  if (status === "loading") return <p>Loading recordings...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Session Recordings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recordings.map((rec) => (
          <div key={rec.id} className="bg-white shadow rounded p-4">
            <h3 className="text-lg font-bold">{rec.title}</h3>
            <p className="text-sm text-gray-600">{rec.description}</p>
            <div className="mt-2">
              <iframe
                width="100%"
                height="250"
                src={rec.videoUrl}
                title={rec.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
