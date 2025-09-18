
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchFeedback = createAsyncThunk("feedback/fetch", async () => {
  const snapshot = await getDocs(collection(db, "feedback"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});


export const submitFeedback = createAsyncThunk("feedback/add", async (feedbackData) => {
  const docRef = await addDoc(collection(db, "feedback"), {
    ...feedbackData,
    createdAt: new Date(),
  });
  return { id: docRef.id, ...feedbackData };
});


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
        state.list = action.payload;
      })
      .addCase(submitFeedback.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(fetchFeedback.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default feedbackSlice.reducer;
