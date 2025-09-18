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

  if (status === "loading") return <p>Loading sessions...</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Breakout Sessions</h2>
      {sessions.length === 0 ? (
        <p>No breakout sessions yet.</p>
      ) : (
        <ul className="space-y-4">
          {sessions.map((s) => (
            <li key={s.id} className="p-4 border rounded shadow bg-white">
              <h3 className="text-lg font-semibold">{s.topic}</h3>
              <p>
                <strong>Moderator:</strong> {s.moderator}
              </p>
              <p>
                <strong>Time:</strong> {s.time}
              </p>
              <button className="mt-2 bg-blue-600 text-white px-3 py-1 rounded">
                <Link to={`/breakouts/${s.id}`}>Join Session</Link>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Breakouts;
