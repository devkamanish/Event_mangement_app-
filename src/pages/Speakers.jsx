
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpeakers } from "../features/speakers/speakersSlice";

const Speakers = () => {
  const dispatch = useDispatch();
  const { list, status } = useSelector((state) => state.speakers);

  useEffect(() => {
    dispatch(fetchSpeakers());
  }, [dispatch]);

  if (status === "loading") return <p>Loading speakers...</p>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Speakers</h2>
      {list.length === 0 ? (
        <p>No speakers added yet.</p>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {list.map((sp) => (
            <div key={sp.id} className="p-6 bg-white rounded shadow">
              <h3 className="font-semibold">{sp.name}</h3>
              <p>{sp.bio}</p>
              <p className="text-sm text-gray-500">{sp.topic}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Speakers;
