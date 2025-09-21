import { db } from "../../firebase/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";

export const fetchSessions = async () => {
  const querySnapshot = await getDocs(collection(db, "sessions"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const bookmarkSession = async (userId, sessionId) => {
  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    bookmarks: arrayUnion(sessionId),
  });
};
