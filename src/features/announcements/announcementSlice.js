import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createAnnouncement,
  subscribeToAnnouncements,
} from "./announcementService";

const initialState = {
  list: [],
  status: "idle",
  error: null,
};

export const addAnnouncement = createAsyncThunk(
  "announcements/add",
  async (message, thunkAPI) => {
    try {
      return await createAnnouncement(message);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

let unsubscribeFn = null;

export const startListeningAnnouncements = () => (dispatch) => {
  unsubscribeFn = subscribeToAnnouncements((data) => {
    dispatch(setAnnouncements(data));
  });
};

export const stopListeningAnnouncements = () => () => {
  if (unsubscribeFn) unsubscribeFn();
};

const announcementSlice = createSlice({
  name: "announcements",
  initialState,
  reducers: {
    setAnnouncements: (state, action) => {
      state.list = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addAnnouncement.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addAnnouncement.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(addAnnouncement.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { setAnnouncements } = announcementSlice.actions;
export default announcementSlice.reducer;
