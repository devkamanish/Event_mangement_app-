import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

const initialState = {
  messages: [],
  status: "idle",
  error: null,
};

// Realtime listener for messages
export const listenToMessages = (sessionId) => (dispatch) => {
  const q = query(
    collection(db, `breakouts/${sessionId}/messages`),
    orderBy("createdAt", "asc")
  );
  onSnapshot(q, (snapshot) => {
    const msgs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(chatSlice.actions.setMessages(msgs));
  });
};

// Send a message
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ sessionId, text, user }) => {
    await addDoc(collection(db, `breakouts/${sessionId}/messages`), {
      text,
      user,
      createdAt: new Date(),
    });
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = chatSlice.actions;
export default chatSlice.reducer;
