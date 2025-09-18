// src/features/polls/pollsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/firebaseconfig";

const initialState = {
  polls: [],
  status: "idle",
  error: null,
};

// Fetch Polls
export const fetchPolls = createAsyncThunk("polls/fetchPolls", async () => {
  const snapshot = await getDocs(collection(db, "polls"));
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
});

// Add Poll
export const addPoll = createAsyncThunk("polls/addPoll", async (pollData) => {
  const docRef = await addDoc(collection(db, "polls"), pollData);
  return { id: docRef.id, ...pollData };
});

// Vote Poll
export const votePoll = createAsyncThunk(
  "polls/votePoll",
  async ({ pollId, option }) => {
    const pollRef = doc(db, "polls", pollId);
    const pollSnap = await getDocs(collection(db, "polls"));
    const poll = pollSnap.docs.find((d) => d.id === pollId).data();

    const updatedVotes = {
      ...poll.votes,
      [option]: (poll.votes[option] || 0) + 1,
    };

    await updateDoc(pollRef, { votes: updatedVotes });
    return { pollId, votes: updatedVotes };
  }
);

const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPolls.fulfilled, (state, action) => {
        state.polls = action.payload;
      })
      .addCase(addPoll.fulfilled, (state, action) => {
        state.polls.push(action.payload);
      })
      .addCase(votePoll.fulfilled, (state, action) => {
        const idx = state.polls.findIndex((p) => p.id === action.payload.pollId);
        if (idx !== -1) {
          state.polls[idx].votes = action.payload.votes;
        }
      });
  },
});

export default pollsSlice.reducer;
