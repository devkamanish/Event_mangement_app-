import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "../features/feedback/feedbackSlice";

const AdminFeedback = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.feedback);

  useEffect(() => {
    dispatch(fetchFeedback());
  }, [dispatch]);

  if (status === "loading") return <p>Loading feedback...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">All Feedback</h2>
      {list.length === 0 ? (
        <p>No feedback submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {list.map((fb) => (
            <div key={fb.id} className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">Session: {fb.session}</h3>
              <p>
                <strong>User:</strong> {fb.user}
              </p>
              <p>
                <strong>Rating:</strong> {fb.rating} / 5
              </p>
              <p>
                <strong>Comments:</strong> {fb.comments}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminFeedback;
