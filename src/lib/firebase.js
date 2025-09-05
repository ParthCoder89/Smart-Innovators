import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // For Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyAhbtyD70pcM5seRoQbxa-AeeM-JzH7iUg",
  authDomain: "bustrack-6c794.firebaseapp.com",
  databaseURL: "https://bustrack-6c794-default-rtdb.firebaseio.com",
  projectId: "bustrack-6c794",
  storageBucket: "bustrack-6c794.firebasestorage.app",
  messagingSenderId: "40474771682",
  appId: "1:40474771682:web:2900be4c7a698e7d82debb",
  measurementId: "G-6B9SLGW73W"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); // Firestore
export const realtimeDb = getDatabase(app); // Realtime Database