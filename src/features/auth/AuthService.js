
import {auth, db} from "../../firebase/firebaseconfig"

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

import { doc, setDoc } from "firebase/firestore";

export async function registerUser({ name, email, password, ticket }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);

  // Update display name
  await updateProfile(userCredential.user, { displayName: name });

  await setDoc(doc(db, "attendees", userCredential.user.uid), {
    uid: userCredential.user.uid,
    name,
    email,
    ticket,
    createdAt: new Date().toISOString(),
  });

  return userCredential.user;
}

// Login user
export async function loginUser({ email, password }) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

// Logout user
export async function logoutUser() {
  await signOut(auth);
}