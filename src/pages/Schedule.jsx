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

  if (status === "loading")
    return <p className="text-center mt-8 animate-pulse text-gray-500">⏳ Loading sessions...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <h2 className="text-3xl font-extrabold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
        📅 Event Schedule
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {sessions.map((session, index) => (
          <div
            key={session.id}
            className="bg-white/80 backdrop-blur-md shadow-lg rounded-2xl p-6 border border-gray-200 
                       transform transition-all duration-300 ease-in-out hover:-translate-y-2 
                       hover:shadow-xl hover:border-indigo-400 animate-fadeIn"
            style={{ animationDelay: `${index * 0.1}s` }} 
          >
            <h3 className="text-xl font-bold text-gray-800">{session.title}</h3>
            <p className="text-gray-600">{session.speaker}</p>
            <p className="text-gray-500 text-sm">{session.time}</p>

            <button
              onClick={() => handleBookmark(session.id)}
              className={`mt-4 px-5 py-2 rounded-xl font-medium shadow-md transition-all duration-300 
                ${
                  session.bookmarked
                    ? "bg-green-500 hover:bg-green-600 text-white scale-105"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white"
                }`}
            >
              {session.bookmarked ? "✅ Bookmarked" : "🔖 Bookmark"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;
