
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const dummyEvents = [
  { id: "1", title: "Opening Keynote", attendeesCount: 120 },
  { id: "2", title: "Workshop: React Basics", attendeesCount: 85 },
  { id: "3", title: "Networking Session", attendeesCount: 60 },
];

const initialState = {
  events: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk("events/fetch", async () => {
  return dummyEvents;
});


const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default eventsSlice.reducer;
