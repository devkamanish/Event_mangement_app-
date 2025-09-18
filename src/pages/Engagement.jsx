import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSurvey, fetchSurveys, addContent, fetchContent } from "../features/engagement/engagementSlice";

export default function Engagement() {
  const dispatch = useDispatch();
  const { surveys, content } = useSelector((state) => state.engagement);

  const [surveyText, setSurveyText] = useState("");
  const [contentTitle, setContentTitle] = useState("");
  const [contentLink, setContentLink] = useState("");

  useEffect(() => {
    dispatch(fetchSurveys());
    dispatch(fetchContent());
  }, [dispatch]);

  const handleSurveySubmit = (e) => {
    e.preventDefault();
    if (surveyText) {
      dispatch(addSurvey({ text: surveyText, date: new Date().toISOString() }));
      setSurveyText("");
    }
  };

  const handleContentSubmit = (e) => {
    e.preventDefault();
    if (contentTitle && contentLink) {
      dispatch(addContent({ title: contentTitle, link: contentLink, date: new Date().toISOString() }));
      setContentTitle("");
      setContentLink("");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">🌐 Post-Event Community Engagement</h2>

      {/* Add Survey */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="font-semibold mb-3">📋 Create Follow-Up Survey</h3>
        <form onSubmit={handleSurveySubmit} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter survey question..."
            value={surveyText}
            onChange={(e) => setSurveyText(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button type="submit" className="bg-blue-500 text-white px-4 rounded">Add</button>
        </form>
        <ul className="mt-4 list-disc pl-6">
          {surveys.map((s) => (
            <li key={s.id}>{s.text}</li>
          ))}
        </ul>
      </div>

      {/* Exclusive Content */}
      <div className="bg-white p-4 rounded shadow">
        <h3 className="font-semibold mb-3">🎥 Share Exclusive Content</h3>
        <form onSubmit={handleContentSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Content title"
            value={contentTitle}
            onChange={(e) => setContentTitle(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <input
            type="text"
            placeholder="Link (video, PDF, etc.)"
            value={contentLink}
            onChange={(e) => setContentLink(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <button type="submit" className="bg-green-500 text-white px-4 rounded">Share</button>
        </form>
        <ul className="list-disc pl-6">
          {content.map((c) => (
            <li key={c.id}>
              <a href={c.link} target="_blank" rel="noreferrer" className="text-blue-600 underline">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
