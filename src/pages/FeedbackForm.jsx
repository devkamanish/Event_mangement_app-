import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { submitFeedback } from "../features/feedback/feedbackSlice";

const FeedbackForm = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    session: "",
    rating: 5,
    comments: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitFeedback({ ...form, user: user?.email || "Guest" }));
    setForm({ session: "", rating: 5, comments: "" });
    alert("✅ Feedback submitted successfully!");
  };

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Submit Feedback</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="session"
          placeholder="Session Name"
          value={form.session}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <label className="block">
          Rating:
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="ml-2 p-1 border rounded"
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </label>

        <textarea
          name="comments"
          placeholder="Your comments..."
          value={form.comments}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
