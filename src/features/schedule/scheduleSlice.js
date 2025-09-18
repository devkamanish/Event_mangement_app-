
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSessions, bookmarkSession } from "./scheduleService";

const initialState = {
  sessions: [],
  status: "idle",
  error: null,
};

export const loadSessions = createAsyncThunk("schedule/load", async (_, thunkAPI) => {
  try {
    return await fetchSessions();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const addBookmark = createAsyncThunk(
  "schedule/bookmark",
  async ({ userId, sessionId }, thunkAPI) => {
    try {
      await bookmarkSession(userId, sessionId);
      return sessionId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const scheduleSlice = createSlice({
  name: "schedule",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadSessions.fulfilled, (state, action) => {
        state.sessions = action.payload;
        state.status = "succeeded";
      })
      .addCase(addBookmark.fulfilled, (state, action) => {
        
        const session = state.sessions.find((s) => s.id === action.payload);
        if (session) session.bookmarked = true;
      })
      .addMatcher((action) => action.type.endsWith("/pending"), (state) => {
        state.status = "loading";
      })
      .addMatcher((action) => action.type.endsWith("/rejected"), (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default scheduleSlice.reducer;
