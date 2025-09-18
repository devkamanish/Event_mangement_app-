import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

export const fetchMessages = createAsyncThunk("networking/fetch", async () => {
  const q = query(collection(db, "networking"), orderBy("timestamp", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const sendMessage = createAsyncThunk("networking/send", async (msg) => {
  const docRef = await addDoc(collection(db, "networking"), {
    ...msg,
    timestamp: new Date(),
  });
  return { id: docRef.id, ...msg };
});

const networkingSlice = createSlice({
  name: "networking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.messages = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default networkingSlice.reducer;



