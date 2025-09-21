import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
  surveys: [],
  content: [],
  status: "idle",
};

// Add a survey
export const addSurvey = createAsyncThunk(
  "engagement/addSurvey",
  async (surveyData) => {
    const docRef = await addDoc(collection(db, "surveys"), surveyData);
    return { id: docRef.id, ...surveyData };
  }
);

// Fetch surveys
export const fetchSurveys = createAsyncThunk(
  "engagement/fetchSurveys",
  async () => {
    const snapshot = await getDocs(collection(db, "surveys"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

// Add exclusive content
export const addContent = createAsyncThunk(
  "engagement/addContent",
  async (contentData) => {
    const docRef = await addDoc(
      collection(db, "exclusiveContent"),
      contentData
    );
    return { id: docRef.id, ...contentData };
  }
);

// Fetch exclusive content
export const fetchContent = createAsyncThunk(
  "engagement/fetchContent",
  async () => {
    const snapshot = await getDocs(collection(db, "exclusiveContent"));
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
);

const engagementSlice = createSlice({
  name: "engagement",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addSurvey.fulfilled, (state, action) => {
        state.surveys.push(action.payload);
      })
      .addCase(fetchSurveys.fulfilled, (state, action) => {
        state.surveys = action.payload;
      })
      .addCase(addContent.fulfilled, (state, action) => {
        state.content.push(action.payload);
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.content = action.payload;
      });
  },
});

export default engagementSlice.reducer;
