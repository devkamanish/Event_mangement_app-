import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import eventReducer from  "../features/events/eventSlice"
import scheduleReducer from "../features/schedule/scheduleSlice"
import announcementReducer from "../features/announcements/announcementSlice"
import speakersReducer  from "../features/speakers/speakersSlice"
import networkingReducer  from "../features/networking/networkingSlice"
import feedbackReducer  from "../features/feedback/feedbackSlice"
import eventsReducer  from "../features/events/eventsSlice"
import breakoutReducer  from "../features/breakouts/breakoutSlice"
import chatReducer  from "../features/breakouts/chatSlice"


const rootReducer = combineReducers({
  auth: authReducer,
  events : eventReducer,
  schedule : scheduleReducer,
  announcements: announcementReducer,
  speakers : speakersReducer,
  networking :networkingReducer, 
  feedback: feedbackReducer,
  events: eventsReducer,
  breakouts : breakoutReducer,
  chat  : chatReducer,
  
  
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;



