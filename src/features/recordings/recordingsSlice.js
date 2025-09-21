// src/features/recordings/recordingsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
  recordings: [],
  status: "idle",
  error: null,
};

// Add new recording (Admin only)
export const addRecording = createAsyncThunk(
  "recordings/addRecording",
  async ({ title, description, videoUrl, sessionId }) => {
    await addDoc(collection(db, "recordings"), {
      title,
      description,
      videoUrl,
      sessionId: sessionId || null,
      createdAt: new Date(),
    });
  }
);

// Fetch all recordings
export const fetchRecordings = createAsyncThunk(
  "recordings/fetchRecordings",
  async () => {
    const snap = await getDocs(collection(db, "recordings"));
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

const recordingsSlice = createSlice({
  name: "recordings",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecordings.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRecordings.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.recordings = action.payload;
      })
      .addCase(fetchRecordings.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default recordingsSlice.reducer;
