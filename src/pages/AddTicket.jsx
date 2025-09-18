// src/pages/AddTicket.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTicket } from "../features/tickets/ticketsSlice";
import { useNavigate } from "react-router-dom";

export default function AddTicket() {
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [limit, setLimit] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTicket({ type, price: Number(price), limit: Number(limit) }));
    navigate("/tickets");
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl mb-4 font-bold">Add Ticket</h2>
        <input
          type="text"
          placeholder="Ticket Type (VIP, General)"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Price (USD)"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Ticket Limit"
          className="w-full p-2 mb-3 rounded bg-gray-700"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          required
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 py-2 rounded font-semibold">
          Create Ticket
        </button>
      </form>
    </div>
  );
}
