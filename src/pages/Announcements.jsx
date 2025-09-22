import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startListeningAnnouncements,
  stopListeningAnnouncements,
} from "../features/announcements/announcementSlice";

const Announcements = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.announcements);
  const endRef = useRef(null);

  useEffect(() => {
    dispatch(startListeningAnnouncements());
    return () => dispatch(stopListeningAnnouncements());
  }, [dispatch]);

  
  useEffect(() => {
    if (endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [list]);

  
  const getBgColor = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 border-l-4 border-green-500";
      case "warning":
        return "bg-yellow-100 border-l-4 border-yellow-500";
      case "info":
      default:
        return "bg-blue-100 border-l-4 border-blue-500";
    }
  };

  return (
    <div className="p-8 min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-3xl font-extrabold text-gray-800">
          📢 Live Announcements
        </h2>
        <span className="flex items-center text-red-500 text-sm font-semibold animate-pulse">
          🔴 Live
        </span>
      </div>

      <ul className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        {list.map((a, index) => (
          <li
            key={a.id}
            className={`${getBgColor(
              a.type
            )} p-4 rounded-xl shadow-md transform transition-all duration-300 hover:scale-[1.02] animate-fadeIn`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <p className="text-gray-900 font-medium">{a.message}</p>
            <p className="text-xs text-gray-500 mt-1">
              {new Date(a.timestamp.seconds * 1000).toLocaleString()}
            </p>
          </li>
        ))}
        <div ref={endRef} />
      </ul>
    </div>
  );
};

export default Announcements;
