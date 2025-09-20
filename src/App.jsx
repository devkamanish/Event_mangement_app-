import { useState } from "react";

import "./App.css";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useSelector } from "react-redux";
import RegisterEvent from "./pages/RegisterEvent";
import Announcements from "./pages/Announcements";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import Schedule from "./pages/Schedule";
import Speakers from "./pages/Speakers";
import AdminSpeakers from "./pages/AdminSpeakers";
import Networking from "./pages/Networking";
import FeedbackForm from "./pages/FeedbackForm";
import AdminFeedback from "./pages/AdminFeedback";
import Analytics from "./pages/Analytics";
import Breakouts from "./pages/Breakouts";
import AdminBreakouts from "./pages/AdminBreakouts";
import BreakoutRoom from "./pages/BreakoutRoom";
import AdminRoute from "./components/AdminRoute";
import AddRecording from "./pages/AddRecording";
import RecordingsLibrary from "./pages/RecordingsLibrary";
import Polls from "./pages/Polls";
import Engagement from "./pages/Engagement";

function App() {
  const { user, loading } = useSelector((state) => state.auth);

  return (
    <>
      <div>
        <Routes>
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route path="/event/register" element={<RegisterEvent />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/admin/announcements" element={<AdminAnnouncements />} />
          <Route path="/schedule" element={<Schedule />} />

          <Route path="/speakers" element={<Speakers />} />
          <Route path="/admin/speakers" element={<AdminSpeakers />} />
          <Route path="/networking" element={<Networking />} />
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/admin/feedback" element={<AdminFeedback />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/breakouts" element={<Breakouts />} />
          <Route path="/admin/breakouts" element={<AdminBreakouts />} />
          <Route path="/breakouts/:id" element={<BreakoutRoom />} />
          <Route path="/recordings" element={<RecordingsLibrary />} />
          <Route path="/add-recording" element={<AddRecording />} />
          <Route path="/polls" element={<Polls />} />
          <Route path="/engagement" element={<Engagement />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
