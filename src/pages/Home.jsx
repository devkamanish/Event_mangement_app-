import React from "react";

export default function Home() {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-4">Welcome to Evently</h1>
      <p className="text-lg mb-6">
        Manage registrations, schedules, and engagement — all in one place.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded"
        >
          Register
        </a>
        <a href="/dashboard" className="px-6 py-3 border rounded">
          Dashboard
        </a>
      </div>
    </div>
  );
}
