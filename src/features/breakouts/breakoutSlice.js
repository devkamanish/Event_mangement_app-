import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
  sessions: [],
  status: "idle",
  error: null,
};

export const fetchBreakouts = createAsyncThunk("breakouts/fetch", async () => {
  const snapshot = await getDocs(collection(db, "breakouts"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addBreakout = createAsyncThunk(
  "breakouts/add",
  async (session) => {
    const docRef = await addDoc(collection(db, "breakouts"), session);
    return { id: docRef.id, ...session };
  }
);

const breakoutSlice = createSlice({
  name: "breakouts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBreakouts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBreakouts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sessions = action.payload;
      })
      .addCase(addBreakout.fulfilled, (state, action) => {
        state.sessions.push(action.payload);
      })
      .addCase(fetchBreakouts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default breakoutSlice.reducer;
