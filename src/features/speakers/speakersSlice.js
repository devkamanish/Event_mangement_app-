

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

export const fetchSpeakers = createAsyncThunk("speakers/fetch", async () => {
  const snapshot = await getDocs(collection(db, "speakers"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addSpeaker = createAsyncThunk("speakers/add", async (speakerData) => {
  const docRef = await addDoc(collection(db, "speakers"), speakerData);
  return { id: docRef.id, ...speakerData };
});

const speakersSlice = createSlice({
  name: "speakers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSpeakers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpeakers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(addSpeaker.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(fetchSpeakers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default speakersSlice.reducer;
