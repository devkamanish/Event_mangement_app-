import { db } from "../../firebase/firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const registerForEvent = async (formData) => {
  try {
    const docRef = await addDoc(collection(db, "registrations"), formData);
    console.log("✅ Registration saved:", docRef.id);
    return { id: docRef.id, ...formData };
  } catch (err) {
    console.error("❌ Firestore error:", err);
    throw err;
  }
};

export const fetchRegistrations = async () => {
  const querySnapshot = await getDocs(collection(db, "registrations"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
