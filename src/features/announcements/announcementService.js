
import { db } from "../../firebase/firebaseconfig";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";

export const createAnnouncement = async (message) => {
  const docRef = await addDoc(collection(db, "announcements"), {
    message,
    timestamp: new Date(),
  });
  return { id: docRef.id, message };
};

export const subscribeToAnnouncements = (callback) => {
  const q = query(collection(db, "announcements"), orderBy("timestamp", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(data);
  });
};
