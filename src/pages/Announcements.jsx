import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  startListeningAnnouncements,
  stopListeningAnnouncements,
} from "../features/announcements/announcementSlice";

const Announcements = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.announcements);

  useEffect(() => {
    dispatch(startListeningAnnouncements());
    return () => dispatch(stopListeningAnnouncements());
  }, [dispatch]);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Live Announcements</h2>
      <ul className="space-y-4">
        {list.map((a) => (
          <li key={a.id} className="bg-yellow-100 p-4 rounded shadow">
            <p className="text-gray-800">{a.message}</p>
            <p className="text-xs text-gray-500">
              {new Date(a.timestamp.seconds * 1000).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Announcements;
