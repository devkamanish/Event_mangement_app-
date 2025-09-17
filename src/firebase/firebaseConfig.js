// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCyrlB8lRYHOho0H2wypZ5LhMkqBpt703c",
  authDomain: "project-tracker-e0bb6.firebaseapp.com",
  databaseURL: "https://project-tracker-e0bb6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "project-tracker-e0bb6",
  storageBucket: "project-tracker-e0bb6.firebasestorage.app",
  messagingSenderId: "625952780024",
  appId: "1:625952780024:web:a4a6581153c64ff65dd50d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
