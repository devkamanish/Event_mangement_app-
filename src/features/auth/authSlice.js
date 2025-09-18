import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseconfig";

// 🔹 Register new user
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ email, password, role = "attendee" }) => {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      email,
      role,
    });
    return { uid: res.user.uid, email, role };
  }
);

// 🔹 Login user
export const signin = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }) => {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const snap = await getDoc(doc(db, "users", res.user.uid));
    const userData = snap.data();
    return { uid: res.user.uid, email: res.user.email, role: userData?.role };
  }
);

// 🔹 Google OAuth login
export const googleLogin = createAsyncThunk("auth/googleLogin", async () => {
  const provider = new GoogleAuthProvider();
  const res = await signInWithPopup(auth, provider);

  const snap = await getDoc(doc(db, "users", res.user.uid));
  if (!snap.exists()) {
    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      email: res.user.email,
      role: "attendee", // default role
    });
  }
  return { uid: res.user.uid, email: res.user.email, role: "attendee" };
});

export const signout = createAsyncThunk("auth/signout", async () => {
  await signOut(auth);
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
