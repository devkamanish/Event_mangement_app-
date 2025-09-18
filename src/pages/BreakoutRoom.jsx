// src/pages/BreakoutRoom.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { listenToMessages, sendMessage } from "../features/breakouts/chatSlice";
import { auth } from "../firebase/firebaseconfig";

const BreakoutRoom = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
const user = useSelector((state) => state.auth.user);
  const { messages } = useSelector((state) => state.chat);
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    dispatch(listenToMessages(id));
  }, [dispatch, id]);

  const handleSend = () => {
    if (!newMsg.trim()) return;
    dispatch(sendMessage({ sessionId: id, text: newMsg, user: user?.email }));
    setNewMsg("");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Breakout Room</h2>
      <div className="border rounded p-4 h-80 overflow-y-auto bg-gray-50">
        {messages.map((m) => (
          <div key={m.id} className="mb-2">
            <strong>{m.user}:</strong> {m.text}
          </div>
        ))}
      </div>

      <div className="mt-4 flex">
        <input
          type="text"
          placeholder="Type a message..."
          className="flex-1 p-2 border rounded-l"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
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

export default BreakoutRoom;
