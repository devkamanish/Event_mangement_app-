// src/seedSessions.js
import { db } from "./firebase/firebaseconfig";
import { collection, addDoc } from "firebase/firestore";

const sampleSessions = [
  {
    title: "Opening Keynote: The Future of Virtual Events",
    speaker: "Olivia Johnson",
    time: "10:00 AM - 11:00 AM",
    description:
      "Kickoff keynote about the evolution of online events and digital engagement strategies.",
    track: "Keynote",
  },
  {
    title: "React Best Practices in 2025",
    speaker: "Michael Chen",
    time: "11:15 AM - 12:00 PM",
    description:
      "Explore modern React patterns and performance optimizations for large-scale apps.",
    track: "Frontend",
  },
  {
    title: "Building Scalable Firebase Apps",
    speaker: "Sarah Lee",
    time: "12:15 PM - 1:00 PM",
    description:
      "Learn how to architect Firebase apps that scale to millions of users with best practices.",
    track: "Backend",
  },
  {
    title: "Lunch & Networking",
    speaker: "—",
    time: "1:00 PM - 2:00 PM",
    description:
      "Grab lunch and join networking lounges to meet peers and speakers.",
    track: "Networking",
  },
  {
    title: "AI in Event Management",
    speaker: "David Kim",
    time: "2:00 PM - 3:00 PM",
    description:
      "How artificial intelligence is shaping attendee engagement, matchmaking, and analytics.",
    track: "AI",
  },
  {
    title: "Workshop: Hands-on with Firebase Security Rules",
    speaker: "Priya Sharma",
    time: "3:15 PM - 4:30 PM",
    description:
      "Interactive workshop on writing and testing secure Firebase rules.",
    track: "Workshop",
  },
  {
    title: "Panel: Future of Remote Work",
    speaker: "Multiple Speakers",
    time: "4:45 PM - 5:30 PM",
    description:
      "Industry leaders discuss trends, challenges, and opportunities in remote-first work culture.",
    track: "Panel",
  },
  {
    title: "Closing Remarks",
    speaker: "Olivia Johnson",
    time: "5:45 PM - 6:00 PM",
    description:
      "Wrap-up of the day’s sessions and announcement of future events.",
    track: "Keynote",
  },
];

export async function seedSessions() {
  try {
    const sessionsRef = collection(db, "sessions");
    for (const session of sampleSessions) {
      await addDoc(sessionsRef, session);
    }
    console.log("✅ Sample sessions added successfully!");
  } catch (error) {
    console.error("❌ Error seeding sessions:", error);
  }
}
