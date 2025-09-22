import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTickets } from "../features/tickets/ticketsSlice";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("your-publishable-key");

export default function Tickets() {
  const dispatch = useDispatch();
  const { tickets } = useSelector((state) => state.tickets);

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleBuy = async (ticket) => {
    const stripe = await stripePromise;

    alert(`Redirecting to payment for ${ticket.type} - $${ticket.price}`);
    stripe.redirectToCheckout({
      lineItems: [{ price: ticket.stripePriceId, quantity: 1 }],
      mode: "payment",
      successUrl: window.location.origin + "/success",
      cancelUrl: window.location.origin + "/tickets",
    });
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Available Tickets</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tickets.map((ticket) => (
          <div
            key={ticket.id}
            className="bg-gray-800 text-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold">{ticket.type}</h3>
            <p className="mt-2">${ticket.price}</p>
            <p className="text-sm">Limit: {ticket.limit}</p>
            <button
              onClick={() => handleBuy(ticket)}
              className="mt-4 bg-green-500 hover:bg-green-600 py-2 px-4 rounded"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
