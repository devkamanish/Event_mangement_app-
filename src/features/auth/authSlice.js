import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./AuthService";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

// Async thunks
export const signup = createAsyncThunk("auth/signup", async (formData, thunkAPI) => {
  try {
    return await registerUser(formData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const signin = createAsyncThunk("auth/signin", async (formData, thunkAPI) => {
  try {
    return await loginUser(formData);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

export const signout = createAsyncThunk("auth/signout", async (_, thunkAPI) => {
  try {
    await logoutUser();
    return null;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.message);
  }
});

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(signout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
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

export default authSlice.reducer;
