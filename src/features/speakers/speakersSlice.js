import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";

const initialState = {
  speakers: [],
  status: "idle",
  error: null,
};

// 🔹 Fetch Speakers
export const fetchSpeakers = createAsyncThunk(
  "speakers/fetchSpeakers",
  async () => {
    const snapshot = await getDocs(collection(db, "speakers"));
    return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
  }
);

// 🔹 Add Speaker
export const addSpeaker = createAsyncThunk(
  "speakers/addSpeaker",
  async (speakerData) => {
    const docRef = await addDoc(collection(db, "speakers"), speakerData);
    return { id: docRef.id, ...speakerData };
  }
);

// 🔹 Update Speaker
export const updateSpeaker = createAsyncThunk(
  "speakers/updateSpeaker",
  async ({ id, ...updates }) => {
    const docRef = doc(db, "speakers", id);
    await updateDoc(docRef, updates);
    return { id, ...updates };
  }
);

// 🔹 Delete Speaker
export const deleteSpeaker = createAsyncThunk(
  "speakers/deleteSpeaker",
  async (id) => {
    const docRef = doc(db, "speakers", id);
    await deleteDoc(docRef);
    return id;
  }
);

const speakersSlice = createSlice({
  name: "speakers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchSpeakers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSpeakers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.speakers = action.payload;
      })
      .addCase(fetchSpeakers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // Add
      .addCase(addSpeaker.fulfilled, (state, action) => {
        state.speakers.push(action.payload);
      })
      // Update
      .addCase(updateSpeaker.fulfilled, (state, action) => {
        const idx = state.speakers.findIndex((sp) => sp.id === action.payload.id);
        if (idx !== -1) {
          state.speakers[idx] = action.payload;
        }
      })
      // Delete
      .addCase(deleteSpeaker.fulfilled, (state, action) => {
        state.speakers = state.speakers.filter((sp) => sp.id !== action.payload);
      });
  },
});

export default speakersSlice.reducer;
