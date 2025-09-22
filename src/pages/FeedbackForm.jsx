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
    <div className="p-8 max-w-lg mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 rounded-xl shadow-2xl transform transition-transform duration-500 hover:scale-105">
      <h2 className="text-3xl font-extrabold mb-6 text-purple-700 text-center animate-pulse">
        Submit Feedback
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="session"
          placeholder="Session Name"
          value={form.session}
          onChange={handleChange}
          className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-inner placeholder-purple-300"
          required
        />

        <label className="block text-purple-600 font-medium">
          Rating:
          <select
            name="rating"
            value={form.rating}
            onChange={handleChange}
            className="ml-3 p-2 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-inner cursor-pointer"
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
          className="w-full p-3 border-2 border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-inner placeholder-purple-300 resize-none h-32"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 rounded-xl shadow-lg hover:scale-105 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
