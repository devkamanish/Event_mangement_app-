import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerForEvent, fetchRegistrations } from "./EventService";

const initialState = {
  registrations: [],
  status: "idle",
  error: null,
};

export const addRegistration = createAsyncThunk(
  "event/register",
  async (formData, thunkAPI) => {
    try {
      console.log("🚀 Registering user with data:", formData);

      return await registerForEvent(formData);
    } catch (err) {
      console.error("❌ Firestore error:", err);

      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const loadRegistrations = createAsyncThunk(
  "events/load",
  async (_, thunkAPI) => {
    try {
      return await fetchRegistrations();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addRegistration.fulfilled, (state, action) => {
        state.registrations.push(action.payload);
        state.status = "succeeded";
      })
      .addCase(loadRegistrations.fulfilled, (state, action) => {
        state.registrations = action.payload;
        state.status = "succeeded";
      })
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.status = "loading";
        }
      )
      .addMatcher(
        (action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default eventSlice.reducer;
