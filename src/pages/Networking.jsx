import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMessages,
  sendMessage,
} from "../features/networking/networkingSlice";
import { useSelector as useAuthSelector } from "react-redux";

const Networking = () => {
  const dispatch = useDispatch();
  const { messages, status } = useSelector((state) => state.networking);
  const { user } = useAuthSelector((state) => state.auth);

  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    dispatch(sendMessage({ text, user: user?.email || "Guest" }));
    setText("");
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      <div className="p-6 border-b border-gray-700 shadow-md">
        <h2 className="text-3xl font-bold text-center">💬 Networking Lounge</h2>
        <p className="text-center text-sm text-gray-400 mt-1">
          Connect, share & chat in real-time
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-800/50 backdrop-blur-md">
        {status === "loading" && (
          <p className="text-center text-gray-400">⏳ Loading messages...</p>
        )}

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.user === user?.email ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                msg.user === user?.email
                  ? "bg-purple-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-900 rounded-bl-none"
              }`}
            >
              <p className="text-xs font-semibold mb-1">
                {msg.user === user?.email ? "You" : msg.user}
              </p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-700 bg-gray-900 flex items-center">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-3 rounded-l-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-purple-500"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 px-5 py-3 rounded-r-lg font-semibold shadow-md transition"
          disabled={status === "loading"}
        >
          Send 🚀
        </button>
      </div>
    </div>
  );
};

export default Networking;
