import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBreakouts } from "../features/breakouts/breakoutSlice";
import { Link } from "react-router-dom";

const Breakouts = () => {
  const dispatch = useDispatch();
  const { sessions, status } = useSelector((state) => state.breakouts);

  useEffect(() => {
    dispatch(fetchBreakouts());
  }, [dispatch]);

  if (status === "loading")
    return (
      <p className="text-center mt-10 text-purple-600 animate-pulse text-lg">
        Loading sessions...
      </p>
    );

  return (
    <div className="p-8 max-w-3xl mx-auto bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 min-h-screen">
      <h2 className="text-3xl font-extrabold mb-8 text-center text-purple-700 animate-pulse">
        Breakout Sessions
      </h2>
      {sessions.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          No breakout sessions yet.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {sessions.map((s) => (
            <li
              key={s.id}
              className="p-6 border-2 border-purple-200 rounded-2xl shadow-lg bg-white transform transition-transform duration-500 hover:scale-105 hover:shadow-purple-400 hover:border-purple-400"
            >
              <h3 className="text-xl font-bold text-purple-600 mb-2">
                {s.topic}
              </h3>
              <p className="text-gray-700 mb-1">
                <strong>Moderator:</strong> {s.moderator}
              </p>
              <p className="text-gray-700 mb-4">
                <strong>Time:</strong> {s.time}
              </p>
              <Link
                to={`/breakouts/${s.id}`}
                className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-4 py-2 rounded-xl shadow-lg hover:scale-105 hover:from-pink-500 hover:to-purple-500 transition-all duration-300 transform"
              >
                Join Session
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Breakouts;
