// src/pages/Speakers.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpeakers } from "../features/speakers/speakersSlice";

export default function Speakers() {
  const dispatch = useDispatch();
  const { speakers, status } = useSelector((state) => state.speakers);

  useEffect(() => {
    dispatch(fetchSpeakers());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
      {speakers.map((sp) => (
        <div key={sp.id} className="bg-white shadow rounded p-4">
          <h3 className="text-xl font-semibold">{sp.name}</h3>
          <p className="text-sm text-gray-500">{sp.topic}</p>
          <p className="mt-2">{sp.bio}</p>
        </div>
      ))}
    </div>
  );
}
