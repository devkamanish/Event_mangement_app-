import { useEffect, useState } from "react";
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

  useEffect(() => {
    dispatch(fetchMessages());
  }, [dispatch]);

  const handleSend = () => {
    if (!text.trim()) return;
    dispatch(sendMessage({ text, user: user?.email || "Guest" }));
    setText("");
  };

  return (
    <div className="p-8 flex flex-col h-screen">
      <h2 className="text-2xl font-bold mb-4">Networking Chat</h2>

      <div className="flex-1 overflow-y-auto bg-gray-100 p-4 rounded">
        {status === "loading" && <p>Loading messages...</p>}
        {messages.map((msg) => (
          <div key={msg.id} className="mb-3">
            <p className="font-semibold">{msg.user}</p>
            <p className="bg-white p-2 rounded">{msg.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-l"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Networking;
