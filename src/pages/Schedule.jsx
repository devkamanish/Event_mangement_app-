import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadSessions, addBookmark } from "../features/schedule/scheduleSlice";
import { useSelector as useReduxSelector } from "react-redux";

const Schedule = () => {
  const dispatch = useDispatch();
  const { sessions, status, error } = useSelector((state) => state.schedule);
  const { user } = useReduxSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadSessions());
  }, [dispatch]);

  const handleBookmark = (sessionId) => {
    if (!user) return;
    dispatch(addBookmark({ userId: user.uid, sessionId }));
  };

  if (status === "loading") return <p className="text-center mt-8">Loading sessions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Event Schedule</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sessions.map((session) => (
          <div key={session.id} className="bg-white shadow-md rounded-xl p-4">
            <h3 className="text-xl font-semibold">{session.title}</h3>
            <p className="text-gray-600">{session.speaker}</p>
            <p className="text-gray-500 text-sm">{session.time}</p>
            <button
              onClick={() => handleBookmark(session.id)}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              {session.bookmarked ? "Bookmarked ✅" : "Bookmark"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
