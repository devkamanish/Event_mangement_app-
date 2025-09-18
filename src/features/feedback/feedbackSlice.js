// src/features/feedback/feedbackSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";

const initialState = {
  feedbacks: [],
  status: "idle",
  error: null,
};

// Submit feedback
export const submitFeedback = createAsyncThunk(
  "feedback/submitFeedback",
  async ({ sessionId, rating, comment, user }) => {
    await addDoc(collection(db, `sessions/${sessionId}/feedback`), {
      rating,
      comment,
      user,
      createdAt: new Date(),
    });
  }
);

// Fetch feedback for a session
export const fetchFeedback = createAsyncThunk(
  "feedback/fetchFeedback",
  async (sessionId) => {
    const snap = await getDocs(collection(db, `sessions/${sessionId}/feedback`));
    return snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedback.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchFeedback.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.feedbacks = action.payload;
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default feedbackSlice.reducer;
