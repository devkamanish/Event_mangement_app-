import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPolls, addPoll, votePoll } from "../features/polls/pollsSlice";

export default function Polls() {
  const dispatch = useDispatch();
  const { polls } = useSelector((state) => state.polls);
  const [newPoll, setNewPoll] = useState("");

  useEffect(() => {
    dispatch(fetchPolls());
  }, [dispatch]);

  const handleAddPoll = () => {
    if (!newPoll.trim()) return;
    dispatch(
      addPoll({
        question: newPoll,
        options: ["Yes", "No"],
        votes: { Yes: 0, No: 0 },
        createdAt: Date.now(),
      })
    );
    setNewPoll("");
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Live Polls</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter a poll question"
          value={newPoll}
          onChange={(e) => setNewPoll(e.target.value)}
          className="border px-3 py-2 rounded w-full"
        />
        <button
          onClick={handleAddPoll}
          className="bg-blue-500 px-4 py-2 rounded text-white"
        >
          Add Poll
        </button>
      </div>

      {polls.map((poll) => (
        <div key={poll.id} className="p-4 border rounded mb-4">
          <p className="font-semibold">{poll.question}</p>
          <div className="flex gap-4 mt-2">
            {Object.keys(poll.options || { Yes: 0, No: 0 }).map((option) => (
              <button
                key={option}
                onClick={() => dispatch(votePoll({ pollId: poll.id, option }))}
                className="bg-green-500 text-white px-3 py-1 rounded"
              >
                {option} ({poll.votes?.[option] || 0})
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
