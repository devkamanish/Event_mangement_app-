import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../../firebase/firebaseConfig";
import { addDoc, collection, getDocs } from "firebase/firestore";

const initialState = {
  tickets: [],
  status: "idle",
  error: null,
};

export const fetchTickets = createAsyncThunk(
  "tickets/fetchTickets",
  async () => {
    const querySnapshot = await getDocs(collection(db, "tickets"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

export const createTicket = createAsyncThunk(
  "tickets/createTicket",
  async (ticketData) => {
    const docRef = await addDoc(collection(db, "tickets"), ticketData);
    return { id: docRef.id, ...ticketData };
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.tickets = action.payload;
        state.status = "succeeded";
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.tickets.push(action.payload);
      });
  },
});

export default ticketsSlice.reducer;
